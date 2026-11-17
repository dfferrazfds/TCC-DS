import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { site, tourSections } from "@/config/site";
import { goToSection } from "@/lib/scroll-to-section";

export function useTour() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const goTo = useCallback(
    (index: number) => {
      const bounded = (index + tourSections.length) % tourSections.length;
      setActiveIndex(bounded);
      const section = tourSections[bounded];
      if (!section) return;
      goToSection(section.id, !prefersReducedMotion);
    },
    [prefersReducedMotion],
  );

  const start = useCallback(() => {
    setActiveIndex(0);
    setIsPlaying(true);
    goToSection(tourSections[0]?.id ?? "inicio", !prefersReducedMotion);
  }, [prefersReducedMotion]);

  const stop = useCallback(() => {
    setIsPlaying(false);
    setActiveIndex(null);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) stop();
    else start();
  }, [isPlaying, start, stop]);

  const next = useCallback(() => {
    setIsPlaying(true);
    goTo((activeIndex ?? -1) + 1);
  }, [activeIndex, goTo]);

  const previous = useCallback(() => {
    setIsPlaying(true);
    goTo((activeIndex ?? 1) - 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (!isPlaying || activeIndex === null) return;
    const timer = window.setTimeout(() => goTo(activeIndex + 1), site.tour.intervalMs);
    return () => window.clearTimeout(timer);
  }, [activeIndex, goTo, isPlaying]);

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "Escape") stop();
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, next, previous, stop]);

  return {
    activeIndex,
    isPlaying,
    activeSection: activeIndex === null ? null : (tourSections[activeIndex] ?? null),
    start,
    stop,
    toggle,
    next,
    previous,
    goTo,
  };
}

export type TourController = ReturnType<typeof useTour>;
