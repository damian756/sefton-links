import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ChevronRight, Clock, ArrowRight } from 'lucide-react';
import { BLOG_POSTS, BLOG_CATEGORIES, DAMIAN, getCategoryBySlug } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Links Golf Blog — Course Reviews, Tips & The Open 2026 | SeftonLinks',
  description:
    'First-hand course reviews, links golf tips, and everything you need to know about The Open Championship 2026 at Royal Birkdale — written by a local off 24.',
  alternates: { canonical: 'https://www.seftonlinks.com/blog' },
  openGraph: {
    title: 'Links Golf Blog | SeftonLinks.com',
    description: 'Course reviews, links golf tips and Open 2026 guides — written by a local.',
    url: 'https://www.seftonlinks.com/blog',
    type: 'website',
    siteName: 'SeftonLinks.com',
  },
};

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'en') notFound();

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      {/* Hero */}
      <div className="bg-[#0D1B2A] text-white py-14">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-[#B8912A] text-xs font-bold uppercase tracking-widest mb-3">
            The SeftonLinks Blog
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Links Golf — Written From the Inside
          </h1>
          <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
            Course reviews, practical tips, and Open 2026 guides — written by Damian Roche, founder
            of SeftonLinks and a 24-handicapper who lives three miles from Royal Birkdale.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl py-12">

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10">
          {BLOG_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog/category/${cat.slug}`}
              className="px-4 py-1.5 rounded-full text-sm font-semibold border border-[#B8912A]/40 text-[#B8912A] hover:bg-[#B8912A] hover:text-white transition-colors"
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {BLOG_POSTS.map((post) => {
            const cat = getCategoryBySlug(post.categorySlug);
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-[#E8E3D8] p-7 hover:border-[#B8912A]/40 hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  {cat && (
                    <span className="text-xs font-semibold text-[#B8912A] uppercase tracking-wider">
                      {cat.label}
                    </span>
                  )}
                  <span className="text-[#2C3E50]/30 text-xs">·</span>
                  <span className="text-xs text-[#2C3E50]/50 flex items-center gap-1">
                    <Clock size={11} /> {post.readingTime}
                  </span>
                </div>
                <h2 className="font-display text-xl font-bold text-[#0D1B2A] mb-3 leading-snug group-hover:text-[#1A4A30] transition-colors">
                  {post.title}
                </h2>
                <p className="text-[#2C3E50]/70 text-sm leading-relaxed mb-5 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#2C3E50]/45">{post.date}</span>
                  <span className="text-[#B8912A] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Author box */}
        <div className="mt-14 bg-white rounded-2xl border border-[#E8E3D8] p-8 flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-14 h-14 rounded-full bg-[#0D1B2A] flex items-center justify-center flex-shrink-0">
            <span className="text-[#B8912A] font-display font-bold text-lg">D</span>
          </div>
          <div>
            <p className="font-semibold text-[#0D1B2A] text-lg">{DAMIAN.name}</p>
            <p className="text-[#2C3E50]/55 text-sm mb-3">{DAMIAN.jobTitle}</p>
            <p className="text-[#2C3E50]/75 text-sm leading-relaxed">{DAMIAN.bio}</p>
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
    </div>
  );
}
