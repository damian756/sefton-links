// Pure helpers for the contact-form email: escaping, the reply-to check, the
// FROM check, building the message and logging a failed send. No imports, so
// tests/enquiry-email.test.mjs can load this file directly with Node.
// Nothing here sends anything.

export type Enquiry = {
  name: string;
  email: string;
  /** The subject's English name, e.g. "Advertising". */
  subject: string;
  message: string;
  /** Title of the advert space asked about, if any. */
  space?: string;
};

export type OutgoingEmail = {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  html: string;
};

/** The FROM address used when RESEND_FROM_EMAIL is not set. */
export const DEFAULT_FROM = 'SeftonLinks <noreply@seftonlinks.com>';

/** Escape a user-supplied value for an HTML email body. */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** A value safe for an email subject line: no CR or LF. */
export function cleanSubject(value: unknown): string {
  return String(value ?? '').replace(/[\r\n]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
}

/**
 * The enquirer's address if it is one plain address (no commas, angle
 * brackets, quotes, semicolons, spaces or newlines; at most 254 characters),
 * otherwise null.
 */
export function plainAddress(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const email = value.trim();
  if (email.length === 0 || email.length > 254) return null;
  if (/[\s,<>;"]/.test(email)) return null;
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) return null;
  return email;
}

/**
 * The FROM address to send with: the configured value only when it is on our
 * own verified domain (seftonlinks.com), otherwise DEFAULT_FROM. A test or
 * shared sender from the email provider is never used.
 */
export function fromOnOwnDomain(configured: string | undefined): string {
  const value = (configured ?? '').trim();
  if (/@seftonlinks\.com>?$/i.test(value) && !/[\r\n]/.test(value)) return value;
  return DEFAULT_FROM;
}

/** The enquiry sent to our inbox, with reply-to set to the enquirer. */
export function buildEnquiryEmail(
  enquiry: Enquiry,
  opts: { from: string; to: string; replyTo: string },
): OutgoingEmail {
  const topic = cleanSubject(enquiry.space ? `${enquiry.subject}: ${enquiry.space}` : enquiry.subject);
  const name = escapeHtml(enquiry.name);
  const email = escapeHtml(enquiry.email);
  const row = (label: string, value: string) => `
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px; width: 110px; vertical-align: top;">${label}</td>
              <td style="padding: 8px 0; color: #0D1B2A;">${value}</td>
            </tr>`;
  return {
    from: opts.from,
    to: opts.to,
    replyTo: opts.replyTo,
    subject: cleanSubject(`[SeftonLinks] ${topic}: ${cleanSubject(enquiry.name)}`),
    html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #F8F5EE; padding: 32px; border-radius: 8px;">
          <div style="border-bottom: 3px solid #B8912A; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="font-size: 24px; color: #0D1B2A; margin: 0;">Sefton<span style="color: #B8912A;">Links</span></h1>
            <p style="color: #666; font-size: 13px; margin: 4px 0 0;">New contact form enquiry</p>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">${row('Subject', escapeHtml(enquiry.subject))}${
            enquiry.space ? row('Space', escapeHtml(enquiry.space)) : ''
          }${row('Name', name)}${row('Email', `<a href="mailto:${email}" style="color: #1A4A30;">${email}</a>`)}
          </table>
          <div style="background: white; border: 1px solid #E8E3D8; border-radius: 6px; padding: 20px;">
            <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Message</p>
            <p style="color: #0D1B2A; line-height: 1.7; margin: 0; white-space: pre-wrap;">${escapeHtml(enquiry.message)}</p>
          </div>
          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 24px;">Reply to this email to answer ${name}.</p>
        </div>
      `,
  };
}

/**
 * Log a failed send so it shows in Vercel's logs: the error's name and message
 * only, never the enquirer's text.
 */
export function logSendError(error: unknown, log: (line: string) => void = console.error): void {
  const e = (typeof error === 'object' && error !== null ? error : {}) as { name?: unknown; message?: unknown };
  const name = typeof e.name === 'string' ? e.name : 'Error';
  const message = typeof e.message === 'string' ? e.message : typeof error === 'string' ? error : 'unknown error';
  log(`[contact] enquiry email failed: ${name}: ${message}`);
}

/** Anything with the email provider's `emails.send` shape, so a test can pass a fake. */
export type EmailClient = {
  emails: { send(mail: OutgoingEmail): Promise<{ error?: unknown }> };
};

/**
 * Send one enquiry. The provider reports most failures as a returned `error`
 * rather than a throw, so both are logged (name and message only). True when
 * the provider accepted the email.
 */
export async function sendEnquiry(
  client: EmailClient,
  mail: OutgoingEmail,
  log: (line: string) => void = console.error,
): Promise<boolean> {
  try {
    const { error } = await client.emails.send(mail);
    if (error) {
      logSendError(error, log);
      return false;
    }
    return true;
  } catch (err) {
    logSendError(err, log);
    return false;
  }
}
