import React, { useMemo } from 'react';

// Deterministic QR pattern generator
const generateQRPattern = (seed) => {
    const pattern = [];
    let val = seed;
    for (let i = 0; i < 49; i++) {
        val = (val * 9301 + 49297) % 233280;
        pattern.push(val / 233280 > 0.45);
    }
    return pattern;
};

const QRCode = ({ size = 'normal', seed = 42 }) => {
    const pattern = useMemo(() => generateQRPattern(seed), [seed]);
    const isLarge = size === 'large';
    const cellSize = isLarge ? 'w-3 h-3 sm:w-3.5 sm:h-3.5' : 'w-2.5 h-2.5 sm:w-3 sm:h-3';
    const cornerSize = isLarge ? 'w-6 h-6 sm:w-7 sm:h-7' : 'w-5 h-5 sm:w-6 sm:h-6';
    const cornerInner = isLarge ? 'inset-1.5' : 'inset-1';
    const gridGap = isLarge ? 'gap-[2px]' : 'gap-[1px]';

    return (
        <div className={`bg-gray-900 rounded flex items-center justify-center relative overflow-hidden ${isLarge ? 'w-28 h-28 sm:w-32 sm:h-32' : 'w-24 h-24 sm:w-28 sm:h-28'}`}>
            <div className={`absolute inset-3 sm:inset-4 grid grid-cols-7 grid-rows-7 ${gridGap}`}>
                {pattern.map((filled, i) => (
                    <div
                        key={i}
                        className={`${cellSize} rounded-[1px] ${filled ? 'bg-white' : 'bg-gray-900'}`}
                    />
                ))}
            </div>
            {/* QR Corner Markers */}
            <div className={`absolute top-2 left-2 ${cornerSize} border-2 border-white rounded-sm`}>
                <div className={`absolute ${cornerInner} bg-white rounded-[1px]`} />
            </div>
            <div className={`absolute top-2 right-2 ${cornerSize} border-2 border-white rounded-sm`}>
                <div className={`absolute ${cornerInner} bg-white rounded-[1px]`} />
            </div>
            <div className={`absolute bottom-2 left-2 ${cornerSize} border-2 border-white rounded-sm`}>
                <div className={`absolute ${cornerInner} bg-white rounded-[1px]`} />
            </div>
        </div>
    );
};

const VetacolBannerShowcase = () => {
    return (
        <div className="min-h-screen bg-[#111111] text-white font-sans">
            {/* Header */}
            <div className="text-center pt-10 pb-6 px-4">
                <h1 className="text-emerald-400 text-sm font-bold tracking-[0.3em] mb-3">VETACOL®</h1>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    신문 광고 배너 — Dynamic QR Code Edition
                </h2>
                <p className="text-gray-500 text-sm">
                    2025년 하반기 광고 집행용 · VETALIS France × 아그로코리아
                </p>
            </div>

            {/* Breadcrumb - Horizontal */}
            <div className="flex items-center justify-center gap-2 text-gray-500 text-xs mb-6">
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span>가로형</span>
                <span className="text-gray-700">·</span>
                <span>신문 헤더/종단 광고</span>
            </div>

            {/* Horizontal Banner */}
            <div className="max-w-4xl mx-auto px-4 mb-4">
                <div className="relative overflow-hidden rounded-sm shadow-2xl">
                    <div className="flex flex-col md:flex-row">
                        {/* Left: Green Info Section */}
                        <div className="md:w-[55%] bg-gradient-to-br from-[#003d2e] to-[#00513b] p-6 sm:p-8 flex flex-col justify-center relative">
                            {/* Decorative corner */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-emerald-600/20 to-transparent" />

                            {/* EU GMP Badge */}
                            <div className="inline-flex items-center gap-1.5 bg-emerald-800/60 border border-emerald-600/40 rounded-full px-3 py-1 mb-4 w-fit">
                                <span className="text-emerald-300 text-xs">✦</span>
                                <span className="text-emerald-200 text-xs font-semibold tracking-wide">EU GMP 인증 제품</span>
                            </div>

                            {/* Product Description */}
                            <p className="text-emerald-100/80 text-xs sm:text-sm mb-1">
                                송아지 설사·폐사율 감소의 핵심
                            </p>
                            <p className="text-emerald-200/70 text-xs sm:text-sm mb-4">
                                초유·유청·바실러스·MCT·비타민 5대 복합 포뮬러
                            </p>

                            {/* Product Name */}
                            <h3 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">
                                베타콜 <span className="text-emerald-300 text-lg sm:text-xl font-bold">VETACOL®</span>
                            </h3>

                            {/* Tagline */}
                            <p className="text-emerald-300 text-lg sm:text-xl font-bold mt-2">
                                송아지 설사 폐사
                            </p>
                            <p className="text-emerald-300 text-lg sm:text-xl font-bold">
                                제로 도전
                            </p>

                            {/* Bottom bar */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black/30 px-6 py-2">
                                <p className="text-emerald-200/60 text-[10px] sm:text-xs">
                                    베콜 바이오 | 한국총판: (주)한국아그로
                                </p>
                            </div>
                        </div>

                        {/* Right: Product Image + QR */}
                        <div className="md:w-[45%] bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6 sm:p-8 relative">
                            {/* Product Bottle */}
                            <div className="mb-6 relative">
                                <div className="w-32 h-40 sm:w-40 sm:h-48 bg-white rounded-lg shadow-lg flex items-center justify-center border border-gray-200">
                                    <div className="text-center p-3">
                                        <div className="w-16 h-24 sm:w-20 sm:h-28 mx-auto bg-gradient-to-b from-blue-100 to-blue-200 rounded-t-full rounded-b-md flex items-center justify-center border border-blue-300">
                                            <div className="text-center">
                                                <p className="text-[8px] sm:text-[10px] font-bold text-blue-800">VETACOL</p>
                                                <p className="text-[6px] sm:text-[8px] text-blue-600">15ml</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* QR Code */}
                            <div className="bg-white p-3 rounded-lg shadow-md border-2 border-emerald-500">
                                <QRCode size="normal" seed={42} />
                            </div>
                            <p className="text-gray-600 text-[10px] sm:text-xs mt-2 text-center font-medium">
                                QR 스캔하여<br />제품 정보 확인
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tags - Horizontal */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10 px-4">
                <span className="inline-flex items-center gap-1.5 bg-gray-800/80 border border-gray-700 rounded-full px-3 py-1.5 text-xs text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    신문 지면/종단 광고 최적화
                </span>
                <span className="inline-flex items-center gap-1.5 bg-gray-800/80 border border-gray-700 rounded-full px-3 py-1.5 text-xs text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Dynamic QR 스티커 애니메이션
                </span>
                <span className="inline-flex items-center gap-1.5 bg-gray-800/80 border border-gray-700 rounded-full px-3 py-1.5 text-xs text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    EU GMP 인증 강조
                </span>
            </div>

            {/* Breadcrumb - Vertical */}
            <div className="flex items-center justify-center gap-2 text-gray-500 text-xs mb-6">
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span>세로형</span>
                <span className="text-gray-700">·</span>
                <span>신문 사이드/칼럼 광고</span>
            </div>

            {/* Vertical Banner */}
            <div className="max-w-sm mx-auto px-4 mb-4">
                <div className="relative overflow-hidden rounded-sm shadow-2xl">
                    {/* Top: Green Info Section */}
                    <div className="bg-gradient-to-b from-[#003d2e] to-[#00513b] p-5 sm:p-6 relative">
                        {/* EU GMP Badge */}
                        <div className="inline-flex items-center gap-1.5 bg-emerald-800/60 border border-emerald-600/40 rounded-full px-2.5 py-1 mb-3">
                            <span className="text-emerald-300 text-xs">✦</span>
                            <span className="text-emerald-200 text-[10px] sm:text-xs font-semibold">EU GMP 인증</span>
                        </div>

                        {/* Product Description */}
                        <p className="text-emerald-100/80 text-[10px] sm:text-xs mb-0.5">
                            송아지 설사·폐사율 감소의 핵심
                        </p>
                        <p className="text-emerald-200/70 text-[10px] sm:text-xs mb-3">
                            초유·유청·바실러스·MCT·비타민 5대 복합 포뮬러
                        </p>

                        {/* Product Name */}
                        <h3 className="text-xl sm:text-2xl font-black text-white mb-0.5 tracking-tight">
                            베타콜 <span className="text-emerald-300 text-sm font-bold">VETACOL®</span>
                        </h3>

                        {/* Tagline */}
                        <p className="text-emerald-300 text-sm sm:text-base font-bold mt-1">
                            송아지 설사 폐사
                        </p>
                        <p className="text-emerald-300 text-sm sm:text-base font-bold">
                            제로 도전
                        </p>
                    </div>

                    {/* Middle: Product Image */}
                    <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-5 sm:p-6 flex items-center justify-center">
                        <div className="w-28 h-36 sm:w-32 sm:h-40 bg-white rounded-lg shadow-lg flex items-center justify-center border border-gray-200">
                            <div className="text-center p-3">
                                <div className="w-14 h-20 sm:w-16 sm:h-24 mx-auto bg-gradient-to-b from-blue-100 to-blue-200 rounded-t-full rounded-b-md flex items-center justify-center border border-blue-300">
                                    <div className="text-center">
                                        <p className="text-[7px] sm:text-[9px] font-bold text-blue-800">VETACOL</p>
                                        <p className="text-[6px] sm:text-[8px] text-blue-600">15ml</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom: QR Code Section */}
                    <div className="bg-white p-5 sm:p-6 flex flex-col items-center">
                        <div className="bg-white p-2.5 rounded-lg shadow-md border-2 border-emerald-500 mb-2">
                            <QRCode size="large" seed={77} />
                        </div>
                        <p className="text-gray-600 text-[10px] sm:text-xs text-center font-medium">
                            QR 스캔하여 제품 정보 확인
                        </p>
                    </div>

                    {/* Footer Bar */}
                    <div className="bg-[#003d2e] px-5 py-2">
                        <p className="text-emerald-200/60 text-[9px] sm:text-[10px]">
                            베타콜 바이오 | 한국총판: (주)한국아그로
                        </p>
                    </div>
                </div>
            </div>

            {/* Tags - Vertical */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10 px-4">
                <span className="inline-flex items-center gap-1.5 bg-gray-800/80 border border-gray-700 rounded-full px-3 py-1.5 text-xs text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    신문 사이드 칼럼 광고 최적화
                </span>
                <span className="inline-flex items-center gap-1.5 bg-gray-800/80 border border-gray-700 rounded-full px-3 py-1.5 text-xs text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    동적 스티커 라인 애니메이션
                </span>
                <span className="inline-flex items-center gap-1.5 bg-gray-800/80 border border-gray-700 rounded-full px-3 py-1.5 text-xs text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    플로팅 정보 카드
                </span>
            </div>

            {/* Footer */}
            <div className="text-center pb-10 pt-6 border-t border-gray-800">
                <p className="text-gray-600 text-xs">
                    베타콜® · VETALIS France · 한국총판 아그로코리아
                </p>
            </div>
        </div>
    );
};

export default VetacolBannerShowcase;
