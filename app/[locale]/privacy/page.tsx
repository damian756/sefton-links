import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | SeftonLinks',
  robots: { index: false, follow: false },
};

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      <div className="bg-[#0D1B2A] py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-white/55 text-sm">Last updated: February 2026</p>
        </div>
      </div>
      <div className="container mx-auto px-4 max-w-3xl py-14">
        <div className="bg-white border border-[#E8E3D8] rounded-2xl p-8 prose prose-slate max-w-none text-sm leading-relaxed text-[#2C3E50]/75 space-y-4">
          <p>SeftonLinks.com is operated by Churchtown Media Ltd. We take your privacy seriously.</p>
          <h2 className="font-display text-xl font-bold text-[#0D1B2A]">Analytics</h2>
          <p>We use <strong>Plausible Analytics</strong> (privacy-first, GDPR compliant, no cookies, no personal data collected) and <strong>Microsoft Clarity</strong> (session recordings — anonymised). Neither requires cookie consent under GDPR when configured correctly.</p>
          <h2 className="font-display text-xl font-bold text-[#0D1B2A]">Affiliate Links</h2>
          <p>Some links on this site are affiliate links (Golf Breaks, Booking.com, Sykes Cottages). These are clearly labelled. Clicking them may result in a commission to SeftonLinks.com at no extra cost to you.</p>
          <h2 className="font-display text-xl font-bold text-[#0D1B2A]">Contact</h2>
          <p>Privacy queries: <a href="mailto:hello@churchtownmedia.co.uk" className="text-[#1A4A30]">hello@churchtownmedia.co.uk</a></p>
        </div>
      </div>
    </div>
  );
}
