'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NavMenu({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations('nav');

  const prefix = locale === 'en' ? '' : `/${locale}`;

  const links = [
    { label: t('courses'), href: `${prefix}/courses` },
    { label: t('theOpen'), href: `${prefix}/the-open-2026`, highlight: true },
    { label: t('itineraries'), href: `${prefix}/itineraries` },
    { label: t('conditions'), href: `${prefix}/conditions` },
    { label: t('teeTimes'), href: `${prefix}/tee-times` },
    { label: t('accommodation'), href: `${prefix}/accommodation` },
  ];

  return (
    <>
      {/* Desktop nav */}
      <div className="hidden lg:flex items-center gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              link.highlight
                ? 'px-3 py-1.5 rounded text-sm font-semibold bg-[#B8912A] text-white hover:bg-[#D4AE7A] transition-colors'
                : 'px-3 py-1.5 rounded text-sm font-medium text-[#2C3E50] hover:text-[#0D1B2A] hover:bg-[#E8E3D8]/60 transition-colors'
            }
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden p-2 rounded text-[#0D1B2A] hover:bg-[#E8E3D8] transition-colors"
        aria-label="Toggle menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-[#E8E3D8] shadow-lg lg:hidden z-50">
          <nav className="container mx-auto px-4 py-4 max-w-7xl flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={
                  link.highlight
                    ? 'px-4 py-3 rounded font-semibold bg-[#B8912A] text-white text-center'
                    : 'px-4 py-3 rounded text-[#0D1B2A] hover:bg-[#F8F5EE] transition-colors'
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
