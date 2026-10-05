import type { Metadata } from 'next';
import Link from 'next/link';
import { BASE_URL } from '@/lib/metadata';

const description =
  'Who publishes SeftonLinks.com, how it is paid for, and the other interests of its publisher.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Disclosure',
    description,
    alternates: { canonical: `${BASE_URL}/disclosure` },
  };
}

const h2 = 'font-display text-xl font-bold text-[#0D1B2A]';
const a = 'text-[#1A4A30] underline';

export default function DisclosurePage() {
  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      <div className="bg-[#0D1B2A] py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-white mb-3">Disclosure</h1>
          <p className="text-white/55 text-sm">Last updated: 5 October 2026</p>
        </div>
      </div>
      <div className="container mx-auto px-4 max-w-3xl py-14">
        <div className="bg-white border border-[#E8E3D8] rounded-2xl p-8 max-w-none text-sm leading-relaxed text-[#2C3E50]/75 space-y-4">
          <h2 className={h2}>Who publishes SeftonLinks</h2>
          <p>
            SeftonLinks.com is published by Churchtown Media Ltd, a company registered in England and Wales
            (Company No. 16960442). Registered office: Suite RA01, 195-197 Wood Street, London, E17 3NU. Damian Roche is its director. He lives in Southport.
          </p>

          <h2 className={h2}>How it is paid for</h2>
          <p>
            The site is paid for by Churchtown Media Ltd, by{' '}
            <Link href="/advertise" className={a}>advertising</Link>, and by affiliate links to accommodation
            and golf travel, which are marked where they appear. None of these change what we write about
            a course.
          </p>

          <h2 className={h2}>Current interests</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Churchtown Media Ltd, the publisher of this site.</li>
            <li>
              <a href="https://www.institrace.co.uk" rel="nofollow noopener" target="_blank" className={a}>
                Institrace
              </a>
              , a public records index run by Churchtown Media Ltd.
            </li>
            <li>
              The other Sefton Coast Network sites, also published by Churchtown Media Ltd:
              SouthportGuide.co.uk, FormbyGuide.co.uk and SeftonCoastWildlife.co.uk.
            </li>
          </ul>

          <h2 className={h2}>Former interests</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>SIBA Digital (closed October 2026).</li>
            <li>The Sandgrounder (closed September 2026).</li>
          </ul>

          <h2 className={h2}>BID levy</h2>
          <p>
            Churchtown Media Ltd does not occupy rateable premises inside a Business Improvement District and
            does not pay a BID levy.
          </p>

          <h2 className={h2}>Politics</h2>
          <p>
            Damian Roche has no political affiliation. SeftonLinks has no link to any political party.
          </p>

          <h2 className={h2}>Changes</h2>
          <p>
            We update this page when any of these interests change. The date at the top shows the last
            update. Questions to{' '}
            <a href="mailto:hello@churchtownmedia.co.uk" className={a}>
              hello@churchtownmedia.co.uk
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
