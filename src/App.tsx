import { useCallback, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { siteConfig } from '@/config/site'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Ticker } from './components/Ticker'
import { BusinessModel } from './components/BusinessModel'
import { Financials } from './components/Financials'
import { Impact } from './components/Impact'
import { Assumptions } from './components/Assumptions'
import { Footer } from './components/Footer'
import { TourDock } from './components/TourDock'

export default function App() {
  const reduceMotion = useReducedMotion()
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [playing, setPlaying] = useState(false)
  const totalSteps = siteConfig.tourSteps.length

  const scrollToStep = useCallback(
    (index: number) => {
      const node = document.querySelector<HTMLElement>(`[data-tour-step="${index}"]`)
      if (!node) return
      node.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'center',
      })
      setActiveStep(index)
    },
    [reduceMotion],
  )

  const stopTour = useCallback(() => {
    setPlaying(false)
    setActiveStep(null)
  }, [])

  const startTour = useCallback(() => {
    setActiveStep(null)
    setPlaying(true)
    window.setTimeout(() => scrollToStep(1), reduceMotion ? 0 : 280)
  }, [reduceMotion, scrollToStep])

  const goToNext = useCallback(() => {
    const nextIndex = activeStep === null ? 1 : activeStep + 1
    if (nextIndex > totalSteps) {
      stopTour()
      return
    }
    scrollToStep(nextIndex)
  }, [activeStep, scrollToStep, stopTour, totalSteps])

  const toggleTour = useCallback(() => {
    if (playing) {
      setPlaying(false)
      return
    }
    if (activeStep === null) startTour()
    else setPlaying(true)
  }, [activeStep, playing, startTour])

  const showAll = useCallback(() => {
    stopTour()
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [reduceMotion, stopTour])

  useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(() => {
      const nextIndex = activeStep === null ? 1 : activeStep + 1
      if (nextIndex > totalSteps) {
        stopTour()
        return
      }
      scrollToStep(nextIndex)
    }, 2800)
    return () => window.clearTimeout(timer)
  }, [playing, activeStep, scrollToStep, stopTour, totalSteps])

  return (
    <div data-touring={activeStep !== null} className="min-h-screen">
      <a
        href="#conteudo"
        className="sr-only fixed left-4 top-4 z-[90] rounded-full bg-lime px-4 py-2 text-sm font-bold text-ink focus:not-sr-only"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo" className="pb-28">
        <Hero />
        <Ticker />
        <BusinessModel
          activeStep={activeStep}
          onPlay={startTour}
          onShowAll={showAll}
          playing={playing}
        />
        <Financials activeStep={activeStep} />
        <Impact />
        <Assumptions />
      </main>
      <Footer />
      <TourDock
        playing={playing}
        activeStep={activeStep}
        onToggle={toggleTour}
        onNext={goToNext}
        onStop={stopTour}
      />
    </div>
  )
}
