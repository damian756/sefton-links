import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { AD_SLOTS, activeSponsor, advertiseHref, getAdOption, type AdSlotDef } from '@/lib/ad-slots';

// One advert space. Filled: a labelled card with the sponsor's name, text,
// optional photo and a sponsored link. Empty: an "advertise here" card that
// names the space and links to the advertise page. English pages only, because
// the card's labels are not translated into the other 17 languages.

const EMPTY_COPY: Record<AdSlotDef['kind'], { kicker: string; body: string }> = {
  home: {
    kicker: 'Advertising space',
    body: 'One hotel, B&B, restaurant or golf travel business on the home page, clearly labelled as an advert, with a photo, a line about you and a link.',
  },
  course: {
    kicker: 'Partner space',
    body: 'One hotel, B&B, restaurant or golf travel firm on this course guide, never a golf club, labelled as an advert.',
  },
  page: {
    kicker: 'Sponsor this page',
    body: 'Your business shown once at the end of this page, labelled as a sponsor. Adverts never appear inside a review, and paying for a space does not change what we write.',
  },
  post: {
    kicker: 'Sponsor this post',
    body: 'Your business shown once at the end of this post, labelled as a sponsor. Adverts never appear inside a review, and paying for a space does not change what we write.',
  },
};

export default function AdSlot({
  id,
  locale,
  compact = false,
  className = '',
}: {
  id: string;
  locale: string;
  /** Stacked layout for a narrow column, such as the course page sidebar. */
  compact?: boolean;
  className?: string;
}) {
  if (locale !== 'en') return null;
  const slot = AD_SLOTS[id];
  if (!slot) return null;

  const sponsor = activeSponsor(slot);
  const option = getAdOption(slot.option);
  const label = slot.kind === 'home' || slot.kind === 'course' ? 'Advertisement' : 'Sponsor';

  if (sponsor) {
    return (
      <aside
        aria-label={label}
        data-ad-slot={slot.id}
        className={`bg-white border border-[#E8E3D8] rounded-xl overflow-hidden ${className}`}
      >
        <div className={compact ? '' : 'sm:flex'}>
          {sponsor.image && (
            <div className={`relative bg-[#F8F5EE] ${compact ? 'aspect-[16/9]' : 'aspect-[16/9] sm:aspect-auto sm:w-64 sm:shrink-0'}`}>
              <Image src={sponsor.image} alt={sponsor.name} fill className="object-cover" sizes={compact ? '400px' : '(min-width: 640px) 256px, 100vw'} />
            </div>
          )}
          <div className="p-5 flex-1 min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#0D1B2A] mb-2">{label}</p>
            <p className="font-display text-lg font-bold text-[#0D1B2A] leading-snug mb-1.5">{sponsor.name}</p>
            <p className="text-[#2C3E50]/70 text-sm leading-relaxed mb-4">{sponsor.text}</p>
            <a
              href={sponsor.url}
              target="_blank"
              rel="sponsored noopener"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A4A30] hover:text-[#B8912A] transition-colors"
            >
              Visit {sponsor.name} <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </aside>
    );
  }

  const copy = EMPTY_COPY[slot.kind];
  return (
    <aside
      aria-label={copy.kicker}
      data-ad-slot={slot.id}
      className={`rounded-xl border-[1.5px] border-dashed border-[#1A4A30]/40 bg-[#F3EFE4] p-5 sm:p-6 ${className}`}
    >
      <div className={compact ? 'space-y-4' : 'flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8'}>
        <div className="min-w-0 md:flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#2C3E50]/55 mb-1.5">{copy.kicker}</p>
          <p className="font-display text-lg md:text-xl font-bold text-[#0D1B2A] leading-snug mb-1.5">{slot.title}</p>
          <p className="text-[#2C3E50]/70 text-sm leading-relaxed">{copy.body}</p>
        </div>
        <div className="flex flex-col items-start gap-2 md:shrink-0">
          {option && <span className="text-sm font-semibold text-[#0D1B2A]">{option.name}: {option.from}</span>}
          <Link
            href={advertiseHref(slot)}
            className="inline-block bg-[#1A4A30] hover:bg-[#2A6A45] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
          >
            See advertising options
          </Link>
        </div>
      </div>
    </aside>
  );
}
