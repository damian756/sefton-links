'use client';

import { useState } from 'react';
import { Wind, Droplets, CheckCircle2, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import type { Condition, CourseConditionData } from '@/lib/conditions-data';
import type { WeatherData } from '@/lib/weather';

interface ConditionTrackerProps {
  conditions: CourseConditionData[];
  weather: WeatherData | null;
  updatedDate: string;
}

const CONDITION_CONFIG: Record<Condition, {
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: typeof CheckCircle2;
  description: string;
}> = {
  firm: {
    label: 'Firm',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: CheckCircle2,
    description: 'Ideal links conditions. Ball runs well, greens fast.',
  },
  standard: {
    label: 'Standard',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: CheckCircle2,
    description: 'Good playing conditions. Normal ball flight expected.',
  },
  wet: {
    label: 'Wet / Soft',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: AlertCircle,
    description: 'Soft underfoot. Less run on fairways. Check for winter rules.',
  },
  closed: {
    label: 'Closed',
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: XCircle,
    description: 'Course not available for play. Contact club for details.',
  },
};

// Formby GC is sheltered by pines — wind slightly lower
const COURSE_WIND_MODIFIER: Record<string, number> = {
  formby: 0.85,
  'southport-old-links': 0.9,
};

const WIND_GUIDE: { direction: string; birkdaleEffect: string }[] = [
  { direction: 'SW (prevailing)', birkdaleEffect: 'Natural links wind — front nine downwind, back nine into. Typical Royal Birkdale experience.' },
  { direction: 'W', birkdaleEffect: 'Strong off the Irish Sea. Holes 12–15 particularly exposed. Scoring deteriorates.' },
  { direction: 'NW', birkdaleEffect: 'Cross-wind on many holes. The dune corridors funnel unpredictably. Difficult to control flight.' },
  { direction: 'N', birkdaleEffect: 'Unusual direction. Course changes character significantly. Par is a good score.' },
  { direction: 'E', birkdaleEffect: 'Off the land. Course plays differently — more accommodating on the exposed holes.' },
  { direction: 'S', birkdaleEffect: 'Relatively sheltered. Scoring typically better than SW/W. Good for scoring rounds.' },
];

export default function ConditionTracker({ conditions, weather, updatedDate }: ConditionTrackerProps) {
  const [activeFilter, setActiveFilter] = useState<Condition | 'all'>('all');
  const [showWindGuide, setShowWindGuide] = useState(false);

  const filtered = activeFilter === 'all'
    ? conditions
    : conditions.filter((c) => c.condition === activeFilter);

  function getCourseWind(slug: string): string {
    if (!weather) return '—';
    const modifier = COURSE_WIND_MODIFIER[slug] ?? 1;
    const speed = Math.round(parseInt(weather.windSpeed) * modifier);
    return `${speed} mph`;
  }

  return (
    <div className="space-y-8">
      {/* Status bar */}
      <div className="flex items-center justify-between bg-[#1A4A30]/8 border border-[#1A4A30]/20 rounded-xl px-5 py-4">
        <div className="flex items-center gap-2 text-sm text-[#1A4A30]">
          <RefreshCw size={15} />
          <span>
            {weather
              ? 'Wind data live from Open-Meteo. Course conditions updated manually each morning.'
              : 'Conditions updated manually each morning by 7:30am. Verify with individual clubs before travel.'}
          </span>
        </div>
        <span className="text-[#2C3E50]/40 text-xs shrink-0">{updatedDate}</span>
      </div>

      {/* Wind summary */}
      {weather && (
        <div className="bg-[#4A7D9A]/8 border border-[#4A7D9A]/20 rounded-xl px-5 py-4 flex flex-wrap gap-6">
          <div>
            <div className="text-[#4A7D9A] text-xs uppercase tracking-wider mb-1 font-semibold">Live Wind — Southport</div>
            <div className="flex items-center gap-2">
              <Wind size={18} className="text-[#4A7D9A]" />
              <span className="font-display text-2xl font-bold text-[#0D1B2A]">{weather.windSpeed}</span>
              <span className="text-[#2C3E50]/60 font-semibold">{weather.windDirection}</span>
            </div>
          </div>
          <div className="border-l border-[#4A7D9A]/20 pl-6">
            <div className="text-[#4A7D9A] text-xs uppercase tracking-wider mb-1 font-semibold">Updated</div>
            <div className="text-sm text-[#2C3E50]/70">Every 30 minutes — Open-Meteo</div>
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'firm', 'standard', 'wet', 'closed'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter
                ? 'bg-[#0D1B2A] text-white'
                : 'bg-white border border-[#E8E3D8] text-[#2C3E50] hover:border-[#0D1B2A]/30'
            }`}
          >
            {filter === 'all' ? 'All Courses' : CONDITION_CONFIG[filter].label}
          </button>
        ))}
      </div>

      {/* Condition cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((course) => {
          const config = CONDITION_CONFIG[course.condition];
          const Icon = config.icon;
          return (
            <div
              key={course.slug}
              className={`bg-white border-2 ${config.border} rounded-xl p-5`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display font-bold text-[#0D1B2A] text-lg leading-tight">{course.name}</h3>
                <div className={`flex items-center gap-1.5 ${config.bg} ${config.color} px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ml-2`}>
                  <Icon size={12} />
                  {config.label}
                </div>
              </div>

              <p className={`text-xs ${config.color} font-medium mb-3`}>{config.description}</p>

              <div className="flex items-center gap-4 mb-3 text-sm">
                <div className="flex items-center gap-1.5 text-[#4A7D9A]">
                  <Wind size={13} />
                  <span className="font-medium">{getCourseWind(course.slug)}</span>
                </div>
                {weather && (
                  <div className="flex items-center gap-1.5 text-[#2C3E50]/60">
                    <span className="text-xs">Direction:</span>
                    <span className="font-semibold text-[#0D1B2A]">{weather.windDirection}</span>
                  </div>
                )}
              </div>

              <p className="text-[#2C3E50]/65 text-sm leading-relaxed mb-3 border-t border-[#F0EDE6] pt-3">
                {course.notes}
              </p>
            </div>
          );
        })}
      </div>

      {/* Condition legend */}
      <div className="bg-white border border-[#E8E3D8] rounded-xl p-5">
        <h3 className="font-semibold text-[#0D1B2A] mb-4">Condition Guide</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {Object.entries(CONDITION_CONFIG).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <div key={key} className="flex items-start gap-3">
                <div className={`${config.bg} ${config.color} p-1.5 rounded`}>
                  <Icon size={14} />
                </div>
                <div>
                  <div className={`font-semibold text-sm ${config.color}`}>{config.label}</div>
                  <div className="text-[#2C3E50]/60 text-xs">{config.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wind guide toggle */}
      <div>
        <button
          onClick={() => setShowWindGuide(!showWindGuide)}
          className="flex items-center gap-2 text-[#1A4A30] font-semibold text-sm hover:text-[#B8912A] transition-colors"
        >
          <Wind size={16} />
          {showWindGuide ? 'Hide' : 'Show'} Wind Direction Guide — Royal Birkdale
        </button>

        {showWindGuide && (
          <div className="mt-4 bg-[#4A7D9A]/8 border border-[#4A7D9A]/20 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#4A7D9A] text-white">
                  <th className="text-left px-4 py-2.5 font-semibold">Wind Direction</th>
                  <th className="text-left px-4 py-2.5 font-semibold">Effect at Royal Birkdale</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {WIND_GUIDE.map((row, i) => (
                  <tr key={row.direction} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F5EE]'}>
                    <td className="px-4 py-3 font-mono font-semibold text-[#0D1B2A] whitespace-nowrap">{row.direction}</td>
                    <td className="px-4 py-3 text-[#2C3E50]/70">{row.birkdaleEffect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
