'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { LIMITS } from '@/lib/contact-form';

type Labels = {
  formTitle: string;
  nameLabel: string;
  emailLabel: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  messageLabel: string;
  sendBtn: string;
  sending: string;
  sentTitle: string;
  sentText: string;
  errorText: string;
};

const field =
  'w-full rounded-lg border border-[#E8E3D8] bg-[#F8F5EE] px-4 py-3 text-[#0D1B2A] text-sm placeholder:text-[#2C3E50]/35 focus:outline-none focus:border-[#1A4A30] focus:ring-2 focus:ring-[#1A4A30]/15';
const labelClass = 'block text-xs font-semibold uppercase tracking-wider text-[#2C3E50]/60 mb-2';

export default function ContactForm({
  labels,
  subjects,
  initialSubject,
  initialMessage,
  space,
}: {
  labels: Labels;
  subjects: { value: string; label: string }[];
  initialSubject: string;
  initialMessage: string;
  /** A known advert space id, sent with the enquiry. */
  space: string | null;
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
          space: space ?? undefined,
          website: data.get('website'),
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && json.ok) {
        setStatus('sent');
      } else {
        setError(json.error || labels.errorText);
        setStatus('error');
      }
    } catch {
      setError(labels.errorText);
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-[#1A4A30]/20 bg-[#1A4A30]/5 p-6" role="status">
        <CheckCircle2 size={20} className="text-[#1A4A30] mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-[#0D1B2A]">{labels.sentTitle}</p>
          <p className="text-sm text-[#2C3E50]/70 mt-1">{labels.sentText}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      <h2 className="font-display text-2xl font-bold text-[#0D1B2A]">{labels.formTitle}</h2>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className={labelClass}>{labels.nameLabel}</label>
          <input id="cf-name" name="name" type="text" required maxLength={LIMITS.name} autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>{labels.emailLabel}</label>
          <input id="cf-email" name="email" type="email" required maxLength={254} autoComplete="email" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-subject" className={labelClass}>{labels.subjectLabel}</label>
        <select id="cf-subject" name="subject" required defaultValue={initialSubject} className={field}>
          <option value="" disabled>{labels.subjectPlaceholder}</option>
          {subjects.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="cf-message" className={labelClass}>{labels.messageLabel}</label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={6}
          minLength={LIMITS.messageMin}
          maxLength={LIMITS.message}
          defaultValue={initialMessage}
          className={`${field} resize-y`}
        />
      </div>
      {/* Honeypot: hidden from people and screen readers; bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {status === 'error' && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3" role="alert">{error}</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center gap-2 bg-[#1A4A30] hover:bg-[#2A6A45] disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
      >
        <Send size={15} />
        {status === 'sending' ? labels.sending : labels.sendBtn}
      </button>
    </form>
  );
}
