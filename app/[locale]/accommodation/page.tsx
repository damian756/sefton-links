import Link from 'next/link';
import { Bed, MapPin, ExternalLink, CheckCircle2, Clock, Trophy, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.seftonlinks.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return {
    title: 'Accommodation for Golfers near Royal Birkdale & Sefton Coast | SeftonLinks',
    description:
      'Curated accommodation for golf visitors near Royal Birkdale, Hillside and the Sefton Coast courses. Hotels, B&Bs and holiday cottages — sorted by proximity and golfer-friendliness.',
    alternates: {
      canonical: `${BASE_URL}/accommodation`,
      languages: { 'en': `${BASE_URL}/accommodation`, 'de': `${BASE_URL}/de/accommodation`, 'ja': `${BASE_URL}/ja/accommodation`, 'x-default': `${BASE_URL}/accommodation` },
    },
  };
}

const ACCOMMODATION = [
  {
    area: 'Birkdale & Southport Centre',
    distanceFromBirkdale: '< 2 miles',
    options: [
      {
        name: 'The Bold Hotel',
        type: 'Hotel',
        address: 'Lord Street, Southport',
        desc: 'The classic choice for golf visitors to Southport. On Lord Street, 10 minutes from Birkdale by taxi, good restaurant on site. Popular with Open Championship groups in 2017. Book well ahead in summer.',
        approxRate: '£120–£250/night',
        golferFriendly: ['Secure club storage', 'Early breakfast available', 'Good bar/restaurant', 'Central location'],
        bookingUrl: 'https://www.booking.com/hotel/gb/the-bold.html',
      },
      {
        name: 'The Vincent Hotel',
        type: 'Boutique Hotel',
        address: 'Lord Street, Southport',
        desc: 'More upscale option on Lord Street. The Grill Room is excellent. Stylish rooms, good spa. Works well for a premium trip alongside Royal Birkdale.',
        approxRate: '£150–£350/night',
        golferFriendly: ['Golf storage on request', 'Spa for post-round recovery', 'Fine dining', 'Central location'],
        bookingUrl: 'https://www.thevincenthotel.com',
      },
    ],
  },
  {
    area: 'Formby Village',
    distanceFromBirkdale: '5–6 miles',
    options: [
      {
        name: 'Formby Hall Golf Resort',
        type: 'Golf Resort',
        address: 'Southport Old Road, Formby',
        desc: 'Golf-specific resort between Formby village and the coast courses. Has its own parkland course. Proximity to Formby Golf Club and Birkdale corridor. Purpose-built for golf groups.',
        approxRate: '£100–£200/night',
        golferFriendly: ['Dedicated golf storage', 'Early breakfast standard', 'Golf packages available', 'On-site course'],
        bookingUrl: 'https://www.formbyhallgolfresort.co.uk',
      },
      {
        name: 'Formby B&Bs (various)',
        type: 'B&B',
        address: 'Formby Village, L37',
        desc: 'Several quality B&Bs in Formby village — quieter, more affordable base. The village has good restaurants within walking distance. 20 min drive to Birkdale. Check SouthportGuide.co.uk for full listings.',
        approxRate: '£70–£120/night',
        golferFriendly: ['Flexible breakfast times', 'Good value', 'Quiet setting', 'Village amenities'],
        bookingUrl: 'https://www.formbyguide.co.uk/accommodation',
      },
    ],
  },
  {
    area: 'Greater Liverpool',
    distanceFromBirkdale: '18–25 miles',
    options: [
      {
        name: 'Liverpool City Centre Hotels',
        type: 'Hotel (various)',
        address: 'Liverpool City Centre',
        desc: 'Wide range of options from budget chains to boutique hotels. 45–60 min to Birkdale by car, 50 min by train to Southport then taxi. Good for multi-day trips combining golf with Liverpool itself.',
        approxRate: '£70–£200/night',
        golferFriendly: ['Wide choice', 'Good transport links', 'City dining', 'Parking widely available'],
        bookingUrl: 'https://www.booking.com/searchresults.html?ss=Liverpool',
      },
    ],
  },
];

export default async function AccommodationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      <div className="bg-[#0D1B2A] py-14">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-[#B8912A] text-sm uppercase tracking-widest font-semibold mb-3">Golfer-Friendly Stays</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Accommodation for Golfers</h1>
          <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
            Curated accommodation near Royal Birkdale and the Sefton Coast courses — selected for club storage, early breakfast, and proximity to the first tee.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12 space-y-12">

        {/* The Open callout */}
        <div className="bg-[#B8912A]/10 border border-[#B8912A]/30 rounded-xl px-6 py-5 flex items-start gap-4">
          <Trophy size={22} className="text-[#B8912A] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-[#0D1B2A]">Booking for The Open Championship 2026?</p>
            <p className="text-[#2C3E50]/70 text-sm mt-1 leading-relaxed">
              Accommodation near Royal Birkdale during Open week (14–20 July 2026) books out 12–18 months ahead. If you're reading this after March 2026, options within 5 miles will be very limited. Check Liverpool city centre, Ormskirk and Wigan as overflow options.
            </p>
            <Link href={`${prefix}/the-open-2026`} className="text-[#B8912A] text-sm font-semibold hover:text-[#0D1B2A] transition-colors flex items-center gap-1 mt-2">
              Open 2026 accommodation guide <ChevronRight size={12} />
            </Link>
          </div>
        </div>

        {/* Accommodation areas */}
        {ACCOMMODATION.map((area) => (
          <div key={area.area}>
            <div className="flex items-baseline gap-4 mb-6">
              <h2 className="font-display text-2xl font-bold text-[#0D1B2A]">{area.area}</h2>
              <span className="text-[#2C3E50]/50 text-sm flex items-center gap-1.5">
                <MapPin size={12} /> {area.distanceFromBirkdale} from Royal Birkdale
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {area.options.map((opt) => (
                <div key={opt.name} className="bg-white border border-[#E8E3D8] rounded-xl overflow-hidden shadow-sm">
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-display text-xl font-bold text-[#0D1B2A]">{opt.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-[#2C3E50]/50 mt-1">
                          <span className="bg-[#1A4A30]/10 text-[#1A4A30] px-2 py-0.5 rounded-full font-medium">{opt.type}</span>
                          <span>{opt.address}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-[#1A4A30] font-semibold text-sm">{opt.approxRate}</div>
                        <div className="text-[#2C3E50]/40 text-xs">approx</div>
                      </div>
                    </div>

                    <p className="text-[#2C3E50]/70 text-sm leading-relaxed mb-4">{opt.desc}</p>

                    <div className="mb-4">
                      <div className="text-xs text-[#2C3E50]/50 uppercase tracking-wider mb-2">Golfer-Friendly Features</div>
                      <ul className="space-y-1">
                        {opt.golferFriendly.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-[#2C3E50]/70">
                            <CheckCircle2 size={12} className="text-[#1A4A30] shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={opt.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex items-center justify-center gap-2 bg-[#1A4A30] text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-[#2A6A45] transition-colors text-sm w-full"
                    >
                      <Bed size={14} />
                      Check Availability ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Booking tips */}
        <div className="bg-[#1A4A30] rounded-2xl p-8 text-white">
          <h2 className="font-display text-2xl font-bold mb-6">Accommodation Tips for Golf Visitors</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: Clock, tip: 'Book Tuesday–Thursday tee times if staying mid-week — better availability at all courses and usually quieter on the course.' },
              { icon: Bed, tip: 'Ask about club/bag storage when booking. Good golf hotels will have a dedicated dry store rather than leaving bags in your room overnight.' },
              { icon: MapPin, tip: 'Birkdale station (Merseyrail) is an 8-minute walk from Royal Birkdale\'s main entrance. Useful if your hotel is in central Southport.' },
              { icon: CheckCircle2, tip: 'Flexible cancellation matters — links golf weather is unpredictable. Book refundable rates unless the savings on non-refundable are significant.' },
            ].map(({ icon: Icon, tip }, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#B8912A]/20 rounded-lg flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-[#D4AE7A]" />
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Network links */}
        <div className="grid sm:grid-cols-2 gap-6">
          <a href="https://www.southportguide.co.uk/accommodation" target="_blank" rel="noopener noreferrer" className="group bg-white border border-[#E8E3D8] rounded-xl p-5 flex items-center gap-4 hover:border-[#1A4A30]/30 transition-all card-hover">
            <Bed size={20} className="text-[#1A4A30] shrink-0" />
            <div>
              <div className="font-semibold text-[#0D1B2A] group-hover:text-[#1A4A30] transition-colors">Full Southport Accommodation Guide</div>
              <div className="text-[#2C3E50]/55 text-sm">SouthportGuide.co.uk — hotels, B&Bs, self-catering</div>
            </div>
            <ExternalLink size={14} className="text-[#2C3E50]/30 ml-auto shrink-0" />
          </a>
          <a href="https://www.formbyguide.co.uk/accommodation" target="_blank" rel="noopener noreferrer" className="group bg-white border border-[#E8E3D8] rounded-xl p-5 flex items-center gap-4 hover:border-[#2E6B3E]/30 transition-all card-hover">
            <Bed size={20} className="text-[#2E6B3E] shrink-0" />
            <div>
              <div className="font-semibold text-[#0D1B2A] group-hover:text-[#1A4A30] transition-colors">Formby Accommodation Guide</div>
              <div className="text-[#2C3E50]/55 text-sm">FormbyGuide.co.uk — quieter base, 5 miles from Birkdale</div>
            </div>
            <ExternalLink size={14} className="text-[#2C3E50]/30 ml-auto shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}
