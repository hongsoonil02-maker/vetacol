import React, { useState } from 'react';

const VetacolLanding = () => {
  const [activeTab, setActiveTab] = useState('all');

  // 5대 핵심 성분 데이터
  const ingredients = [
    {
      id: 'immuno',
      category: '초기 활력 & 면역 공급',
      title: '초유 · 유청단백질 · 중쇄지방산(MCT)',
      description: '출생 직후 부족한 면역글로불린을 빠르게 공급하고, 체내 흡수가 빠른 MCT와 텍스트로스로 즉각적인 에너지를 보충합니다.',
      icon: '🛡️',
      badge: '빠른 에너지 보충',
      color: 'from-blue-500/10 to-indigo-500/10 border-blue-200 text-blue-900',
    },
    {
      id: 'gut',
      category: '장내 환경 개선',
      title: '바실러스 2종 (서브틸리스 & 리체니포미스)',
      description: '장내 유익균 정상 세균총을 유도하여 출생 초기 송아지의 설사 예방을 돕고 장 건전성을 강력하게 유지합니다.',
      icon: '🦠',
      badge: '설사 예방 도움',
      color: 'from-emerald-500/10 to-teal-500/10 border-emerald-200 text-emerald-900',
    },
    {
      id: 'vitamin',
      category: '멀티 비타민 복합체',
      title: '비타민 A, C, D3, E 고함량 배합',
      description: '강력한 항산화 작용을 통해 스트레스를 완화하고 송아지의 골격 형성 및 면역 기능 활성화를 지원합니다.',
      icon: '☀️',
      badge: '항산화 & 성장 촉진',
      color: 'from-amber-500/10 to-orange-500/10 border-amber-200 text-amber-900',
    },
    {
      id: 'mineral',
      category: '고흡수 미네랄',
      title: '아연 · 망간 · 구리 글리시네이트 & 셀레늄',
      description: '일반 무기염 대비 체내 흡수가 매우 용이한 킬레이트(글리시네이트) 형태의 미량 광물질로 신진대사를 극대화합니다.',
      icon: '💎',
      badge: '신진대사 활성화',
      color: 'from-purple-500/10 to-pink-500/10 border-purple-200 text-purple-900',
    },
    {
      id: 'gut',
      category: '기호성 극대화',
      title: '치커리 이눌린 & 카라멜 배합',
      description: '천연 프리바이오틱스인 치커리 이눌린과 달콤한 카라멜 성분을 첨가하여 송아지가 거부감 없이 즐겁게 섭취합니다.',
      icon: '🌿',
      badge: '스트레스 없는 섭취',
      color: 'from-lime-500/10 to-green-500/10 border-lime-200 text-lime-900',
    },
  ];

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-slate-50 selection:bg-[#00513b] selection:text-white">
      
      {/* 1. 최상단 신뢰도 배너 */}
      <div className="bg-[#002b1f] text-emerald-300 text-xs sm:text-sm py-2.5 px-4 text-center font-medium tracking-wide border-b border-emerald-800/40">
        <span className="inline-flex items-center justify-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          🇫🇷 프랑스 VETALIS 직수입 완제품 | (주)한국아그로 × 고문수의사 제임스 홍 임상 솔루션
        </span>
      </div>

      {/* 2. 히어로 헤더 */}
      <header className="relative bg-gradient-to-br from-[#00513b] via-[#00664a] to-[#003828] text-white pt-16 pb-24 px-6 overflow-hidden shadow-xl">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-emerald-400/10 via-teal-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs sm:text-sm font-semibold tracking-wide border border-white/20 shadow-inner">
            <span>🌟 유럽이 선택한 프리미엄 송아지 건강 솔루션</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-md leading-tight">
            송아지의 건강한 시작! <br className="sm:hidden" />
            <span className="text-emerald-300">베타콜</span>{' '}
            <span className="text-2xl sm:text-4xl font-light text-emerald-100/90">(VETACOL)</span>
          </h1>
          
          <p className="text-lg sm:text-2xl text-emerald-100 font-medium max-w-2xl mx-auto pt-2 leading-relaxed break-keep">
            출생 직후부터 필요한 <strong className="text-white underline decoration-emerald-400 decoration-4 underline-offset-4">면역 · 장 건강 · 기력</strong>까지 
            <br className="hidden sm:inline" /> 15ml 시린지 단 한 번으로 완벽하게 해결합니다.
          </p>

          {/* 간편 요약 배지 */}
          <div className="flex flex-wrap justify-center gap-3 pt-6 text-xs sm:text-sm font-semibold">
            <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/15 flex items-center gap-2">
              <span>💉</span> 1두당 1시린지(15ml) 직접 투여
            </div>
            <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/15 flex items-center gap-2">
              <span>⚡</span> 출생 직후 빠른 골든타임 흡수
            </div>
            <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/15 flex items-center gap-2">
              <span>🏆</span> 축산 선진국 프랑스 혁신 포뮬러
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
              <span>쿠팡 공식 스토어 바로 구매하기</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <div className="text-xs sm:text-sm text-emerald-200 font-medium flex items-center gap-1.5 bg-black/30 px-4 py-3 rounded-xl border border-white/10">
              <span className="text-amber-400">⚡</span> 로켓/택배 빠른 배송 & 100% 정품 보증
            </div>
          </div>
        </div>
      </header>

      {/* 헤더 침범(-mt-12) 제거 및 간격 조정(py-12) */}
      <main className="max-w-5xl mx-auto px-4 py-12 relative z-20 space-y-16 pb-32">
        
        {/* 3. 4대 특장점 (Why Vetacol?) */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-100">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-1">Why Vetacol?</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              송아지 생존율과 성장을 극대화하는 <span className="text-[#00513b]">4대 특장점</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: '면역력 강화', sub: '초유 & 유청단백질 함유', desc: '초기 면역 공백을 채워주고 질병 저항성 강화', icon: '🛡️' },
              { title: '장 건강 관리', sub: '바실러스 2종 프로바이오틱스', desc: '장내 유익균 정상 세균총 형성 및 설사 예방 도움', icon: '🦠' },
              { title: '성장 & 기력 지원', sub: '멀티 비타민 & 글리시네이트', desc: '체내 흡수율 높은 미네랄로 활력과 성장 촉진', icon: '📈' },
              { title: '간편한 급여', sub: '15ml 눈금 시린지 타입', desc: '출생 직후 입안에 직접 짜서 급여하는 위생적 설계', icon: '💉' },
            ].map((item, idx) => (
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
              🎬 Official Video Presentation
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mt-3 mb-2">
              <span className="text-emerald-400">5분으로 끝내는</span> 송아지 골든타임
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed break-keep">
              (주)한국아그로 × 고문수의사 제임스 홍 팀이 직접 안내하는 베타콜 핵심 효과와 급여 가이드를 영상으로 확인하세요.
            </p>
          </div>

          {/* 16:9 비디오 플레이어 컨테이너 */}
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-500/40 bg-black aspect-video relative z-10 group">
            <video
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              playsInline
            >
              <source src="./vetacol_video3.mp4" type="video/mp4" />
              해당 브라우저에서는 동영상 재생을 지원하지 않습니다. 크롬 또는 엣지 브라우저를 이용해 주세요.
            </video>
          </div>

          {/* 영상 핵심 하이라이트 요약 */}
          <div className="max-w-4xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10 text-center">
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-white/10 flex flex-col items-center">
              <span className="text-xs font-bold text-amber-400 mb-0.5">💡 STEP 1. 초기 면역 공백</span>
              <p className="text-[11px] text-gray-300">출생 직후 6~12시간 내 초유 면역글로불린 흡수의 중요성</p>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-white/10 flex flex-col items-center">
              <span className="text-xs font-bold text-emerald-400 mb-0.5">🛡️ STEP 2. 5대 복합 포뮬러</span>
              <p className="text-[11px] text-gray-300">초유·유청·바실러스·MCT·비타민의 과학적 상승 작용</p>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-white/10 flex flex-col items-center">
              <span className="text-xs font-bold text-teal-300 mb-0.5">💉 STEP 3. 15ml 시린지 급여</span>
              <p className="text-[11px] text-gray-300">입안 깊숙이 1회 주입으로 완결되는 가장 위생적인 투여법</p>
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
              <span>🛒 영상 속 베타콜, 쿠팡에서 지금 바로 주문하기</span>
              <span>→</span>
            </a>
          </div>
        </section>

        {/* 4. 추천 송아지 타겟 섹션 */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              이런 송아지에게 <span className="bg-gradient-to-r from-[#00513b] to-emerald-600 bg-clip-text text-transparent">강력 추천합니다!</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">농장의 폐사율을 낮추고 초기 성장을 결정짓는 골든타임을 놓치지 마세요.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: '출생 직후 송아지',
                sub: '초기 면역 형성 시급',
                desc: '어미의 초유 섭취가 부족하거나, 출생 직후 확실하고 빠른 면역력 형성이 필요할 때 즉시 투여하세요.',
                tag: '필수 기본 투여',
                borderColor: 'border-blue-200 hover:border-blue-500',
                badgeBg: 'bg-blue-100 text-blue-800',
              },
              {
                num: '02',
                title: '설사 징후 및 장 장애 시',
                sub: '장내 세균총 정상화',
                desc: '변이 무르고 설사 징후가 보일 때, 바실러스 2종 유익균이 장내 환경을 빠르게 정상화하여 회복을 돕습니다.',
                tag: '설사 예방 · 회복',
                borderColor: 'border-emerald-200 hover:border-emerald-500',
                badgeBg: 'bg-emerald-100 text-emerald-800',
              },
              {
                num: '03',
                title: '기력 저하 · 허약 송아지',
                sub: '고에너지 · 미네랄 보충',
                desc: '스스로 일어서지 못하거나 기력이 떨어져 활력 및 긴급 보충 영양 공급이 시급할 때 즉각 에너지를 부여합니다.',
                tag: '긴급 활력 보강',
                borderColor: 'border-amber-200 hover:border-amber-500',
                badgeBg: 'bg-amber-100 text-amber-800',
              },
            ].map((target, idx) => (
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
                  <span>✨ 1시린지(15ml) 직접 급여</span>
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
              Scientific Formulation
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mt-3 mb-2">
              유럽 엄격한 기준의 <span className="text-emerald-400">5대 핵심 복합 성분</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              송아지 성장에 필수적인 영양소만을 과학적으로 배합한 프랑스 VETALIS 혁신 기술력입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
            {ingredients.map((ing, idx) => (
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
              <h3 className="text-lg font-extrabold text-white mb-1">VETALIS Laboratoire</h3>
              <p className="text-xs text-emerald-100 mb-3">프랑스 제조소 승인번호 α FR 16089043</p>
              <span className="px-3 py-1 bg-white text-[#00513b] rounded-full text-xs font-black shadow">
                엄격한 완제품 품질 관리
              </span>
            </div>
          </div>
        </section>

        {/* 6. 급여 방법 및 사용 가이드 */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">
            📋 사용 가이드 & 급여 방법 <span className="text-xs font-normal text-gray-500 block sm:inline mt-1 sm:mt-0">(Directions)</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#00513b] text-white flex items-center justify-center font-bold text-lg mb-3 shadow-md">1</div>
              <h3 className="font-bold text-gray-900 mb-1">급여 시기 (골든타임)</h3>
              <p className="text-sm text-gray-600 break-keep">송아지 출생 후 <strong className="text-[#00513b]">가능한 빨리 투여</strong>하십시오.<br />(필요 시 6~12시간 후 추가 급여 권장)</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#00513b] text-white flex items-center justify-center font-bold text-lg mb-3 shadow-md">2</div>
              <h3 className="font-bold text-gray-900 mb-1">급여량 및 방법</h3>
              <p className="text-sm text-gray-600 break-keep">1두당 <strong className="text-[#00513b]">15ml 주입기 1개</strong>를 송아지 입안 안쪽에 넣어 직접 주입합니다.</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#00513b] text-white flex items-center justify-center font-bold text-lg mb-3 shadow-md">3</div>
              <h3 className="font-bold text-gray-900 mb-1">보관 및 유통기한</h3>
              <p className="text-sm text-gray-600 break-keep"><strong className="text-[#00513b]">건냉한 곳에 차광 보관</strong> (사용 후 밀봉)<br />유통기한: 제조일로부터 18개월</p>
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
                <span>⚡ 쿠팡 로켓/택배 빠른 배송</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black leading-tight">
                쿠팡 공식 스토어에서<br />
                <span className="text-yellow-200">즉시 구매하고 빠르게 받아보세요!</span>
              </h2>
              <p className="text-xs sm:text-sm text-amber-100 leading-relaxed break-keep">
                복잡한 상담 없이 온라인에서 간편하게 주문하세요.<br />
                <strong>(주)한국아그로 공식 입점 제품</strong>으로 100% 정품 품질을 보증합니다.
              </p>
              <div className="bg-black/30 p-3 rounded-xl text-xs space-y-1 border border-white/10">
                <div className="font-bold text-yellow-300">📦 상품명: 베타콜 Vetacol 송아지 초유 면역 영양제</div>
                <div className="text-amber-100">15ml 눈금 시린지 액상 타입 (초유·유청·바실러스·비타민)</div>
              </div>
            </div>
            <div className="mt-8 relative z-10">
              <a
                href="https://www.coupang.com/vp/products/9428079667?vendorItemId=94985664531&itemId=28028533075&landingType=SDP"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-white hover:bg-emerald-50 text-[#00513b] hover:text-emerald-900 rounded-2xl text-base sm:text-lg font-black shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 transform group-hover:translate-y-[-2px] border-2 border-emerald-600/10"
              >
                <span>🛒 쿠팡에서 바로 주문하기</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* 우측: 1:1 수의사 상담 및 대량 구매 문의 */}
          <div className="bg-gradient-to-br from-emerald-900 via-[#00513b] to-teal-900 rounded-3xl p-8 text-white shadow-2xl flex flex-col justify-between border border-emerald-700/50 relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <span className="inline-block px-3 py-1 bg-emerald-500/30 text-emerald-200 rounded-full text-xs font-semibold">
                💬 (주)한국아그로 전문 상담
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                농장 맞춤형 솔루션 및<br />
                <span className="text-emerald-300">대량 구매 · 기술 상담</span>
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed break-keep">
                스마트폰 카메라로 QR 코드를 스캔하여 간편하게 접속하거나 거래처에 공유해 보세요.<br />
                <strong className="text-white">제임스 홍 고문수의사팀 및 전문 임상 컨설턴트</strong>가 친절하게 안내해 드립니다.
              </p>

              {/* 공식 QR 코드 스캔 박스 */}
              <div className="my-3 p-3 sm:p-4 bg-white/95 backdrop-blur-md rounded-2xl flex items-center gap-3.5 border border-emerald-400/40 text-slate-900 shadow-lg">
                <img src="./vetacol_qr.png" alt="베타콜 공식 QR코드" className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl shrink-0 border border-slate-200 shadow" />
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-[#00513b] text-[11px] font-extrabold">
                    <span>📱 스마트폰 카메라 간편 스캔</span>
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                    베타콜 공식 랜딩페이지 접속 QR
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed break-keep">
                    포스터, 리플렛, 명함 인용 가능! 스마트폰 카메라로 스캔 시 즉시 모바일 페이지로 연결됩니다.
                  </p>
                </div>
              </div>

              <div className="pt-1 flex flex-col gap-1.5 text-xs text-emerald-200">
                <span className="flex items-center gap-1.5">📞 고객상담: <strong className="text-white text-sm">02-6949-5708</strong></span>
                <span className="flex items-center gap-1.5">📱 모바일 상담: <strong className="text-white text-sm">010-5407-5708</strong></span>
                <span className="flex items-center gap-1.5">🌐 공식 웹사이트: www.agrokorea.kr</span>
              </div>
            </div>

            {/* 하단 상담 연결 버튼 / 간편 안내 */}
            <div className="mt-8 pt-4 border-t border-emerald-800/80 flex items-center justify-between gap-4">
              <div className="text-xs text-emerald-300">
                * 평일 09:00 ~ 18:00 (주말/공휴일 휴무)<br />
                * 전국 농장 맞춤 컨설팅 지원
              </div>
              <a
                href="http://www.agrokorea.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-colors flex items-center gap-1 shrink-0"
              >
                <span>웹사이트 방문</span>
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
              <span>쿠팡 공식 입점</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-white truncate">베타콜 Vetacol 송아지 초유 면역 영양제 15ml</div>
          </div>
        </div>
        <a
          href="https://www.coupang.com/vp/products/9428079667?vendorItemId=94985664531&itemId=28028533075&landingType=SDP"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-500 text-slate-900 font-black text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-1.5 border border-yellow-200"
        >
          <span>🛒 쿠팡 구매하기</span>
          <span>→</span>
        </a>
      </div>

      {/* 8. 상세 푸터 (법적 공지 및 수입원 정보) */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800 text-xs">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm">(주)한국아그로 | 고문수의사 제임스 홍</h4>
            <p className="leading-relaxed">
              서울특별시 마포구 군나루로 75 성지빌딩 1506호<br />
              TEL: 02-6949-5708 | Mobile: 010-5407-5708<br />
              웹사이트: <a href="http://www.agrokorea.kr" className="text-emerald-400 hover:underline">www.agrokorea.kr</a>
            </p>
          </div>
          <div className="space-y-1 text-slate-400">
            <p><strong className="text-slate-300">제조원:</strong> VETALIS Laboratoire (프랑스, 제조소 승인번호 α FR 16089043)</p>
            <p><strong className="text-slate-300">수입원:</strong> (주)엘켐코바이오 (서울 중랑구 신내역로 3길 신내데시앙플렉스 B동 104호)</p>
            <p><strong className="text-slate-300">사료의 성분등록번호:</strong> 제 서울-16019호 | <strong className="text-slate-300">명칭:</strong> 양축용 영양보충제(특수배합사료)</p>
            <p><strong className="text-slate-300">등록성분량:</strong> 조단백질 13.4% 이상, 조지방 2.3% 이상, 수분 46.0% 이하</p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto pt-6 border-t border-slate-800 text-center text-slate-500 space-y-1">
          <p>※ 본 제품은 동물용 의약품이 아닌 동물용 보조사료(영양보충제)입니다. 사용 전 반드시 제품 설명서를 확인하십시오.</p>
          <p>Copyright © Korea Agro Co., Ltd. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default VetacolLanding;
