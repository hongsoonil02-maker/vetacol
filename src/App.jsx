import { useEffect, useState } from 'react'
import VetacolLanding from './VetacolLanding'
import VetacolBannerShowcase from './VetacolBannerShowcase'
import './index.css'

const LANDING_VIEW = 'landing'
const BANNER_SHOWCASE_VIEW = 'banner-showcase'

const getCurrentView = () => {
  if (typeof window === 'undefined') {
    return LANDING_VIEW
  }

  const params = new URLSearchParams(window.location.search)
  return params.get('view') === BANNER_SHOWCASE_VIEW ? BANNER_SHOWCASE_VIEW : LANDING_VIEW
}

function App() {
  const [view, setView] = useState(getCurrentView)
  const isBannerShowcase = view === BANNER_SHOWCASE_VIEW

  useEffect(() => {
    const handlePopState = () => {
      setView(getCurrentView())
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const navigateTo = (nextView) => {
    const url = new URL(window.location.href)

    if (nextView === BANNER_SHOWCASE_VIEW) {
      url.searchParams.set('view', BANNER_SHOWCASE_VIEW)
    } else {
      url.searchParams.delete('view')
    }

    window.history.pushState({}, '', url)
    setView(nextView)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {isBannerShowcase ? <VetacolBannerShowcase /> : <VetacolLanding />}
      <button
        type="button"
        onClick={() => navigateTo(isBannerShowcase ? LANDING_VIEW : BANNER_SHOWCASE_VIEW)}
        className="fixed bottom-4 right-4 z-50 rounded-full border border-white/15 bg-[#00513b] px-4 py-3 text-xs font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-[#00664a] sm:bottom-6 sm:right-6 sm:text-sm"
        aria-label={isBannerShowcase ? '랜딩페이지로 돌아가기' : '신문 배너 시안 보기'}
      >
        {isBannerShowcase ? '랜딩페이지로 돌아가기' : '배너 시안 보기 / Banner Preview'}
      </button>
    </>
  )
}

export default App
