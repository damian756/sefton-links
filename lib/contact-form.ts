// The contact form's subject choices. Safe for client code (no addresses here).
// The route accepts only these values; labels are in messages/*.json under
// contactPage.subject.<value>.
export const CONTACT_SUBJECTS = ['general', 'correction', 'advertising', 'press', 'other'] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

// Preselected by links from the advertise page (/contact?topic=advertise&space=<id>).
export const ADVERTISING_SUBJECT: ContactSubject = 'advertising';

// English names used in the email subject line sent to our inbox.
export const SUBJECT_NAMES: Record<ContactSubject, string> = {
  general: 'General question',
  correction: 'Course information correction',
  advertising: 'Advertising',
  press: 'Press and media',
  other: 'Something else',
};

export function isContactSubject(value: unknown): value is ContactSubject {
  return typeof value === 'string' && (CONTACT_SUBJECTS as readonly string[]).includes(value);
}

// Field limits, shared by the form and the route.
export const LIMITS = { name: 100, message: 5000, messageMin: 10 } as const;
