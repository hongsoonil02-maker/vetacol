import React from "react";
import { COUPANG_URL, CONTACT } from "../constants";

export default function StickyBottomCTA({ t }) {
  const c = t.stickyCta;
  const telHref = `tel:${CONTACT.tel.replace(/[^0-9]/g, "")}`;

  return (
    <nav
      aria-label="Quick Action Footer Bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/96 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_24px_rgba(0,0,0,0.10)] px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] sm:px-6"
    >
      <div className="max-w-6xl mx-auto flex items-center gap-2">
        {/* 좌측 제품 정보 (데스크탑) */}
        <div className="hidden md:flex items-center gap-2 min-w-0 flex-1">
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-base shrink-0" aria-hidden="true">🐮</div>
          <div className="min-w-0">
            <div className="font-extrabold text-gray-900 text-xs truncate">{c.title}</div>
            <div className="text-[10px] text-emerald-600 font-semibold truncate">{c.sub}</div>
          </div>
        </div>

        {/* 가운데·우측 CTA 알약 버튼 2개 — 모바일 잘림 방지 (크기 축소 + min-w-0 수축 허용) */}
        <div className="flex min-w-0 flex-1 items-center gap-2 md:flex-initial md:w-auto">
          <a
            href={COUPANG_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={c.buyBtn}
            className="flex-1 md:flex-initial min-w-0 min-h-[44px] px-3 sm:px-5 py-2.5 bg-[#00513b] hover:bg-[#003828] active:scale-[0.97] text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md transition-all flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#00513b] focus:ring-offset-2"
          >
            <span aria-hidden="true">🚀</span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">{c.buyBtn}</span>
          </a>
          <a
            href={telHref}
            aria-label={c.consultBtn}
            className="flex-1 md:flex-initial min-w-0 min-h-[44px] px-3 sm:px-5 py-2.5 bg-amber-400 hover:bg-amber-300 active:scale-[0.97] text-emerald-950 font-black text-xs sm:text-sm rounded-full shadow-md transition-all flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
          >
            <span aria-hidden="true">📞</span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">{c.consultBtn}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
