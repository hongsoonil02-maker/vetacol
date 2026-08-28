import React, { useState, useEffect, useCallback } from "react";

/**
 * AccessibilityWidget
 * 좌측 중앙 고정 접근성 패널 (WAI-ARIA 완전 준수)
 * - 글자 크기 축소/기본/확대
 * - 고대비 모드 토글
 * - 애니메이션 중지 토글
 * - 링크 밑줄 강제 표시 토글
 * - 포커스 강조 강화 토글
 * - localStorage 설정 유지
 */

const FONT_LEVELS = ["base", "lg", "xl"];
const STORAGE_KEY = "vetacol_a11y";

const loadPrefs = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

const savePrefs = (prefs) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {}
};

const applyHtml = (classes) => {
  const html = document.documentElement;
  const toRemove = ["font-size-lg", "font-size-xl", "high-contrast", "reduce-motion", "force-underline", "strong-focus"];
  toRemove.forEach((c) => html.classList.remove(c));
  classes.forEach((c) => c && html.classList.add(c));
};

const AccessibilityWidget = ({ t }) => {
  const a11y = t?.a11y || {};
  const [open, setOpen] = useState(false);

  const [fontLevel, setFontLevel] = useState(0); // 0=base, 1=lg, 2=xl
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [forceUnderline, setForceUnderline] = useState(false);
  const [strongFocus, setStrongFocus] = useState(false);

  // 마운트 시 localStorage 복원
  useEffect(() => {
    const prefs = loadPrefs();
    const fl = prefs.fontLevel ?? 0;
    const hc = prefs.highContrast ?? false;
    const rm = prefs.reduceMotion ?? false;
    const fu = prefs.forceUnderline ?? false;
    const sf = prefs.strongFocus ?? false;
    setFontLevel(fl);
    setHighContrast(hc);
    setReduceMotion(rm);
    setForceUnderline(fu);
    setStrongFocus(sf);
    applyClasses(fl, hc, rm, fu, sf);
  }, []);

  const applyClasses = (fl, hc, rm, fu, sf) => {
    const classes = [];
    if (fl === 1) classes.push("font-size-lg");
    if (fl === 2) classes.push("font-size-xl");
    if (hc) classes.push("high-contrast");
    if (rm) classes.push("reduce-motion");
    if (fu) classes.push("force-underline");
    if (sf) classes.push("strong-focus");
    applyHtml(classes);
  };

  const update = useCallback((newState) => {
    const merged = {
      fontLevel,
      highContrast,
      reduceMotion,
      forceUnderline,
      strongFocus,
      ...newState,
    };
    setFontLevel(merged.fontLevel);
    setHighContrast(merged.highContrast);
    setReduceMotion(merged.reduceMotion);
    setForceUnderline(merged.forceUnderline);
    setStrongFocus(merged.strongFocus);
    applyClasses(merged.fontLevel, merged.highContrast, merged.reduceMotion, merged.forceUnderline, merged.strongFocus);
    savePrefs(merged);
  }, [fontLevel, highContrast, reduceMotion, forceUnderline, strongFocus]);

  const resetAll = () => {
    update({ fontLevel: 0, highContrast: false, reduceMotion: false, forceUnderline: false, strongFocus: false });
  };

  const decreaseFont = () => update({ fontLevel: Math.max(0, fontLevel - 1) });
  const increaseFont = () => update({ fontLevel: Math.min(2, fontLevel + 1) });

  const fontLabel = ["기본", "크게", "더 크게"][fontLevel];

  // Escape 키로 패널 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed left-6 bottom-24 sm:left-8 sm:bottom-8 z-[60]">
      {/* ♿ 접근성 토글 버튼 — 쳇봇 버튼과 동일한 원형 스타일 동기화
          (모바일: 하단 스티키 CTA 바와 겹치지 않도록 위로 ~3줄 올림) */}
      <button
        className="w-16 h-16 sm:w-20 sm:h-20 bg-[#00513b] hover:bg-[#003828] text-white rounded-full shadow-2xl flex items-center justify-center transform transition-all hover:scale-110 hover:-translate-y-2 ring-4 ring-white/30"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={open ? (a11y.a11yWidgetClose || "접근성 메뉴 닫기") : (a11y.a11yWidgetOpen || "접근성 메뉴 열기")}
        title={open ? (a11y.a11yWidgetClose || "접근성 메뉴 닫기") : (a11y.a11yWidgetOpen || "접근성 메뉴 열기")}
      >
        <span aria-hidden="true" style={{ fontSize: "2rem", lineHeight: 1 }}>♿</span>
      </button>

      {/* 접근성 패널 — 버튼 바로 위로 열림, 모바일 좌우 잘림 방지 (max-w 제한) */}
      {open && (
        <div
          className="a11y-widget-panel"
          role="dialog"
          aria-modal="false"
          aria-label={a11y.a11yWidgetTitle || "접근성 설정"}
          style={{
            position: "absolute",
            left: 0,
            bottom: "calc(100% + 0.5rem)",
            top: "auto",
            transform: "none",
            maxWidth: "calc(100vw - 3rem)",
          }}
        >
          <h2>{a11y.a11yWidgetTitle || "접근성 설정"}</h2>

          {/* 글자 크기 */}
          <div className="a11y-row">
            <span className="a11y-row-label">
              {a11y.fontSizeLabel || "글자 크기"}{" "}
              <span style={{ color: "#6b7280", fontWeight: 400 }}>({fontLabel})</span>
            </span>
            <div className="a11y-row-controls">
              <button
                className="a11y-icon-btn"
                onClick={decreaseFont}
                disabled={fontLevel === 0}
                aria-label={a11y.fontSizeDecrease || "글자 크기 줄이기"}
                title={a11y.fontSizeDecrease || "글자 크기 줄이기"}
              >
                A−
              </button>
              <button
                className="a11y-icon-btn"
                onClick={() => update({ fontLevel: 0 })}
                aria-label={a11y.fontSizeReset || "글자 크기 초기화"}
                title={a11y.fontSizeReset || "글자 크기 초기화"}
              >
                A
              </button>
              <button
                className="a11y-icon-btn"
                onClick={increaseFont}
                disabled={fontLevel === 2}
                aria-label={a11y.fontSizeIncrease || "글자 크기 늘리기"}
                title={a11y.fontSizeIncrease || "글자 크기 늘리기"}
              >
                A+
              </button>
            </div>
          </div>

          {/* 고대비 모드 */}
          <div className="a11y-row">
            <span className="a11y-row-label">{a11y.contrastLabel || "고대비 모드"}</span>
            <div className="a11y-row-controls">
              <button
                className={`a11y-icon-btn${highContrast ? " active" : ""}`}
                onClick={() => update({ highContrast: !highContrast })}
                aria-pressed={highContrast}
                aria-label={highContrast ? (a11y.contrastOff || "고대비 끄기") : (a11y.contrastOn || "고대비 켜기")}
                title={highContrast ? (a11y.contrastOff || "고대비 끄기") : (a11y.contrastOn || "고대비 켜기")}
              >
                {highContrast ? "🌑" : "☀️"}
              </button>
            </div>
          </div>

          {/* 애니메이션 중지 */}
          <div className="a11y-row">
            <span className="a11y-row-label">{a11y.animationLabel || "애니메이션"}</span>
            <div className="a11y-row-controls">
              <button
                className={`a11y-icon-btn${reduceMotion ? " active" : ""}`}
                onClick={() => update({ reduceMotion: !reduceMotion })}
                aria-pressed={reduceMotion}
                aria-label={reduceMotion ? (a11y.animationOn || "애니메이션 켜기") : (a11y.animationOff || "애니메이션 끄기")}
                title={reduceMotion ? (a11y.animationOn || "애니메이션 켜기") : (a11y.animationOff || "애니메이션 끄기")}
              >
                {reduceMotion ? "⏸" : "▶"}
              </button>
            </div>
          </div>

          {/* 링크 밑줄 */}
          <div className="a11y-row">
            <span className="a11y-row-label">{a11y.underlineLabel || "링크 밑줄"}</span>
            <div className="a11y-row-controls">
              <button
                className={`a11y-icon-btn${forceUnderline ? " active" : ""}`}
                onClick={() => update({ forceUnderline: !forceUnderline })}
                aria-pressed={forceUnderline}
                aria-label={forceUnderline ? (a11y.underlineOff || "링크 밑줄 숨기기") : (a11y.underlineOn || "링크 밑줄 표시")}
                title={forceUnderline ? (a11y.underlineOff || "링크 밑줄 숨기기") : (a11y.underlineOn || "링크 밑줄 표시")}
              >
                U̲
              </button>
            </div>
          </div>

          {/* 포커스 강조 */}
          <div className="a11y-row">
            <span className="a11y-row-label">{a11y.focusLabel || "포커스 강조"}</span>
            <div className="a11y-row-controls">
              <button
                className={`a11y-icon-btn${strongFocus ? " active" : ""}`}
                onClick={() => update({ strongFocus: !strongFocus })}
                aria-pressed={strongFocus}
                aria-label={strongFocus ? (a11y.focusOff || "포커스 강조 끄기") : (a11y.focusOn || "포커스 강조 켜기")}
                title={strongFocus ? (a11y.focusOff || "포커스 강조 끄기") : (a11y.focusOn || "포커스 강조 켜기")}
              >
                ⬛
              </button>
            </div>
          </div>

          {/* 모두 초기화 */}
          <button className="a11y-reset-btn" onClick={resetAll}>
            🔄 {a11y.resetAll || "모두 초기화"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AccessibilityWidget;
