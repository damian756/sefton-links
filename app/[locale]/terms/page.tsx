import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | SeftonLinks',
  robots: { index: false, follow: false },
};

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      <div className="bg-[#0D1B2A] py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-white mb-3">Terms of Use</h1>
          <p className="text-white/55 text-sm">Last updated: February 2026</p>
        </div>
      </div>
      <div className="container mx-auto px-4 max-w-3xl py-14">
        <div className="bg-white border border-[#E8E3D8] rounded-2xl p-8 prose prose-slate max-w-none text-sm leading-relaxed text-[#2C3E50]/75 space-y-4">
          <p>By using SeftonLinks.com you agree to these terms. The site is operated by Churchtown Media Ltd (not disclosed on-site — editorial property).</p>
          <h2 className="font-display text-xl font-bold text-[#0D1B2A]">Information Accuracy</h2>
          <p>Green fees, visitor policies, opening hours and course data are provided in good faith and updated regularly. Always verify directly with the club before travel. SeftonLinks accepts no liability for outdated information or course closures.</p>
          <h2 className="font-display text-xl font-bold text-[#0D1B2A]">Affiliate Links</h2>
          <p>This site participates in affiliate programmes including Golf Breaks, Booking.com and Sykes Cottages. Commissions earned help fund the editorial operation at no cost to users.</p>
          <h2 className="font-display text-xl font-bold text-[#0D1B2A]">Copyright</h2>
          <p>All editorial content © 2026 SeftonLinks.com. Course data (par, ratings, slope) is factual and not copyrightable. Do not reproduce editorial content without written permission.</p>
        </div>
      </div>
    </div>
  );
}
