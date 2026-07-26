import React from 'react';

export default function StickyBottomCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-emerald-950/95 backdrop-blur-md border-t border-emerald-700/50 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] px-4 py-3 sm:px-6 text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <div className="hidden md:flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center font-black text-lg">
            🧪
          </div>
          <div>
            <div className="font-extrabold text-white text-sm">베타콜 (Vetacol) 15ml 초유 면역 시린지</div>
            <div className="text-xs text-emerald-300 font-semibold">수의사 보증 5대 복합 면역 포뮬러</div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <a
            href="https://www.coupang.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-initial px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5"
          >
            <span>🚀</span> 쿠팡 로켓배송 구매
          </a>
          
          <a
            href="tel:02-1234-5678"
            className="flex-1 md:flex-initial px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5"
          >
            <span>📞</span> 1:1 수의사 상담
          </a>
        </div>
      </div>
    </div>
  );
}
