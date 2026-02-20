import { getTranslations } from 'next-intl/server';
import ConditionTracker from '@/components/ConditionTracker';
import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return {
    title: 'Sefton Coast Course Conditions — Daily Playing Status',
    description:
      'Daily playing conditions at Royal Birkdale, Hillside, Formby, West Lancashire, Southport & Ainsdale and Southport Old Links. Firm, standard, wet or closed — updated each morning.',
    alternates: buildAlternates('/conditions'),
  };
}

export default async function ConditionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      <div className="bg-[#0D1B2A] py-14">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-[#B8912A] text-sm uppercase tracking-widest font-semibold mb-3">Daily Update</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Course Conditions
          </h1>
          <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
            Current playing conditions across all six Sefton Coast courses — updated manually each morning by 7:30am. Check before you travel.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12">
        <ConditionTracker />

        <div className="mt-12 bg-white border border-[#E8E3D8] rounded-xl p-6">
          <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-4">About Links Conditions</h2>
          <div className="prose prose-slate max-w-none text-[#2C3E50]/75 space-y-4 text-sm leading-relaxed">
            <p>
              Links golf conditions are fundamentally different from parkland golf. The key variables are wind direction and strength, recent rainfall and drainage, and the firmness of the turf. A firm, dry course plays completely differently to a wet, soft one — approach shots don't stop, the ball runs further off the tee, and chipping becomes more creative.
            </p>
            <p>
              The Sefton Coast courses drain well by design — they're built on sand. Even after heavy rain, Royal Birkdale and Hillside typically recover faster than inland courses. Southport & Ainsdale and West Lancashire can hold water slightly longer due to their terrain. Formby's woodland sections dry quickest.
            </p>
            <p>
              Wind speed and direction matter more here than almost anywhere in England. The prevailing south-westerly at Royal Birkdale creates the "natural" course experience the routing was designed for. An easterly off the land produces a completely different course. This guide includes a wind direction key for Royal Birkdale specifically.
            </p>
            <p className="text-[#2C3E50]/45 text-xs">
              Conditions data is approximate and manually maintained. Always verify with the individual club before travel. SeftonLinks accepts no liability for course closures or conditions that differ from this page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
