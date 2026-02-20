'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Trophy, MapPin, Bed, Utensils, ChevronRight, Star } from 'lucide-react';
import { SEFTON_ITINERARIES } from '@/lib/courses';

type Days = 2 | 3 | 5;
type Budget = 'value' | 'standard' | 'premium';
type Handicap = 'any' | 'mid-high' | 'low';

const COURSE_NAMES: Record<string, string> = {
  'royal-birkdale': 'Royal Birkdale',
  'hillside': 'Hillside GC',
  'formby': 'Formby GC',
  'west-lancashire': 'West Lancashire',
  'southport-ainsdale': 'Southport & Ainsdale',
  'southport-old-links': 'Southport Old Links',
};

const BUDGET_LABELS: Record<Budget, string> = {
  value: '£ — Value (under £200pp green fees)',
  standard: '££ — Standard (£200–£600pp)',
  premium: '£££ — Premium (£600+pp)',
};

export default function GolfBreakPlanner({ locale }: { locale: string }) {
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const [days, setDays] = useState<Days>(3);
  const [budget, setBudget] = useState<Budget>('standard');
  const [handicap, setHandicap] = useState<Handicap>('any');
  const [result, setResult] = useState<(typeof SEFTON_ITINERARIES)[0] | null>(null);
  const [noMatch, setNoMatch] = useState(false);

  const findItinerary = () => {
    // Score-based matching
    const scored = SEFTON_ITINERARIES.map((it) => {
      let score = 0;
      if (it.days === days) score += 10;
      else if (Math.abs(it.days - days) === 1) score += 5;
      if (it.budget === budget) score += 8;
      if (it.handicapRange === handicap || it.handicapRange === 'any') score += 5;
      return { it, score };
    });
    scored.sort((a, b) => b.score - a.score);
    const best = scored[0];
    if (best && best.score >= 5) {
      setResult(best.it);
      setNoMatch(false);
    } else {
      setResult(null);
      setNoMatch(true);
    }
  };

  return (
    <div className="space-y-8">
      {/* Planner form */}
      <div className="bg-white border border-[#E8E3D8] rounded-2xl p-6 md:p-8">
        <h3 className="font-display text-xl font-bold text-[#0D1B2A] mb-6">Build Your Itinerary</h3>

        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          {/* Days */}
          <div>
            <label className="block text-sm font-semibold text-[#0D1B2A] mb-3 uppercase tracking-wider">
              Days Available
            </label>
            <div className="flex gap-2">
              {([2, 3, 5] as Days[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-colors ${
                    days === d
                      ? 'bg-[#0D1B2A] text-white'
                      : 'bg-[#F8F5EE] text-[#2C3E50] hover:bg-[#E8E3D8]'
                  }`}
                >
                  {d} {d > 1 ? 'days' : 'day'}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-semibold text-[#0D1B2A] mb-3 uppercase tracking-wider">
              Budget
            </label>
            <div className="flex flex-col gap-2">
              {(['value', 'standard', 'premium'] as Budget[]).map((b) => (
                <button
                  key={b}
                  onClick={() => setBudget(b)}
                  className={`py-2.5 px-4 rounded-lg text-sm font-medium text-left transition-colors ${
                    budget === b
                      ? 'bg-[#0D1B2A] text-white'
                      : 'bg-[#F8F5EE] text-[#2C3E50] hover:bg-[#E8E3D8]'
                  }`}
                >
                  {BUDGET_LABELS[b]}
                </button>
              ))}
            </div>
          </div>

          {/* Handicap */}
          <div>
            <label className="block text-sm font-semibold text-[#0D1B2A] mb-3 uppercase tracking-wider">
              Handicap Level
            </label>
            <div className="flex flex-col gap-2">
              {([
                ['any', 'Any level'],
                ['mid-high', 'Mid-high (16–28)'],
                ['low', 'Low (0–15)'],
              ] as [Handicap, string][]).map(([h, label]) => (
                <button
                  key={h}
                  onClick={() => setHandicap(h)}
                  className={`py-2.5 px-4 rounded-lg text-sm font-medium text-left transition-colors ${
                    handicap === h
                      ? 'bg-[#0D1B2A] text-white'
                      : 'bg-[#F8F5EE] text-[#2C3E50] hover:bg-[#E8E3D8]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={findItinerary}
          className="w-full bg-[#1A4A30] text-white font-bold py-4 rounded-xl hover:bg-[#2A6A45] transition-colors text-base flex items-center justify-center gap-2"
        >
          <Calendar size={18} />
          Build My Itinerary
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-[#0D1B2A] rounded-2xl overflow-hidden">
          <div className="bg-[#B8912A] px-6 py-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-bold text-white">{result.title}</h3>
                <p className="text-white/80 text-sm mt-0.5">{result.subtitle}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-white font-bold">{result.days} days</div>
                <div className="text-white/70 text-xs">
                  {result.budget === 'premium' ? '£££' : result.budget === 'standard' ? '££' : '£'}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <p className="text-white/80 leading-relaxed">{result.description}</p>

            {/* Courses */}
            <div>
              <h4 className="text-[#D4AE7A] text-xs uppercase tracking-wider font-semibold mb-3">
                Course Sequence
              </h4>
              <div className="space-y-2">
                {result.courses.map((slug, i) => (
                  <div key={slug} className="flex items-center gap-3 bg-white/8 rounded-lg px-4 py-3">
                    <div className="w-6 h-6 bg-[#B8912A] rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-xs">Day {i + 1}</span>
                    </div>
                    <span className="text-white font-medium">{COURSE_NAMES[slug]}</span>
                    <Link
                      href={`${prefix}/courses/${slug}`}
                      className="ml-auto text-[#D4AE7A] text-xs hover:text-white transition-colors flex items-center gap-1"
                    >
                      Guide <ChevronRight size={11} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Stay & eat */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/8 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2 text-[#D4AE7A]">
                  <Bed size={15} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Where to Stay</span>
                </div>
                <p className="text-white/75 text-sm leading-relaxed">{result.accommodation}</p>
              </div>
              <div className="bg-white/8 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2 text-[#D4AE7A]">
                  <Utensils size={15} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Post-Round Dining</span>
                </div>
                <p className="text-white/75 text-sm leading-relaxed">{result.dining}</p>
              </div>
            </div>

            {/* Cost & CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/6 rounded-xl p-4">
              <div>
                <div className="text-[#D4AE7A] text-xs uppercase tracking-wider mb-1">Estimated Cost</div>
                <div className="text-white font-bold text-lg">{result.estimatedCost}</div>
              </div>
              <a
                href="https://www.golfbreaks.com/en-gb/united-kingdom/england/lancashire/"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex items-center gap-2 bg-[#B8912A] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#D4AE7A] transition-colors text-sm shrink-0"
              >
                <Trophy size={15} />
                Book via Golf Breaks ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {noMatch && (
        <div className="bg-[#F8F5EE] border border-[#E8E3D8] rounded-xl p-6 text-center">
          <p className="text-[#2C3E50]/70 mb-3">No exact match found for your selection — try adjusting the days or budget.</p>
          <Link
            href={`${prefix}/itineraries`}
            className="text-[#1A4A30] font-semibold hover:text-[#B8912A] transition-colors"
          >
            View all pre-built itineraries →
          </Link>
        </div>
      )}

      {/* Browse all */}
      {!result && !noMatch && (
        <div className="text-center">
          <Link
            href={`${prefix}/itineraries`}
            className="text-[#1A4A30] font-semibold hover:text-[#B8912A] transition-colors flex items-center justify-center gap-1"
          >
            Browse all pre-built itineraries <ChevronRight size={15} />
          </Link>
        </div>
      )}
    </div>
  );
}
