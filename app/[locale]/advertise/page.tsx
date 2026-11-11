import type { Metadata } from 'next';
import { Mail, Shield, TrendingUp, Globe, Users, Star, BarChart2 } from 'lucide-react';
import { buildAlternates, buildOg } from '@/lib/metadata';
import { BLOG_POSTS } from '@/lib/blog';
import { locales } from '@/i18n/routing';

const title = 'Advertise on SeftonLinks | Sefton Coast Network';
const description =
  'Display advertising on SeftonLinks and the Sefton Coast Network, beside course guides, visitor information and golf travel articles for the Sefton Coast.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description,
    alternates: buildAlternates('/advertise'),
    openGraph: buildOg('/advertise', { title, description }),
  };
}

const NETWORK_PACKAGES = [
  {
    name: 'Core',
    sites: 'SouthportGuide + FormbyGuide',
    price: '£450',
    total: '£2,700',
    featured: false,
    features: [
      'Placement on SouthportGuide and FormbyGuide pages, by arrangement',
      'SouthportGuide homepage placement, by arrangement',
      'Category exclusivity on both sites',
      'Monthly performance reporting',
    ],
  },
  {
    name: 'Premium',
    sites: 'SouthportGuide + FormbyGuide + SeftonLinks',
    price: '£650',
    total: '£3,900',
    featured: true,
    features: [
      'All Core placements',
      'SeftonLinks placement, by arrangement',
      'Category exclusivity across all three sites',
      'Up to 2 creative updates per month',
      'Monthly performance reporting',
    ],
  },
  {
    name: 'Full Network',
    sites: 'All four Sefton Coast Network sites',
    price: '£800',
    total: '£4,800',
    featured: false,
    features: [
      'All Premium placements',
      'SeftonCoastWildlife placement, by arrangement',
      'All four network sites',
      'Quarterly review call',
      'Monthly performance reporting',
    ],
  },
];

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-[#F8F5EE]">

      {/* Hero */}
      <div className="bg-[#0D1B2A] py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <p className="text-[#C9A96E] text-xs font-bold uppercase tracking-widest mb-4">
            Advertising and Partnerships
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Reach the Sefton Coast golf audience.<br />
            <span className="text-[#C9A96E]">Four local sites, one network.</span>
          </h1>
          <p className="text-white/65 text-lg leading-relaxed max-w-2xl mb-10">
            SeftonLinks is a guide to links golf on the Sefton Coast, with course guides, visitor information and a blog, and site menus in {locales.length} languages. It is part of the Sefton Coast Network: four independent editorial sites covering Southport, Formby, golf and wildlife on the coast.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:partnerships@seftoncoast.network"
              className="inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#b8944f] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <Mail className="w-4 h-4" />
              partnerships@seftoncoast.network
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#0D1B2A] border-t border-white/8 px-4 pb-10">
        <div className="container mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6 pt-2">
          {[
            { stat: String(locales.length), label: 'Languages (site menus)' },
            { stat: '6', label: 'Course guides' },
            { stat: String(BLOG_POSTS.length), label: 'Blog articles' },
            { stat: '4', label: 'Network sites' },
          ].map((item) => (
            <div key={item.label} className="text-center py-6">
              <div className="text-3xl font-extrabold text-[#C9A96E] mb-1">{item.stat}</div>
              <div className="text-sm text-white/40 font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* The Open callout */}
      <div className="bg-[#1a3050] text-white px-4 py-12">
        <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-start gap-8">
          <div className="flex-shrink-0 bg-[#C9A96E] rounded-xl px-6 py-4 text-center min-w-[100px]">
            <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">July</div>
            <div className="text-3xl font-extrabold leading-none">12-19</div>
            <div className="text-xs opacity-80 mt-1">2026</div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">The Open Championship 2026 at Royal Birkdale</h2>
            <p className="text-white/65 leading-relaxed text-sm">
              SeftonLinks covered The 154th Open at Royal Birkdale, with guides for visiting golfers in the months before the Championship and a report on Ryan Fox&apos;s win.
            </p>
          </div>
        </div>
      </div>

      {/* Why SeftonLinks */}
      <div className="px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-[#C9A96E] text-xs font-bold uppercase tracking-widest mb-3">Why advertise here</p>
            <h2 className="font-display text-3xl font-bold text-[#0D1B2A]">Your brand beside Sefton Coast golf content</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <Users className="w-5 h-5 text-[#C9A96E]" />,
                title: 'Golf-specific content',
                body: 'Your advert sits beside course guides, visitor information, green fees and golf travel articles for the six Sefton Coast courses.',
              },
              {
                icon: <Globe className="w-5 h-5 text-[#C9A96E]" />,
                title: `${locales.length} languages`,
                body: `Site menus and key page text are available in ${locales.length} languages, including German, Japanese, Swedish and Welsh. Blog articles are published in English.`,
              },
              {
                icon: <Star className="w-5 h-5 text-[#C9A96E]" />,
                title: 'First in category',
                body: 'The first advertiser in a category has the space to themselves for the duration of the contract.',
              },
              {
                icon: <Shield className="w-5 h-5 text-[#C9A96E]" />,
                title: 'Category exclusivity',
                body: 'No direct competitor in your category will appear on SeftonLinks during your contract. That is a firm commitment, not a best-efforts clause.',
              },
              {
                icon: <TrendingUp className="w-5 h-5 text-[#C9A96E]" />,
                title: 'Monthly reporting',
                body: 'Every package includes monthly performance reporting, so you can see how your placement is doing.',
              },
              {
                icon: <BarChart2 className="w-5 h-5 text-[#C9A96E]" />,
                title: 'Part of the network',
                body: 'SeftonLinks is part of the Sefton Coast Network alongside SouthportGuide, FormbyGuide, and SeftonCoastWildlife. Cross-site packages are available.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-[#E8E3D8] rounded-xl p-5">
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#0D1B2A] text-sm mb-2">{item.title}</h3>
                <p className="text-[#2C3E50]/60 text-xs leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Network packages */}
      <div className="bg-[#F0EDE5] border-t border-[#E8E3D8] px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-[#C9A96E] text-xs font-bold uppercase tracking-widest mb-3">Advertising packages</p>
            <h2 className="font-display text-3xl font-bold text-[#0D1B2A]">Sefton Coast Network</h2>
            <p className="text-[#2C3E50]/55 mt-3 text-sm max-w-xl mx-auto">
              Packages cover one site or the full network. The Premium package is the right choice for brands targeting the Sefton Coast professional and golf demographic.
            </p>
            <p className="text-[#2C3E50]/40 mt-2 text-xs">All packages: six-month minimum contract. Category exclusivity included.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {NETWORK_PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl overflow-hidden border-2 ${pkg.featured ? 'border-[#C9A96E]' : 'border-[#E8E3D8]'}`}
              >
                <div className={`px-5 py-4 ${pkg.featured ? 'bg-[#0D1B2A]' : 'bg-white'}`}>
                  {pkg.featured && (
                    <span className="inline-block bg-[#C9A96E] text-white text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-2">
                      Recommended
                    </span>
                  )}
                  <h3 className={`font-bold text-lg ${pkg.featured ? 'text-white' : 'text-[#0D1B2A]'}`}>{pkg.name}</h3>
                  <p className={`text-xs mt-0.5 ${pkg.featured ? 'text-white/50' : 'text-[#2C3E50]/40'}`}>{pkg.sites}</p>
                </div>
                <div className="p-5 bg-white">
                  <div className="text-2xl font-extrabold text-[#0D1B2A] mb-0.5">
                    {pkg.price}<span className="text-sm font-normal text-[#2C3E50]/40"> / month</span>
                  </div>
                  <p className="text-xs text-[#2C3E50]/40 mb-4">{pkg.total} · 6-month minimum contract</p>
                  <ul className="space-y-2 mb-5">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-[#2C3E50]/70">
                        <span className={`w-3 h-3 rounded-full flex-shrink-0 mt-0.5 ${pkg.featured ? 'bg-[#C9A96E]' : 'bg-[#2E6B3E]'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="mailto:partnerships@seftoncoast.network"
                    className={`block text-center font-semibold py-2.5 rounded-lg text-sm transition-colors ${
                      pkg.featured
                        ? 'bg-[#C9A96E] hover:bg-[#b8944f] text-white'
                        : 'border border-[#0D1B2A] text-[#0D1B2A] hover:bg-[#0D1B2A] hover:text-white'
                    }`}
                  >
                    Enquire
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA footer */}
      <div className="bg-[#0D1B2A] text-white px-4 py-16">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-3">Request the media kit</h2>
          <p className="text-white/55 mb-8 text-sm leading-relaxed">
            Email us at partnerships@seftoncoast.network and we will send the full media kit including ad specifications, package details, and terms. We respond to all advertising enquiries within one working day.
          </p>
          <a
            href="mailto:partnerships@seftoncoast.network"
            className="inline-flex items-center justify-center gap-2 bg-[#C9A96E] hover:bg-[#b8944f] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            <Mail className="w-4 h-4" />
            partnerships@seftoncoast.network
          </a>
        </div>
      </div>

    </div>
  );
}
