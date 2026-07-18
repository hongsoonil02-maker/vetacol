import React from 'react'
import QRCode from 'react-qr-code'

const OFFICIAL_WEBSITE_URL = 'http://www.agrokorea.kr'
const COUPANG_PRODUCT_URL = 'https://www.coupang.com/vp/products/9428079667?vendorItemId=94985664531&itemId=28028533075&landingType=SDP'

const QRCodeBadge = ({ size = 'normal', value, label }) => {
  const isLarge = size === 'large'
  const frameSize = isLarge ? 'h-28 w-28 sm:h-32 sm:w-32' : 'h-24 w-24 sm:h-28 sm:w-28'

  return (
    <div className={`${frameSize} rounded bg-white p-2`}>
      <QRCode
        value={value}
        size={256}
        level="M"
        title={label}
        bgColor="#FFFFFF"
        fgColor="#111111"
        className="h-full w-full"
      />
    </div>
  )
}

const VetacolBannerShowcase = () => {
  return (
    <div className="min-h-screen bg-[#111111] font-sans text-white">
      <div className="text-center px-4 pb-6 pt-10">
        <h1 className="mb-3 text-sm font-bold tracking-[0.3em] text-emerald-400">VETACOL®</h1>
        <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
          신문 광고 배너 — Dynamic QR Code Edition
        </h2>
        <p className="text-sm text-gray-500">
          2025년 하반기 광고 집행용 · VETALIS France × 아그로코리아
        </p>
      </div>

      <div className="mb-6 flex items-center justify-center gap-2 text-xs text-gray-500">
        <span className="h-1 w-1 rounded-full bg-gray-600" />
        <span>가로형</span>
        <span className="text-gray-700">·</span>
        <span>신문 헤더/종단 광고</span>
      </div>

      <div className="mx-auto mb-4 max-w-4xl px-4">
        <div className="relative overflow-hidden rounded-sm shadow-2xl">
          <div className="flex flex-col md:flex-row">
            <div className="relative flex flex-col justify-center bg-gradient-to-br from-[#003d2e] to-[#00513b] p-6 sm:p-8 md:w-[55%]">
              <div className="absolute right-0 top-0 h-20 w-20 bg-gradient-to-bl from-emerald-600/20 to-transparent" />

              <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-600/40 bg-emerald-800/60 px-3 py-1">
                <span className="text-xs text-emerald-300">✦</span>
                <span className="text-xs font-semibold tracking-wide text-emerald-200">EU GMP 인증 제품</span>
              </div>

              <p className="mb-1 text-xs text-emerald-100/80 sm:text-sm">
                송아지 설사·폐사율 감소의 핵심
              </p>
              <p className="mb-4 text-xs text-emerald-200/70 sm:text-sm">
                초유·유청·바실러스·MCT·비타민 5대 복합 포뮬러
              </p>

              <h3 className="mb-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
                베타콜 <span className="text-lg font-bold text-emerald-300 sm:text-xl">VETACOL®</span>
              </h3>

              <p className="mt-2 text-lg font-bold text-emerald-300 sm:text-xl">송아지 설사 폐사</p>
              <p className="text-lg font-bold text-emerald-300 sm:text-xl">제로 도전</p>

              <div className="absolute bottom-0 left-0 right-0 bg-black/30 px-6 py-2">
                <p className="text-[10px] text-emerald-200/60 sm:text-xs">
                  베타콜 바이오 | 한국총판: (주)한국아그로
                </p>
              </div>
            </div>

            <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 md:w-[45%]">
              <div className="relative mb-6">
                <div className="flex h-40 w-32 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-lg sm:h-48 sm:w-40">
                  <div className="p-3 text-center">
                    <div className="mx-auto flex h-24 w-16 items-center justify-center rounded-b-md rounded-t-full border border-blue-300 bg-gradient-to-b from-blue-100 to-blue-200 sm:h-28 sm:w-20">
                      <div className="text-center">
                        <p className="text-[8px] font-bold text-blue-800 sm:text-[10px]">VETACOL</p>
                        <p className="text-[6px] text-blue-600 sm:text-[8px]">15ml</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={OFFICIAL_WEBSITE_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border-2 border-emerald-500 bg-white p-3 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                aria-label="공식 웹사이트 QR 열기"
              >
                <QRCodeBadge
                  size="normal"
                  value={OFFICIAL_WEBSITE_URL}
                  label="아그로코리아 공식 웹사이트 QR 코드"
                />
              </a>
              <p className="mt-2 text-center text-[10px] font-medium text-gray-600 sm:text-xs">
                QR 스캔하여
                <br />
                공식 웹사이트 확인
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10 flex flex-wrap items-center justify-center gap-2 px-4">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-700 bg-gray-800/80 px-3 py-1.5 text-xs text-gray-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          신문 지면/종단 광고 최적화
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-700 bg-gray-800/80 px-3 py-1.5 text-xs text-gray-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          실사용 QR 코드 연결
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-700 bg-gray-800/80 px-3 py-1.5 text-xs text-gray-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          EU GMP 인증 강조
        </span>
      </div>

      <div className="mb-6 flex items-center justify-center gap-2 text-xs text-gray-500">
        <span className="h-1 w-1 rounded-full bg-gray-600" />
        <span>세로형</span>
        <span className="text-gray-700">·</span>
        <span>신문 사이드/칼럼 광고</span>
      </div>

      <div className="mx-auto mb-4 max-w-sm px-4">
        <div className="relative overflow-hidden rounded-sm shadow-2xl">
          <div className="relative bg-gradient-to-b from-[#003d2e] to-[#00513b] p-5 sm:p-6">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-600/40 bg-emerald-800/60 px-2.5 py-1">
              <span className="text-xs text-emerald-300">✦</span>
              <span className="text-[10px] font-semibold text-emerald-200 sm:text-xs">EU GMP 인증</span>
            </div>

            <p className="mb-0.5 text-[10px] text-emerald-100/80 sm:text-xs">
              송아지 설사·폐사율 감소의 핵심
            </p>
            <p className="mb-3 text-[10px] text-emerald-200/70 sm:text-xs">
              초유·유청·바실러스·MCT·비타민 5대 복합 포뮬러
            </p>

            <h3 className="mb-0.5 text-xl font-black tracking-tight text-white sm:text-2xl">
              베타콜 <span className="text-sm font-bold text-emerald-300">VETACOL®</span>
            </h3>

            <p className="mt-1 text-sm font-bold text-emerald-300 sm:text-base">송아지 설사 폐사</p>
            <p className="text-sm font-bold text-emerald-300 sm:text-base">제로 도전</p>
          </div>

          <div className="flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-5 sm:p-6">
            <div className="flex h-36 w-28 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-lg sm:h-40 sm:w-32">
              <div className="p-3 text-center">
                <div className="mx-auto flex h-20 w-14 items-center justify-center rounded-b-md rounded-t-full border border-blue-300 bg-gradient-to-b from-blue-100 to-blue-200 sm:h-24 sm:w-16">
                  <div className="text-center">
                    <p className="text-[7px] font-bold text-blue-800 sm:text-[9px]">VETACOL</p>
                    <p className="text-[6px] text-blue-600 sm:text-[8px]">15ml</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center bg-white p-5 sm:p-6">
            <a
              href={COUPANG_PRODUCT_URL}
              target="_blank"
              rel="noreferrer"
              className="mb-2 rounded-lg border-2 border-emerald-500 bg-white p-2.5 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
              aria-label="쿠팡 구매 페이지 QR 열기"
            >
              <QRCodeBadge
                size="large"
                value={COUPANG_PRODUCT_URL}
                label="베타콜 쿠팡 구매 페이지 QR 코드"
              />
            </a>
            <p className="text-center text-[10px] font-medium text-gray-600 sm:text-xs">
              QR 스캔하여 쿠팡 구매 페이지 열기
            </p>
          </div>

          <div className="bg-[#003d2e] px-5 py-2">
            <p className="text-[9px] text-emerald-200/60 sm:text-[10px]">
              베타콜 바이오 | 한국총판: (주)한국아그로
            </p>
          </div>
        </div>
      </div>

      <div className="mb-10 flex flex-wrap items-center justify-center gap-2 px-4">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-700 bg-gray-800/80 px-3 py-1.5 text-xs text-gray-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          신문 사이드 칼럼 광고 최적화
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-700 bg-gray-800/80 px-3 py-1.5 text-xs text-gray-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          실사용 구매 QR 연결
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-700 bg-gray-800/80 px-3 py-1.5 text-xs text-gray-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          플로팅 정보 카드 레이아웃
        </span>
      </div>

      <div className="border-t border-gray-800 pb-10 pt-6 text-center">
        <p className="text-xs text-gray-600">베타콜® · VETALIS France · 한국총판 아그로코리아</p>
      </div>
    </div>
  )
}

export default VetacolBannerShowcase
