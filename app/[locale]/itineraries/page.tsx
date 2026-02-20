import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Calendar, Trophy, MapPin, Bed, Utensils, ChevronRight } from 'lucide-react';
import GolfBreakPlanner from '@/components/GolfBreakPlanner';
import { SEFTON_ITINERARIES } from '@/lib/courses';
import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return {
    title: 'Sefton Coast Golf Break Itineraries — 2-Day, 3-Day & 5-Day | SeftonLinks',
    description:
      'Pre-built golf break itineraries for the Sefton Coast. 2-day, 3-day and 5-day combinations of Royal Birkdale, Hillside, Formby and the full corridor, with accommodation and dining recommendations.',
    alternates: buildAlternates('/itineraries'),
  };
}

const COURSE_NAMES: Record<string, string> = {
  'royal-birkdale': 'Royal Birkdale',
  'hillside': 'Hillside GC',
  'formby': 'Formby GC',
  'west-lancashire': 'West Lancashire',
  'southport-ainsdale': 'Southport & Ainsdale',
  'southport-old-links': 'Southport Old Links',
};

export default async function ItinerariesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      <div className="bg-[#0D1B2A] py-14">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-[#B8912A] text-sm uppercase tracking-widest font-semibold mb-3">Sefton Coast</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Golf Break Itineraries</h1>
          <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
            Pre-built golf breaks for every duration and budget — from a sharp two-day trip to the full five-course grand tour. Or use the planner to build your own.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-14">
        {/* Interactive planner */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-2">Golf Break Planner</h2>
          <p className="text-[#2C3E50]/65 mb-8">Enter your days, budget and handicap — we'll match you to the right itinerary.</p>
          <GolfBreakPlanner locale={locale} />
        </section>

        {/* Pre-built itineraries */}
        <section>
          <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-8">All Itineraries</h2>
          <div className="space-y-8">
            {SEFTON_ITINERARIES.map((it) => (
              <div key={it.id} className="bg-white rounded-2xl border border-[#E8E3D8] overflow-hidden shadow-sm">
                <div className="h-1.5 bg-gradient-to-r from-[#1A4A30] via-[#B8912A] to-[#1A4A30]" />
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-[#0D1B2A]">{it.title}</h3>
                      <p className="text-[#1A4A30] font-medium mt-1">{it.subtitle}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-[#0D1B2A]">{it.days} {it.days === 1 ? 'day' : 'days'}</div>
                      <div className="text-[#2C3E50]/50 text-sm">
                        {it.budget === 'premium' ? '£££ Premium' : it.budget === 'standard' ? '££ Standard' : '£ Value'}
                      </div>
                    </div>
                  </div>

                  <p className="text-[#2C3E50]/70 mb-6 leading-relaxed">{it.description}</p>

                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    {/* Courses */}
                    <div className="sm:col-span-1">
                      <div className="text-xs font-semibold text-[#2C3E50]/50 uppercase tracking-wider mb-2">Course Order</div>
                      <div className="space-y-1.5">
                        {it.courses.map((slug, i) => (
                          <div key={slug} className="flex items-center gap-2">
                            <span className="w-5 h-5 bg-[#0D1B2A] rounded-full text-white text-xs flex items-center justify-center font-bold shrink-0">
                              {i + 1}
                            </span>
                            <Link
                              href={`${prefix}/courses/${slug}`}
                              className="text-sm text-[#1A4A30] font-medium hover:text-[#B8912A] transition-colors"
                            >
                              {COURSE_NAMES[slug]}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stay */}
                    <div>
                      <div className="text-xs font-semibold text-[#2C3E50]/50 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Bed size={12} /> Where to Stay
                      </div>
                      <p className="text-sm text-[#2C3E50]/70 leading-relaxed">{it.accommodation}</p>
                    </div>

                    {/* Eat */}
                    <div>
                      <div className="text-xs font-semibold text-[#2C3E50]/50 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Utensils size={12} /> Dining
                      </div>
                      <p className="text-sm text-[#2C3E50]/70 leading-relaxed">{it.dining}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F8F5EE] rounded-xl p-4">
                    <div>
                      <div className="text-xs text-[#2C3E50]/50 uppercase tracking-wider mb-0.5">Estimated Green Fees</div>
                      <div className="font-bold text-[#0D1B2A]">{it.estimatedCost}</div>
                    </div>
                    <a
                      href="https://www.golfbreaks.com/en-gb/united-kingdom/england/lancashire/"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex items-center gap-2 bg-[#1A4A30] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#2A6A45] transition-colors text-sm shrink-0"
                    >
                      <Trophy size={14} />
                      Book via Golf Breaks ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial */}
        <section className="mt-14 bg-white border border-[#E8E3D8] rounded-2xl p-8">
          <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-5">How to Plan a Sefton Coast Golf Trip</h2>
          <div className="prose prose-slate max-w-none text-[#2C3E50]/75 space-y-4 text-sm leading-relaxed">
            <p>
              The Sefton Coast courses are clustered enough that a two-day trip can cover two or three rounds without difficult logistics. Royal Birkdale and Hillside are literally adjacent — you could walk between them. Southport & Ainsdale is three miles further south. Formby is five miles from Birkdale via the A565.
            </p>
            <p>
              For multi-day trips, base yourself in Southport. The town has the widest hotel choice, and everything from Lord Street to Birkdale is within taxi distance. If you want quieter and cheaper accommodation, Formby village is 20 minutes south and has decent B&B options.
            </p>
            <p>
              The order matters. Don't play Royal Birkdale first — you'll spend the rest of the trip comparing everything to it. Build up: start with Old Links or S&A, move to Hillside on day two, arrive at Birkdale when you've found your links legs. The contrast will make the finale feel earned.
            </p>
            <p>
              Book tee times before you arrive. Royal Birkdale fills weeks ahead, Hillside two to four weeks, S&A and Old Links you can often get on a week out. Formby requires advance contact with the club secretary — there's no online booking.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
