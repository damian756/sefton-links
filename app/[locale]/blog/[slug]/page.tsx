import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ChevronRight, Clock, ArrowLeft } from 'lucide-react';
import { BLOG_POSTS, DAMIAN, getPostBySlug, getCategoryBySlug, getIsoDate, type ContentBlock } from '@/lib/blog';
import AdSlot from '@/components/AdSlot';
import { AD_SLOTS } from '@/lib/ad-slots';

// This page shows an advert space: re-render at least daily so a sponsor whose
// `until` date has passed drops off without a deploy.
export const revalidate = 86400;

const BASE_URL = 'https://www.seftonlinks.com';

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ locale: 'en', slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== 'en') return {};
  const post = getPostBySlug(slug);
  if (!post) return {};
  const cat = getCategoryBySlug(post.categorySlug);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${BASE_URL}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${BASE_URL}/blog/${slug}`,
      type: 'article',
      siteName: 'SeftonLinks.com',
      publishedTime: getIsoDate(post),
      authors: [post.sponsor ? post.sponsor.name : DAMIAN.name],
      section: cat?.label,
      images: [{ url: post.image ?? `${BASE_URL}/og-default.jpg`, width: 1200, height: 630, alt: post.imageAlt ?? post.title }],
    },
  };
}

// Posts mention internal pages as plain text ("seftonlinks.com/courses"). Turn those into links.
const SITE_PATH = /seftonlinks\.com(\/[a-z0-9\-/]*)?/g;

function withLinks(text: string, onDark = false) {
  const matches = [...text.matchAll(SITE_PATH)];
  if (matches.length === 0) return text;
  const linkClass = onDark
    ? 'text-[#D4AE7A] underline underline-offset-2 hover:text-white'
    : 'text-[#1A4A30] font-medium underline underline-offset-2 hover:text-[#B8912A]';
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of matches) {
    const start = m.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    const href = (m[1] ?? '/').replace(/\/$/, '') || '/';
    parts.push(
      <Link key={start} href={href} className={linkClass}>
        {m[0]}
      </Link>,
    );
    last = start + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 key={i} className="font-display text-2xl font-bold text-[#0D1B2A] mt-10 mb-4 leading-snug">
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 key={i} className="font-display text-xl font-bold text-[#0D1B2A] mt-8 mb-3">
          {block.text}
        </h3>
      );
    case 'p':
      return (
        <p key={i} className="text-[#2C3E50]/80 leading-relaxed mb-5 text-[1.0625rem]">
          {withLinks(block.text)}
        </p>
      );
    case 'ul':
      return (
        <ul key={i} className="mb-6 space-y-2.5">
          {block.items.map((item, j) => (
            <li key={j} className="flex gap-3 text-[#2C3E50]/80 text-[1.0625rem]">
              <span className="text-[#B8912A] font-bold flex-none mt-0.5">→</span>
              <span>{withLinks(item)}</span>
            </li>
          ))}
        </ul>
      );
    case 'callout':
      return (
        <div key={i} className="my-8 rounded-xl border border-[#B8912A]/30 bg-[#0D1B2A] px-6 py-5">
          <p className="text-white/80 text-sm leading-relaxed">{withLinks(block.text, true)}</p>
        </div>
      );
    case 'hr':
      return <hr key={i} className="my-8 border-[#E8E3D8]" />;
    default:
      return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (locale !== 'en') notFound();

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const cat = getCategoryBySlug(post.categorySlug);
  const isoDate = getIsoDate(post);
  const canonicalUrl = `${BASE_URL}/blog/${slug}`;

  const sponsor = post.sponsor;
  // One advert per page: a sponsored article is itself the advert, so it gets
  // no end-of-post card.
  const endSlot = !sponsor && AD_SLOTS[`post-${slug}`] ? `post-${slug}` : null;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    url: canonicalUrl,
    datePublished: isoDate,
    dateModified: isoDate,
    inLanguage: 'en-GB',
    author: sponsor ? { '@type': 'Organization', name: sponsor.name, url: sponsor.url } : {
      '@type': 'Person',
      '@id': DAMIAN.schemaId,
      name: DAMIAN.name,
      jobTitle: DAMIAN.jobTitle,
      url: DAMIAN.url,
      sameAs: [
        'https://www.linkedin.com/in/damian-roche/',
        'https://find-and-update.company-information.service.gov.uk/company/16960442',
      ],
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.churchtownmedia.co.uk/#organization',
      name: 'Churchtown Media',
      url: 'https://www.churchtownmedia.co.uk',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E8E3D8]">
        <div className="container mx-auto px-4 max-w-3xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#2C3E50]/55 flex-wrap">
            <Link href="/" className="hover:text-[#1A4A30] transition-colors">Home</Link>
            <ChevronRight size={13} />
            <Link href="/blog" className="hover:text-[#1A4A30] transition-colors">Blog</Link>
            {cat && (
              <>
                <ChevronRight size={13} />
                <Link href={`/blog/category/${cat.slug}`} className="hover:text-[#1A4A30] transition-colors">
                  {cat.label}
                </Link>
              </>
            )}
            <ChevronRight size={13} />
            <span className="text-[#0D1B2A] font-medium truncate max-w-[200px]">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article hero */}
      <div className="bg-[#0D1B2A] text-white py-12 relative overflow-hidden">
        {post.image && (
          <Image
            src={post.image}
            alt={post.imageAlt ?? post.title}
            fill
            className="object-cover opacity-20"
            priority
          />
        )}
        <div className="relative z-10 container mx-auto px-4 max-w-3xl">
          {sponsor && (
            <p className="inline-block bg-[#B8912A] text-white text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded mb-3 mr-3">
              Sponsored
            </p>
          )}
          {cat && (
            <p className={`text-[#B8912A] text-xs font-bold uppercase tracking-widest mb-3 ${sponsor ? 'inline-block' : ''}`}>
              {cat.label}
            </p>
          )}
          <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-5">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm">
            <span>{post.date}</span>
            <span className="flex items-center gap-1"><Clock size={13} /> {post.readingTime}</span>
            {sponsor ? (
              <span>
                Sponsored by{' '}
                <a href={sponsor.url} target="_blank" rel="sponsored noopener" className="text-white/80 underline underline-offset-2 hover:text-white">
                  {sponsor.name}
                </a>
              </span>
            ) : (
              <span>By {DAMIAN.name}</span>
            )}
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="container mx-auto px-4 max-w-3xl py-12">

        {/* Excerpt */}
        <p className="text-lg text-[#2C3E50]/70 leading-relaxed mb-8 pb-8 border-b border-[#E8E3D8] font-medium">
          {post.excerpt}
        </p>

        {/* Content */}
        <div className="prose-lg max-w-none">
          {post.content.map((block, i) => renderBlock(block, i))}
        </div>

        {endSlot && <AdSlot id={endSlot} locale="en" className="mt-12" />}

        {/* Author box (not on sponsored articles) */}
        {!sponsor && (
        <div className="mt-14 pt-10 border-t border-[#E8E3D8]">
          <div className="bg-white rounded-2xl border border-[#E8E3D8] p-7 flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-14 h-14 rounded-full bg-[#0D1B2A] flex items-center justify-center flex-shrink-0">
              <span className="text-[#B8912A] font-display font-bold text-lg">D</span>
            </div>
            <div>
              <p className="font-semibold text-[#0D1B2A] text-base">{DAMIAN.name}</p>
              <p className="text-[#2C3E50]/50 text-sm mb-3">{DAMIAN.jobTitle}</p>
              <p className="text-[#2C3E50]/70 text-sm leading-relaxed">{DAMIAN.bio}</p>
              <a
                href={DAMIAN.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-[#B8912A] hover:text-[#0D1B2A] transition-colors"
              >
                About Damian <ChevronRight size={13} />
              </a>
            </div>
          </div>
        </div>
        )}

        {/* Back */}
        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#1A4A30] font-semibold hover:text-[#B8912A] transition-colors text-sm"
          >
            <ArrowLeft size={14} /> Back to blog
          </Link>
        </div>

      </div>
    </div>
  );
}
