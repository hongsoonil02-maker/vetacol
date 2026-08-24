import React, { useState, useEffect } from 'react';

const CYCLE_SECONDS = 3 * 3600;
const STORAGE_KEY = 'vetacol_golden_timer_start';

function getInitialSeconds() {
  try {
    const now = Date.now();
    let start = Number(localStorage.getItem(STORAGE_KEY));
    if (!start || Number.isNaN(start)) {
      start = now;
      localStorage.setItem(STORAGE_KEY, String(start));
    }
    const elapsed = Math.floor((now - start) / 1000) % CYCLE_SECONDS;
    return CYCLE_SECONDS - elapsed;
  } catch {
    return CYCLE_SECONDS;
  }
}

export default function GoldenTimeTimer({ t }) {
  const [secondsLeft, setSecondsLeft] = useState(getInitialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : CYCLE_SECONDS));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  const g = t.goldenTimer;

  return (
    <section 
      aria-label={g.title}
      className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-800 text-white rounded-2xl p-6 shadow-2xl border border-emerald-500/30 relative overflow-hidden my-8"
    >
      <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="text-center md:text-left space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-emerald-950 text-xs font-black rounded-full uppercase tracking-wider">
            {g.badge}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {g.title}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-200">
            {g.desc}
          </p>
        </div>

        <div
          role="timer"
          aria-label={`${g.hours} ${hours} ${g.minutes} ${minutes} ${g.seconds} ${seconds}`}
          className="flex items-center gap-2 bg-emerald-950/80 px-6 py-3 rounded-2xl border border-emerald-500/40 shadow-inner"
        >
          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">{hours}</span>
            <span className="block text-[10px] text-emerald-300 font-semibold">{g.hours}</span>
          </div>
          <span className="text-2xl font-bold text-amber-400 animate-pulse">:</span>
          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">{minutes}</span>
            <span className="block text-[10px] text-emerald-300 font-semibold">{g.minutes}</span>
          </div>
          <span className="text-2xl font-bold text-amber-400 animate-pulse">:</span>
          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">{seconds}</span>
            <span className="block text-[10px] text-emerald-300 font-semibold">{g.seconds}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
