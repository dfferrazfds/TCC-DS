import { AnimatePresence, motion } from 'framer-motion'
import { Pause, Play, SkipForward, X } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

type TourDockProps = {
  playing: boolean
  activeStep: number | null
  onToggle: () => void
  onNext: () => void
  onStop: () => void
}

export function TourDock({ playing, activeStep, onToggle, onNext, onStop }: TourDockProps) {
  const total = siteConfig.tourSteps.length
  const current = activeStep === null ? 0 : activeStep
  const label = activeStep === null ? 'Tour guiado' : siteConfig.tourSteps[activeStep - 1]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-xl sm:inset-x-auto sm:bottom-6"
        role="region"
        aria-label="Controles do tour guiado"
      >
        <div className="rounded-[22px] border border-white/15 bg-ink/90 p-2.5 shadow-[0_24px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggle}
              aria-label={playing ? 'Pausar tour' : 'Reproduzir tour'}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime text-ink transition-transform hover:scale-105"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>

            <div className="min-w-0 flex-1 px-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-paper">
                  {label}
                </p>
                <span className="shrink-0 font-mono text-[9px] text-muted">
                  {activeStep === null ? '—' : String(current).padStart(2, '0')}/{total}
                </span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-lime"
                  animate={{ width: activeStep === null ? '0%' : `${(current / total) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={onNext}
              aria-label="Próximo bloco"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-muted transition-colors hover:border-lime/40 hover:text-lime"
            >
              <SkipForward className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onStop}
              aria-label="Encerrar tour"
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-muted transition-colors hover:border-white/40 hover:text-paper',
                activeStep === null && !playing && 'hidden sm:flex',
              )}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
