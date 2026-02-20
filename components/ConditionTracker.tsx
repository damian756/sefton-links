'use client';

import { useState } from 'react';
import { Wind, Droplets, CheckCircle2, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

type Condition = 'firm' | 'standard' | 'wet' | 'closed';

interface CourseCondition {
  slug: string;
  name: string;
  condition: Condition;
  windSpeed: string;
  windDirection: string;
  notes: string;
  lastUpdated: string;
}

// Manually maintained — updated each morning by admin
const CONDITIONS: CourseCondition[] = [
  {
    slug: 'royal-birkdale',
    name: 'Royal Birkdale',
    condition: 'firm',
    windSpeed: '18 mph',
    windDirection: 'SW',
    notes: 'Course in excellent condition. Winter rules not in play. Greens running 10.5 on the stimpmeter.',
    lastUpdated: '07:30 today',
  },
  {
    slug: 'hillside',
    name: 'Hillside',
    condition: 'firm',
    windSpeed: '18 mph',
    windDirection: 'SW',
    notes: 'Comparable to Birkdale — firm and fast. Back nine playing into the wind this morning.',
    lastUpdated: '07:30 today',
  },
  {
    slug: 'formby',
    name: 'Formby GC',
    condition: 'standard',
    windSpeed: '14 mph',
    windDirection: 'SW',
    notes: 'More sheltered through the pines. Slightly softer than Birkdale. Fairways good.',
    lastUpdated: '07:30 today',
  },
  {
    slug: 'west-lancashire',
    name: 'West Lancashire',
    condition: 'wet',
    windSpeed: '22 mph',
    windDirection: 'W',
    notes: 'More exposed to Irish Sea — soft underfoot after yesterday\'s rain. Winter rules in play on some fairways.',
    lastUpdated: '07:30 today',
  },
  {
    slug: 'southport-ainsdale',
    name: 'Southport & Ainsdale',
    condition: 'standard',
    windSpeed: '18 mph',
    windDirection: 'SW',
    notes: 'Good playing conditions. Course drains well. 2nd hole still marked as GUR from last week.',
    lastUpdated: '07:30 today',
  },
  {
    slug: 'southport-old-links',
    name: 'Southport Old Links',
    condition: 'standard',
    windSpeed: '15 mph',
    windDirection: 'SW',
    notes: 'Fine for all abilities. More sheltered than the coast courses.',
    lastUpdated: '07:30 today',
  },
];

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

const WIND_GUIDE: { direction: string; birkdaleEffect: string }[] = [
  { direction: 'SW (prevailing)', birkdaleEffect: 'Natural links wind — front nine downwind, back nine into. Typical Royal Birkdale experience.' },
  { direction: 'W', birkdaleEffect: 'Strong off the Irish Sea. Holes 12–15 particularly exposed. Scoring deteriorates.' },
  { direction: 'NW', birkdaleEffect: 'Cross-wind on many holes. The dune corridors funnel unpredictably. Difficult to control flight.' },
  { direction: 'N', birkdaleEffect: 'Unusual direction. Course changes character significantly. Par is a good score.' },
  { direction: 'E', birkdaleEffect: 'Off the land. Course plays differently — more accommodating on the exposed holes.' },
  { direction: 'S', birkdaleEffect: 'Relatively sheltered. Scoring typically better than SW/W. Good for scoring rounds.' },
];

export default function ConditionTracker() {
  const [activeFilter, setActiveFilter] = useState<Condition | 'all'>('all');
  const [showWindGuide, setShowWindGuide] = useState(false);

  const filtered = activeFilter === 'all'
    ? CONDITIONS
    : CONDITIONS.filter((c) => c.condition === activeFilter);

  return (
    <div className="space-y-8">
      {/* Last updated notice */}
      <div className="flex items-center justify-between bg-[#1A4A30]/8 border border-[#1A4A30]/20 rounded-xl px-5 py-4">
        <div className="flex items-center gap-2 text-sm text-[#1A4A30]">
          <RefreshCw size={15} />
          <span>Conditions updated manually each morning by 7:30am. Verify with individual clubs before travel.</span>
        </div>
        <span className="text-[#2C3E50]/40 text-xs shrink-0">Feb 20, 2026</span>
      </div>

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
                  <span className="font-medium">{course.windSpeed}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#2C3E50]/60">
                  <span className="text-xs">Direction:</span>
                  <span className="font-semibold text-[#0D1B2A]">{course.windDirection}</span>
                </div>
              </div>

              <p className="text-[#2C3E50]/65 text-sm leading-relaxed mb-3 border-t border-[#F0EDE6] pt-3">
                {course.notes}
              </p>

              <p className="text-[#2C3E50]/35 text-xs">Updated: {course.lastUpdated}</p>
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
