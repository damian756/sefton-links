'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

const OPEN_START = new Date('2026-07-12T06:30:00Z');
const OPEN_END = new Date('2026-07-19T20:00:00Z');

function getStatus() {
  const now = new Date();
  const isLive = now >= OPEN_START && now < OPEN_END;
  const isOver = now >= OPEN_END;
  const diff = OPEN_START.getTime() - now.getTime();
  if (isLive || isOver || diff <= 0) return { isLive, isOver, days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    isLive: false,
    isOver: false,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export default function OpenCountdown({ variant = 'default' }: { variant?: 'default' | 'compact' | 'hero' }) {
  const [status, setStatus] = useState(getStatus);
  const t = useTranslations('open');

  useEffect(() => {
    const timer = setInterval(() => setStatus(getStatus()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = status;

  if (status.isLive) {
    const liveBlock = (
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 font-bold text-sm uppercase tracking-wider">Live Now</span>
        </div>
        <p className="text-[#D4AE7A] text-xs uppercase tracking-widest">The Open Championship · Royal Birkdale · Ends 19 Jul</p>
      </div>
    );
    if (variant === 'hero') return <div className="py-4">{liveBlock}</div>;
    if (variant === 'compact') return <div className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /><span className="text-green-400 font-bold">Live Now</span></div>;
    return <div className="flex justify-center py-2">{liveBlock}</div>;
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3 text-sm font-mono">
        {[
          { val: time.days, label: t('days') },
          { val: time.hours, label: t('hours') },
          { val: time.minutes, label: t('minutes') },
        ].map(({ val, label }) => (
          <span key={label} className="text-[#B8912A] font-bold">
            {String(val).padStart(2, '0')}<span className="text-[#D4AE7A] font-normal text-xs ml-0.5">{label}</span>
          </span>
        ))}
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className="flex gap-4 md:gap-6 justify-center">
        {[
          { val: time.days, label: t('days') },
          { val: time.hours, label: t('hours') },
          { val: time.minutes, label: t('minutes') },
          { val: time.seconds, label: t('seconds') },
        ].map(({ val, label }) => (
          <div key={label} className="text-center">
            <div className="text-4xl md:text-6xl font-display font-bold text-white tabular-nums leading-none">
              {String(val).padStart(2, '0')}
            </div>
            <div className="text-[#D4AE7A] text-xs uppercase tracking-widest mt-1">{label}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4 justify-center">
      {[
        { val: time.days, label: t('days') },
        { val: time.hours, label: t('hours') },
        { val: time.minutes, label: t('minutes') },
        { val: time.seconds, label: t('seconds') },
      ].map(({ val, label }) => (
        <div key={label} className="text-center bg-[#0D1B2A]/80 backdrop-blur-sm rounded-lg px-4 py-3 min-w-[64px]">
          <div className="text-3xl font-display font-bold text-white tabular-nums leading-none">
            {String(val).padStart(2, '0')}
          </div>
          <div className="text-[#D4AE7A] text-xs uppercase tracking-wider mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}
