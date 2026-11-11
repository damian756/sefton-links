// Domains the Sefton Coast sites never link to (Damian, 11 Nov 2026: "keep them,
// i dont want to link to any of them"). Naming these organisations in copy is
// fine; a link, URL, schema `url` or `sameAs` to any of these domains is not.
// tests/no-blocked-links.test.mjs fails if one appears in app/, lib/,
// components/, content/, messages/ or public/. A subdomain counts too.
// No imports, so the test can load this file directly with Node.

export const BLOCKED_DOMAINS = [
  // Sefton Council
  'sefton.gov.uk',
  // Visit Sefton and West Lancs (the council's visitor site), VisitSouthport
  'visitseftonandwestlancs.co.uk',
  'visitsouthport.com',
  // YourSouthport
  'yoursouthport.com',
  // Southport BID
  'southportbid.com',
  // Southport Market
  'southportmarket.com',
  'southportmarket.co.uk',
  // Mikhail hotel and leisure group and its venues
  'mhalg.com',
  'thegrand.co.uk',
  'boldhotel.com',
  'lordstreethotel.com',
  'mavericksbar.co.uk',
  'punchtarmeys.co.uk',
  'arcains.co.uk',
  'hotshotsdarts.co.uk',
  'brewerytapliverpool.com',
  'doctorduncansliverpool.com',
  'ecclestonarms.co.uk',
] as const;
