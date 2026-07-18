import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { translations } from './translations';

const VetacolLanding = () => {
  const [lang, setLang] = useState('ko');
  const t = translations[lang];

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 'init', role: 'ai', key: 'initialMsg' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatMessagesEndRef = useRef(null);

  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages([...chatMessages, { id: Date.now().toString(), role: 'user', content: chatInput }]);

    // Mock AI response
    setTimeout(() => {
      let aiResponseKey = "defaultResponse";
      const lower = chatInput.toLowerCase();
      if (chatInput.includes('급여') || chatInput.includes('언제') || lower.includes('when') || lower.includes('dose') || lower.includes('how') || lower.includes('give') || lower.includes('administer') || lower.includes('quand') || lower.includes('comment') || lower.includes('dose') || lower.includes('administrer')) {
        aiResponseKey = "dosageResponse";
      } else if (chatInput.includes('효과') || chatInput.includes('장점') || lower.includes('benefit') || lower.includes('effect') || lower.includes('advantage') || lower.includes('why') || lower.includes('avantage') || lower.includes('effet') || lower.includes('pourquoi')) {
        aiResponseKey = "benefitsResponse";
      } else if (chatInput.includes('보관') || lower.includes('store') || lower.includes('storage') || lower.includes('keep') || lower.includes('conserver') || lower.includes('stockage') || lower.includes('garde')) {
        aiResponseKey = "storageResponse";
      }

      setChatMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', key: aiResponseKey }]);
    }, 1000);

    setChatInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleChatSubmit(e);
    }
  };

  const handleQuickReply = (questionKey) => {
    const questionText = t.chatbot[questionKey];
    setChatMessages([...chatMessages, { id: Date.now().toString(), role: 'user', content: questionText }]);

    setTimeout(() => {
      let aiResponseKey = "defaultResponse";
      if (questionKey === 'quick1') aiResponseKey = "benefitsResponse";
      else if (questionKey === 'quick2') aiResponseKey = "dosageResponse";
      else if (questionKey === 'quick3') aiResponseKey = "storageResponse";

      setChatMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', key: aiResponseKey }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-slate-50 selection:bg-[#00513b] selection:text-white relative break-keep">

      {/* 1. 최상단 신뢰도 배너 (모바일 줄바꿈 및 아이콘 찌그러짐 방지 최적화) */}
      <div className="bg-[#002b1f] text-emerald-300 text-xs sm:text-sm py-2 sm:py-2.5 px-3 sm:px-4 text-center font-medium tracking-wide border-b border-emerald-800/40">
        <div className="flex items-center justify-center gap-1.5 max-w-5xl mx-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="leading-snug break-keep">{t.banner}</span>
        </div>
      </div>

      {/* 2. 로타갈(Rotagal) 스타일 상단 내비게이션 헤더 바 (모바일 최적화: 토글 20% 축소 및 레이아웃 깨짐 방지) */}
      <nav className="sticky top-0 z-50 bg-[#00513b]/95 backdrop-blur-md border-b border-white/15 px-2.5 sm:px-8 py-2 sm:py-3 shadow-lg transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-1.5 sm:gap-3">
          {/* 좌측: 로고 및 제품명 (Rotagal 스타일 브랜딩 - 모바일에서 유연한 너비 적용) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-md border border-yellow-200 shrink-0">
              <span className="text-base sm:text-2xl">🐮</span>
            </div>
            <div className="flex flex-col text-left min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-base sm:text-2xl font-black tracking-tight text-white drop-shadow leading-none">
                  VETACOL
                </span>
                <span className="px-1 sm:px-1.5 py-0.5 text-[9px] sm:text-xs font-extrabold bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded leading-none shrink-0">
                  {lang === 'ko' ? '베타콜' : 'Colostrum'}
                </span>
              </div>
              <span className="text-[8px] sm:text-xs font-semibold text-emerald-200/80 tracking-tighter sm:tracking-wide truncate">
                VETALIS France × Agrokorea
              </span>
            </div>
          </div>

          {/* 우측: 외국어 토글 스위치 (모바일에서 버튼 크기 20% 이상 축소 및 간격 최적화로 잘림 100% 해결) */}
          <div className="inline-flex items-center bg-black/35 backdrop-blur-md border border-white/20 p-0.5 sm:p-1 rounded-full shadow-inner shrink-0">
            <button
              onClick={() => setLang('ko')}
              className={`px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-sm font-extrabold tracking-tight sm:tracking-normal transition-all duration-300 ${lang === 'ko'
                ? 'bg-gradient-to-r from-emerald-500 to-[#00513b] text-white shadow-md scale-105'
                : 'text-emerald-100/70 hover:text-white'
                }`}
            >
              한국어
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-sm font-extrabold tracking-tight sm:tracking-normal transition-all duration-300 ${lang === 'en'
                ? 'bg-gradient-to-r from-emerald-500 to-[#00513b] text-white shadow-md scale-105'
                : 'text-emerald-100/70 hover:text-white'
                }`}
            >
              English
            </button>
            <button
              onClick={() => setLang('fr')}
              className={`px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-sm font-extrabold tracking-tight sm:tracking-normal transition-all duration-300 ${lang === 'fr'
                ? 'bg-gradient-to-r from-emerald-500 to-[#00513b] text-white shadow-md scale-105'
                : 'text-emerald-100/70 hover:text-white'
                }`}
            >
              Français
            </button>
          </div>
        </div>
      </nav>

      {/* 3. 히어로 섹션 (상단 여백 pt-24 -> pt-8 sm:pt-12로 대폭 최적화하여 공백 제거) */}
      <header className="relative bg-gradient-to-br from-[#00513b] via-[#00664a] to-[#003828] text-white pt-8 pb-16 sm:pt-12 sm:pb-24 px-6 overflow-hidden shadow-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-gradient-to-r from-emerald-400/10 via-teal-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          {/* 1. 타겟 배지 (한우/젖소 송아지 및 어린 반추가축 안내) */}
          <div className="flex flex-col items-center gap-1.5 pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/25 via-yellow-500/25 to-amber-500/25 backdrop-blur-md rounded-full text-xs sm:text-base font-extrabold tracking-wide border border-amber-400/50 shadow-lg text-amber-200">
              <span>{t.hero.targetBadge}</span>
            </div>
            <p className="text-[11px] sm:text-xs text-emerald-200/90 font-medium tracking-tight text-center max-w-xl break-keep">
              {t.hero.ruminantNote}
            </p>
          </div>

          {/* 2. 유럽 선택 초유 영양제 배지 */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs sm:text-sm font-semibold tracking-wide border border-white/20 shadow-inner mt-2">
            <span>{t.hero.badge}</span>
          </div>

          {/* 3. 명확한 5초 인지 메인 타이틀 (초유 전면 강조 & 모바일 고대비 가독성) */}
          <h1 className="text-3xl sm:text-6xl font-black tracking-tight text-white drop-shadow-lg leading-tight break-keep pt-2">
            {t.hero.title1} <br className="sm:hidden" />
            <span className="text-amber-300 font-extrabold drop-shadow-md">{t.hero.title2}</span>{' '}
            <span className="text-2xl sm:text-4xl font-black text-emerald-100">{t.hero.title3}</span>
          </h1>

          <p className="text-base sm:text-2xl text-white/95 font-medium max-w-2xl mx-auto pt-3 leading-relaxed break-keep drop-shadow">
            {t.hero.subtitle1} <strong className="text-amber-300 font-bold underline decoration-amber-400 decoration-3 underline-offset-4">{t.hero.subtitleHighlight}</strong>{t.hero.subtitle2}
            <br className="hidden sm:inline" /> {t.hero.subtitle3}
          </p>

          {/* 4. 프랑스 VETALIS 공식 신뢰 보증 박스 (Why Vetacol? - 첫 화면 직관적 보증 및 URL 노출) */}
          <div className="max-w-xl mx-auto mt-6 p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-emerald-400/40 shadow-2xl text-left sm:text-center space-y-1.5 transition-all hover:border-emerald-400/70">
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-bold text-white">
              <span>{t.hero.trustTitle}</span>
              <a
                href="https://www.vetalis.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-300 hover:text-amber-300 underline underline-offset-2 transition-colors font-semibold"
              >
                {t.hero.trustUrlText} <span className="text-[10px]">↗</span>
              </a>
            </div>
            <p className="text-[11px] sm:text-xs text-emerald-200/90 leading-normal break-keep">
              {t.hero.trustSub}
            </p>
          </div>

          {/* 5. 간편 요약 배지 (모바일 1열 카드/2열 그리드 최적화로 가독성 극대화) */}
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap justify-center gap-2.5 sm:gap-3 pt-6 text-xs sm:text-sm font-semibold max-w-md sm:max-w-none mx-auto">
            <div className="bg-black/30 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/20 flex items-center justify-center sm:justify-start gap-2 text-white shadow-sm">
              <span className="text-base">💉</span> <span>{t.hero.badge1}</span>
            </div>
            <div className="bg-black/30 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/20 flex items-center justify-center sm:justify-start gap-2 text-white shadow-sm">
              <span className="text-base">⚡</span> <span>{t.hero.badge2}</span>
            </div>
            <div className="bg-black/30 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/20 flex items-center justify-center sm:justify-start gap-2 text-white shadow-sm">
              <span className="text-base">🏆</span> <span>{t.hero.badge3}</span>
            </div>
          </div>

          {/* 쿠팡 즉시 구매 CTA 버튼 (히어로 섹션) */}
          <div className="pt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://www.coupang.com/vp/products/9428079667?vendorItemId=94985664531&itemId=28028533075&landingType=SDP"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-500 text-slate-900 font-black text-lg sm:text-xl rounded-2xl shadow-xl hover:shadow-amber-500/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group border-2 border-yellow-200 animate-bounce sm:animate-none"
            >
              <span className="text-2xl">🚀</span>
              <span>{t.hero.coupangBtn}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <div className="text-xs sm:text-sm text-emerald-200 font-medium flex items-center gap-1.5 bg-black/30 px-4 py-3 rounded-xl border border-white/10">
              <span className="text-amber-400">⚡</span> {t.hero.coupangSub}
            </div>
          </div>
        </div>
      </header>

      {/* 헤더 침범(-mt-12) 제거 및 간격 조정(py-12) */}
      <main className="max-w-5xl mx-auto px-4 py-12 relative z-20 space-y-16 pb-32">

        {/* 3. 4대 특장점 (Why Vetacol?) */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-100">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-1">{t.benefits.why}</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {t.benefits.title1} <span className="text-[#00513b]">{t.benefits.title2}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.benefits.items.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-gray-200/80 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all duration-300 group">
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-200">{item.icon}</div>
                <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#00513b] transition-colors">{item.title}</h4>
                <p className="text-xs font-semibold text-emerald-700 mt-0.5 mb-2">{item.sub}</p>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3.5. 공식 해설 동영상 (비디오 플레이어) */}
        <section className="bg-gradient-to-br from-slate-900 via-[#003828] to-slate-900 text-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-emerald-500/30 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-8 relative z-10">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold uppercase tracking-wider">
              {t.video.badge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mt-3 mb-2">
              <span className="text-emerald-400">{t.video.title1}</span> {t.video.title2}
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed break-keep">
              {t.video.desc}
            </p>
          </div>

          {/* 16:9 비디오 플레이어 컨테이너 */}
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-500/40 bg-black aspect-video relative z-10 group">
            <video
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              playsInline
              poster="./og_image.png"
            >
              <source src="./vetacol_video3.mp4" type="video/mp4" />
              {t.video.noSupport}
            </video>
          </div>

          {/* 영상 핵심 하이라이트 요약 */}
          <div className="max-w-4xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10 text-center">
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-white/10 flex flex-col items-center">
              <span className="text-xs font-bold text-amber-400 mb-0.5">{t.video.step1Title}</span>
              <p className="text-[11px] text-gray-300">{t.video.step1Desc}</p>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-white/10 flex flex-col items-center">
              <span className="text-xs font-bold text-emerald-400 mb-0.5">{t.video.step2Title}</span>
              <p className="text-[11px] text-gray-300">{t.video.step2Desc}</p>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-white/10 flex flex-col items-center">
              <span className="text-xs font-bold text-teal-300 mb-0.5">{t.video.step3Title}</span>
              <p className="text-[11px] text-gray-300">{t.video.step3Desc}</p>
            </div>
          </div>

          {/* 영상 시청 후 구매 유도 CTA */}
          <div className="mt-8 text-center relative z-10">
            <a
              href="https://www.coupang.com/vp/products/9428079667?vendorItemId=94985664531&itemId=28028533075&landingType=SDP"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-500 text-slate-900 font-black text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all border border-yellow-200"
            >
              <span>{t.video.cta}</span>
              <span>→</span>
            </a>
          </div>
        </section>

        {/* 4. 추천 송아지 타겟 섹션 */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {t.targets.title1} <span className="bg-gradient-to-r from-[#00513b] to-emerald-600 bg-clip-text text-transparent">{t.targets.title2}</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">{t.targets.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.targets.items.map((target, idx) => (
              <div key={idx} className={`bg-white p-6 rounded-2xl border-2 ${target.borderColor} shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between`}>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-3xl font-black text-gray-200">{target.num}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${target.badgeBg}`}>{target.tag}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{target.title}</h3>
                  <p className="text-xs font-semibold text-gray-500 mb-3">{target.sub}</p>
                  <p className="text-sm text-gray-600 leading-relaxed break-keep">{target.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-xs font-bold text-[#00513b]">
                  <span>{t.targets.bottomText}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. 5대 핵심 성분 & 포뮬러 (인터랙티브 그리드) */}
        <section className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center mb-10 relative z-10">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold uppercase tracking-wider">
              {t.ingredientsSection.badge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mt-3 mb-2">
              {t.ingredientsSection.title1} <span className="text-emerald-400">{t.ingredientsSection.title2}</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              {t.ingredientsSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
            {t.ingredientsSection.items.map((ing, idx) => (
              <div key={idx} className="bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl">{ing.icon}</span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-700/80 text-emerald-300 text-[11px] font-bold">
                      {ing.badge}
                    </span>
                  </div>
                  <div className="text-xs text-emerald-400 font-semibold mb-1">{ing.category}</div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">{ing.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed break-keep">{ing.description}</p>
                </div>
              </div>
            ))}

            {/* 6번째 카드: 기호성 및 제조기술 약속 */}
            <div className="bg-gradient-to-br from-[#00513b] to-emerald-800 p-6 rounded-2xl border border-emerald-600/50 flex flex-col justify-center text-center items-center shadow-lg">
              <div className="text-3xl mb-2">🇫🇷</div>
              <h3 className="text-lg font-extrabold text-white mb-1">{t.ingredientsSection.card6Title}</h3>
              <p className="text-xs text-emerald-100 mb-3">{t.ingredientsSection.card6Sub}</p>
              <span className="px-3 py-1 bg-white text-[#00513b] rounded-full text-xs font-black shadow">
                {t.ingredientsSection.card6Badge}
              </span>
            </div>
          </div>
        </section>

        {/* 6. 급여 방법 및 사용 가이드 */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">
            {t.directions.title} <span className="text-xs font-normal text-gray-500 block sm:inline mt-1 sm:mt-0">{t.directions.sub}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#00513b] text-white flex items-center justify-center font-bold text-lg mb-3 shadow-md">1</div>
              <h3 className="font-bold text-gray-900 mb-1">{t.directions.step1Title}</h3>
              <p className="text-sm text-gray-600 break-keep">{t.directions.step1Desc1} <strong className="text-[#00513b]">{t.directions.step1Strong}</strong> {t.directions.step1Desc2}<br />{t.directions.step1Sub}</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#00513b] text-white flex items-center justify-center font-bold text-lg mb-3 shadow-md">2</div>
              <h3 className="font-bold text-gray-900 mb-1">{t.directions.step2Title}</h3>
              <p className="text-sm text-gray-600 break-keep">{t.directions.step2Desc1} <strong className="text-[#00513b]">{t.directions.step2Strong}</strong>{t.directions.step2Desc2}</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#00513b] text-white flex items-center justify-center font-bold text-lg mb-3 shadow-md">3</div>
              <h3 className="font-bold text-gray-900 mb-1">{t.directions.step3Title}</h3>
              <p className="text-sm text-gray-600 break-keep"><strong className="text-[#00513b]">{t.directions.step3Strong}</strong> {t.directions.step3Desc1}<br />{t.directions.step3Desc2}</p>
            </div>
          </div>
        </section>

        {/* 7. 쿠팡 공식 구매 & 1:1 상담 안내 (투트랙 CTA) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 좌측: 쿠팡 온라인 즉시 구매 */}
          <div className="bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-600 rounded-3xl p-8 text-white shadow-2xl flex flex-col justify-between border border-yellow-300/40 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/20 backdrop-blur-md rounded-full text-xs font-extrabold tracking-wide text-yellow-200 border border-yellow-300/30">
                <span>{t.cta.leftBadge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black leading-tight">
                {t.cta.leftTitle1}<br />
                <span className="text-yellow-200">{t.cta.leftTitle2}</span>
              </h2>
              <p className="text-xs sm:text-sm text-amber-100 leading-relaxed break-keep">
                {t.cta.leftDesc1}<br />
                <strong>{t.cta.leftDesc2}</strong>{t.cta.leftDesc3}
              </p>
              <div className="bg-black/30 p-3 rounded-xl text-xs space-y-1 border border-white/10">
                <div className="font-bold text-yellow-300">{t.cta.leftBoxTitle}</div>
                <div className="text-amber-100">{t.cta.leftBoxSub}</div>
              </div>
            </div>
            <div className="mt-8 relative z-10">
              <a
                href="https://www.coupang.com/vp/products/9428079667?vendorItemId=94985664531&itemId=28028533075&landingType=SDP"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-white hover:bg-emerald-50 text-[#00513b] hover:text-emerald-900 rounded-2xl text-base sm:text-lg font-black shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 transform group-hover:translate-y-[-2px] border-2 border-emerald-600/10"
              >
                <span>{t.cta.leftBtn}</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* 우측: 1:1 수의사 상담 및 대량 구매 문의 */}
          <div className="bg-gradient-to-br from-emerald-900 via-[#00513b] to-teal-900 rounded-3xl p-8 text-white shadow-2xl flex flex-col justify-between border border-emerald-700/50 relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <span className="inline-block px-3 py-1 bg-emerald-500/30 text-emerald-200 rounded-full text-xs font-semibold">
                {t.cta.rightBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                {t.cta.rightTitle1}<br />
                <span className="text-emerald-300">{t.cta.rightTitle2}</span>
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed break-keep">
                {t.cta.rightDesc1}<br />
                <strong className="text-white">{t.cta.rightStrong}</strong>{t.cta.rightDesc2}
              </p>

              {/* 공식 QR 코드 스캔 박스 */}
              <div className="my-3 p-3 sm:p-4 bg-white/95 backdrop-blur-md rounded-2xl flex items-center gap-3.5 border border-emerald-400/40 text-slate-900 shadow-lg">
                <img src="./vetacol_qr.png" alt="베타콜 공식 QR코드" className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl shrink-0 border border-slate-200 shadow" />
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-[#00513b] text-[11px] font-extrabold">
                    <span>{t.cta.qrBadge}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                    {t.cta.qrTitle}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed break-keep">
                    {t.cta.qrDesc}
                  </p>
                </div>
              </div>

              <div className="pt-1 flex flex-col gap-1.5 text-xs text-emerald-200">
                <span className="flex items-center gap-1.5">{t.cta.phone1} <strong className="text-white text-sm">02-6949-5708</strong></span>
                <span className="flex items-center gap-1.5">{t.cta.phone2} <strong className="text-white text-sm">010-5407-5708</strong></span>
                <span className="flex items-center gap-1.5">{t.cta.web}</span>
              </div>
            </div>

            {/* 하단 상담 연결 버튼 / 간편 안내 */}
            <div className="mt-8 pt-4 border-t border-emerald-800/80 flex items-center justify-between gap-4">
              <div className="text-xs text-emerald-300">
                {t.cta.footerNote1}<br />
                {t.cta.footerNote2}
              </div>
              <a
                href="http://www.agrokorea.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-colors flex items-center gap-1 shrink-0"
              >
                <span>{t.cta.visitBtn}</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* 8. 플로팅 쿠팡 구매 바 (항상 하단 고정) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-2xl bg-slate-900/95 backdrop-blur-md border border-amber-500/50 p-3 sm:p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-3 animate-fade-in">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="text-2xl sm:text-3xl shrink-0 animate-bounce">🚀</span>
          <div className="truncate">
            <div className="text-[11px] sm:text-xs text-amber-400 font-bold flex items-center gap-1">
              <span>{t.floatingBar.badge}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-white truncate">{t.floatingBar.title}</div>
          </div>
        </div>
        <a
          href="https://www.coupang.com/vp/products/9428079667?vendorItemId=94985664531&itemId=28028533075&landingType=SDP"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-500 text-slate-900 font-black text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-1.5 border border-yellow-200"
        >
          <span>{t.floatingBar.btn}</span>
          <span>→</span>
        </a>
      </div>

      {/* 8. 상세 푸터 (법적 공지 및 판매원 정보) */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800 text-xs">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm">{t.footer.company}</h4>
            <p className="leading-relaxed">
              {t.footer.address}<br />
              {t.footer.tel}<br />
              {t.footer.web} <a href="http://www.agrokorea.kr" className="text-emerald-400 hover:underline">www.agrokorea.kr</a>
            </p>
          </div>
          <div className="space-y-1 text-slate-400">
            <p><strong className="text-slate-300">{t.footer.manufacturer}</strong> {t.footer.manufacturerVal}</p>
            <p><strong className="text-slate-300">{t.footer.importer}</strong> {t.footer.importerVal}</p>
            <p><strong className="text-slate-300">{t.footer.regNum}</strong> {t.footer.regNumVal} | <strong className="text-slate-300">{t.footer.name}</strong> {t.footer.nameVal}</p>
            <p><strong className="text-slate-300">{t.footer.ingredients}</strong> {t.footer.ingredientsVal}</p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto pt-6 border-t border-slate-800 text-center text-slate-500 space-y-1">
          <p>{t.footer.notice}</p>
          <p>{t.footer.copyright}</p>
        </div>
      </footer>

      {/* AI Chatbot Floating Action Button & Window */}
      <div className="fixed bottom-28 right-6 sm:bottom-8 sm:right-8 z-[60] flex flex-col items-end">
        {isChatOpen ? (
          <div className="bg-white w-[320px] sm:w-[400px] h-[450px] sm:h-[550px] max-h-[80vh] rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden transform transition-all duration-300 origin-bottom-right mb-4" role="dialog" aria-label="베타콜 수의사 AI 채팅">
            <div className="bg-[#00513b] p-3 sm:p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base">{t.chatbot.title}</h3>
                  <p className="text-[10px] sm:text-xs text-emerald-200">{t.chatbot.status}</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-emerald-100 hover:text-white transition-colors" aria-label="채팅 닫기">
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div className="flex-1 p-3 sm:p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3 sm:gap-4" role="log" aria-live="polite">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-2.5 sm:p-3 rounded-2xl text-xs sm:text-sm leading-relaxed break-keep ${msg.role === 'user'
                    ? 'bg-[#00513b] text-white rounded-tr-sm'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
                    }`}>
                    {msg.key ? t.chatbot[msg.key] : msg.content}
                  </div>
                </div>
              ))}

              {/* Quick Replies */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-4" role="group" aria-label="빠른 질문">
                <button onClick={() => handleQuickReply('quick1')} className="bg-white border border-[#00513b] text-[#00513b] text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full hover:bg-emerald-50 transition-colors shadow-sm">{t.chatbot.quick1Label}</button>
                <button onClick={() => handleQuickReply('quick2')} className="bg-white border border-[#00513b] text-[#00513b] text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full hover:bg-emerald-50 transition-colors shadow-sm">{t.chatbot.quick2Label}</button>
                <button onClick={() => handleQuickReply('quick3')} className="bg-white border border-[#00513b] text-[#00513b] text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full hover:bg-emerald-50 transition-colors shadow-sm">{t.chatbot.quick3Label}</button>
              </div>
              <div ref={chatMessagesEndRef} />
            </div>

            <form onSubmit={handleChatSubmit} className="p-3 sm:p-4 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.chatbot.placeholder}
                className="flex-1 bg-gray-100 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#00513b]"
                aria-label={t.chatbot.placeholder}
              />
              <button
                type="submit"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-[#00513b] text-white rounded-full flex items-center justify-center hover:bg-[#003828] transition-colors shrink-0 shadow-md"
                aria-label="메시지 전송"
              >
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 sm:ml-1" />
              </button>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setIsChatOpen(true)}
            className="w-16 h-16 sm:w-20 sm:h-20 bg-[#00513b] hover:bg-[#003828] text-white rounded-full shadow-2xl flex items-center justify-center transform transition-all hover:scale-110 hover:-translate-y-2 animate-bounce ring-4 ring-white/30"
            aria-label="수의사 AI 채팅 열기"
          >
            <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10" />
          </button>
        )}
      </div>

    </div>
  );
};

export default VetacolLanding;
