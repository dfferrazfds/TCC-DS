import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Compass, Pause, Play, X } from "lucide-react";

import { site, tourSections } from "@/config/site";
import { Button } from "@/components/ui/button";

interface TourControllerProps {
  activeIndex: number | null;
  isPlaying: boolean;
  onStart: () => void;
  onStop: () => void;
  onToggle: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onGoTo: (index: number) => void;
}

export function TourController({
  activeIndex,
  isPlaying,
  onStart,
  onStop,
  onToggle,
  onNext,
  onPrevious,
  onGoTo,
}: TourControllerProps) {
  const reduced = useReducedMotion();
  const active = activeIndex === null ? null : tourSections[activeIndex];

  return (
    <>
      <AnimatePresence>
        {activeIndex === null ? (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 left-6 z-50 hidden lg:block"
          >
            <Button onClick={onStart} variant="outline" className="border-lime-300/30 bg-forest-900/90 shadow-lift backdrop-blur-xl">
              <Compass />
              {site.tour.play}
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {active ? (
          <motion.aside
            aria-label={site.tour.label}
            initial={reduced ? false : { opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed bottom-4 left-1/2 z-[60] w-[min(94vw,700px)] -translate-x-1/2 rounded-[1.75rem] border border-lime-300/20 bg-forest-950/95 p-4 shadow-[0_30px_90px_-25px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:bottom-6"
          >
            <div className="flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-lime-300 font-editorial text-sm font-bold text-forest-950">
                {activeIndex! + 1}
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-lime-300/80">
                  {site.tour.label} · {activeIndex! + 1}/{tourSections.length}
                </p>
                <h2 className="mt-1 truncate font-editorial text-lg font-semibold text-cream">{active.tourTitle}</h2>
                <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-mint-100/70">{active.tourDescription}</p>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <Button variant="ghost" size="icon" onClick={onPrevious} aria-label={site.tour.previous}>
                  <ChevronLeft />
                </Button>
                <Button variant="ghost" size="icon" onClick={onToggle} aria-label={isPlaying ? site.tour.pause : site.tour.play}>
                  {isPlaying ? <Pause /> : <Play />}
                </Button>
                <Button variant="ghost" size="icon" onClick={onNext} aria-label={site.tour.next}>
                  <ChevronRight />
                </Button>
                <Button variant="ghost" size="icon" onClick={onStop} aria-label={site.tour.exit}>
                  <X />
                </Button>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1.5">
              {tourSections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => onGoTo(index)}
                  aria-label={`Ir para ${section.navLabel}`}
                  aria-current={index === activeIndex ? "step" : undefined}
                  className="group h-1.5 flex-1 rounded-full bg-foreground/15"
                >
                  <span
                    className={
                      index === activeIndex
                        ? "block h-full w-full rounded-full bg-lime-300"
                        : index < activeIndex!
                          ? "block h-full w-full rounded-full bg-mint-400/50"
                          : "block h-full w-0 rounded-full bg-mint-400/30 transition-all duration-300 group-hover:w-full"
                    }
                  />
                </button>
              ))}
            </div>
            <p className="mt-3 hidden text-center text-[10px] uppercase tracking-[0.16em] text-mint-200/60 sm:block">
              {site.tour.hint}
            </p>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
