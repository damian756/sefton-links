'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Clock, ArrowRight, X } from 'lucide-react';
import type { BlogPost, BlogCategory } from '@/lib/blog';

/** What a post card needs: the client gets these fields, not whole post bodies. */
export type BlogCard = Pick<BlogPost, 'slug' | 'title' | 'excerpt' | 'categorySlug' | 'date' | 'readingTime' | 'image' | 'imageAlt' | 'sponsor'> & {
  /** Written before The 154th Open and still about Open week: shown with a dated label. */
  preOpen?: boolean;
};

interface Props {
  posts: BlogCard[];
  categories: BlogCategory[];
  postCountByCategory: Record<string, number>;
}

export default function BlogSearch({ posts, categories, postCountByCategory }: Props) {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(query.toLowerCase()),
      )
    : posts;

  return (
    <>
      {/* Search + category pills row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Search input */}
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2C3E50]/35 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts…"
            aria-label="Search posts"
            className="w-full pl-9 pr-8 py-2 text-sm rounded-full border border-[#E8E3D8] bg-white text-[#0D1B2A] placeholder-[#2C3E50]/35 focus:outline-none focus:border-[#B8912A] transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2C3E50]/40 hover:text-[#0D1B2A] transition-colors"
              aria-label="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const count = postCountByCategory[cat.slug] ?? 0;
            return (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold border border-[#B8912A]/40 text-[#B8912A] hover:bg-[#B8912A] hover:text-white transition-colors"
              >
                {cat.label}
                <span className="text-xs opacity-70">({count})</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[#2C3E50]/50">
          <p className="text-lg mb-2">No posts found for &ldquo;{query}&rdquo;</p>
          <button onClick={() => setQuery('')} className="text-[#B8912A] text-sm font-semibold hover:underline">
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((post) => {
            const cat = categories.find((c) => c.slug === post.categorySlug);
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-[#E8E3D8] hover:border-[#B8912A]/40 hover:shadow-md transition-all flex flex-col overflow-hidden"
              >
                {post.image && (
                  // next/image serves a resized copy (the originals are 1 to 4 MB each).
                  // The title sits under the picture, so a picture without its own
                  // description is marked decorative rather than repeating the title.
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.imageAlt ?? ''}
                      fill
                      sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    {post.sponsor && (
                      <span className="bg-[#B8912A] text-white text-[11px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
                        Sponsored
                      </span>
                    )}
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
                  {post.preOpen && (
                    <p className="text-xs font-semibold text-[#0D1B2A] mb-2">Written before The 154th Open (July 2026).</p>
                  )}
                  <p className="text-[#2C3E50]/70 text-sm leading-relaxed mb-5 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#2C3E50]/45">{post.date}</span>
                    <span className="text-[#B8912A] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
