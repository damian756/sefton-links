import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { DELIVERY_EMAIL, DISPLAY_EMAIL } from '@/lib/contact';
import { LIMITS, SUBJECT_NAMES, isContactSubject } from '@/lib/contact-form';
import { describeSpace } from '@/lib/ad-slots';
import { buildEnquiryEmail, fromOnOwnDomain, plainAddress, sendEnquiry } from '@/lib/enquiry-email';

// Contact form enquiries (general and advertising). Delivered to DELIVERY_EMAIL
// from our own verified domain, with reply-to set to the enquirer. No
// auto-reply is sent to the enquirer, so the form cannot be used to mail
// anyone else. Needs RESEND_API_KEY (and optionally RESEND_FROM_EMAIL, on
// seftonlinks.com) set on the Vercel project.

const TO_EMAIL = DELIVERY_EMAIL;
const FROM_EMAIL = fromOnOwnDomain(process.env.RESEND_FROM_EMAIL);

const UNAVAILABLE = `Sorry, the form is not working at the moment. Please email ${DISPLAY_EMAIL}.`;

// `code` lets the form show its own translated message; `error` is the English
// text for anything that calls the route directly.
type ErrorCode = 'invalid' | 'name' | 'email' | 'subject' | 'message' | 'unavailable';

function bad(code: ErrorCode, error: string, status = 400) {
  return NextResponse.json({ error, code }, { status });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== 'object') return bad('invalid', 'Invalid request.');
    body = parsed as Record<string, unknown>;
  } catch {
    return bad('invalid', 'Invalid request.');
  }

  // Hidden honeypot field: people never see it, so a value means a bot.
  // Answer as if it worked and send nothing.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const replyTo = plainAddress(body.email);
  const subject = body.subject;

  if (!name || name.length > LIMITS.name) return bad('name', `Please give your name (up to ${LIMITS.name} characters).`);
  if (!replyTo) return bad('email', 'Please give one valid email address.');
  if (!isContactSubject(subject)) return bad('subject', 'Please choose a subject.');
  if (message.length < LIMITS.messageMin || message.length > LIMITS.message) {
    return bad('message', `Please write a message of ${LIMITS.messageMin} to ${LIMITS.message} characters.`);
  }

  // Only a known advert space id is accepted; anything else is dropped.
  const space = describeSpace(typeof body.space === 'string' ? body.space : null) ?? undefined;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set on this deployment: enquiry not sent');
    return bad('unavailable', UNAVAILABLE, 503);
  }

  const enquiry = { name, email: replyTo, subject: SUBJECT_NAMES[subject], message, space };
  const mail = buildEnquiryEmail(enquiry, { from: FROM_EMAIL, to: TO_EMAIL, replyTo });

  // One email to our inbox only; a returned or thrown error is logged inside.
  const sent = await sendEnquiry(new Resend(apiKey), mail);
  if (!sent) return bad('unavailable', UNAVAILABLE, 502);

  return NextResponse.json({ ok: true });
}
