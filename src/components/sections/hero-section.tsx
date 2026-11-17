import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowRight, MoveDown } from "lucide-react";

import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RouteMap } from "@/components/visuals/route-map";
import { EASE_OUT } from "@/lib/motion";

export function HeroSection() {
  const reduced = useReducedMotion();
  const { hero, a11y } = site;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.11, delayChildren: reduced ? 0 : 0.12 } },
  };
  const item = {
    hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_OUT } },
  };

  return (
    <section
      id="inicio"
      data-section="inicio"
      aria-labelledby="inicio-title"
      className="relative flex min-h-screen scroll-mt-0 items-center overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_25%,rgba(34,99,67,0.55),transparent_55%),radial-gradient(ellipse_at_10%_85%,rgba(21,147,94,0.16),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid-fine [background-size:64px_64px] opacity-40" />
      <div className="surface-noise pointer-events-none absolute inset-0 opacity-[0.045]" />

      <div className="container relative z-10 grid items-center gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-start">
          <motion.div variants={item}>
            <Badge className="gap-2">
              <span className="size-1.5 rounded-full bg-lime-300 shadow-[0_0_12px_3px_rgba(215,255,79,0.6)]" />
              {hero.eyebrow}
            </Badge>
          </motion.div>

          <h1
            id="inicio-title"
            className="mt-7 text-balance font-editorial text-[clamp(3rem,7.2vw,5.75rem)] font-medium leading-[0.98] tracking-[-0.045em]"
          >
            {hero.titleLines.map((line, index) => (
              <motion.span key={line.text} variants={item} className="block">
                <span
                  className={"accent" in line && line.accent ? "text-lime-300" : index === 3 ? "text-mint-100" : "text-cream"}
                >
                  {line.text}
                </span>
                {index === hero.titleLines.length - 1 ? (
                  <span className="ml-2 inline-block text-lime-300">.</span>
                ) : null}
              </motion.span>
            ))}
          </h1>

          <motion.p variants={item} className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-mint-100/70 sm:text-lg">
            {hero.description}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
                <ArrowDownRight />
              </a>
            </Button>
          </motion.div>

          <motion.dl variants={item} className="mt-14 grid w-full max-w-xl grid-cols-3 gap-4 border-t border-mint-100/10 pt-7">
            {hero.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col gap-1">
                <dt className="order-2 text-[11px] leading-snug text-mint-100/70 sm:text-xs">{metric.label}</dt>
                <dd className="order-1 font-editorial text-2xl font-semibold text-lime-200 sm:text-3xl">
                  {metric.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, x: 36, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: reduced ? 0 : 0.35, ease: EASE_OUT }}
          className="relative"
        >
          <div className="relative rounded-[2.5rem] border border-mint-100/10 bg-forest-900/45 p-3 shadow-lift backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 pb-1 pt-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mint-200/70">
                {hero.mapLabel}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-mint-200/70">
                <span className="size-1.5 animate-pulse rounded-full bg-mint-300" />
                ao vivo
              </span>
            </div>
            <RouteMap showCards />
          </div>
          <span className="sr-only">{a11y.mapDescription}</span>
        </motion.div>
      </div>

      <motion.a
        href="#manifesto"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-mint-200/65 transition-colors hover:text-lime-300 lg:flex"
      >
        Deslize para explorar
        <MoveDown className="size-4 animate-bounce" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
