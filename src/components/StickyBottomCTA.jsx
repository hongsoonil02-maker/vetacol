import React from 'react';
import { COUPANG_URL, CONTACT } from '../constants';

export default function StickyBottomCTA({ t }) {
  const c = t.stickyCta;

  const telHref = `tel:${CONTACT.tel.replace(/[^0-9]/g, '')}`;

  return (
    <nav
      aria-label="Quick Action Footer Bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-emerald-950/95 backdrop-blur-md border-t border-emerald-700/50 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] px-4 py-3 sm:px-6 text-white mobile-safe-bottom"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <div className="hidden md:flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center font-black text-lg" aria-hidden="true">
            🧪
          </div>
          <div>
            <div className="font-extrabold text-white text-sm">{c.title}</div>
            <div className="text-xs text-emerald-300 font-semibold">{c.sub}</div>
          </div>
        </div>

        {/* 좌우 대칭 rounded-full 버튼 패턴 — 파보겔/로타갈 통일 디자인 */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <a
            href={COUPANG_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={c.buyBtn}
            className="flex-1 md:flex-initial px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-lg transition-all flex items-center justify-center gap-1.5 focus:ring-2 focus:ring-rose-400 focus:outline-none hover:-translate-y-0.5"
          >
            <span>{c.buyBtn}</span>
          </a>

          <a
            href={telHref}
            aria-label={c.consultBtn}
            className="flex-1 md:flex-initial px-5 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs sm:text-sm rounded-full shadow-lg transition-all flex items-center justify-center gap-1.5 focus:ring-2 focus:ring-amber-300 focus:outline-none hover:-translate-y-0.5"
          >
            <span>{c.consultBtn}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
