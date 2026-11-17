import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { RouteMap } from './RouteMap'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero() {
  const reduceMotion = useReducedMotion()
  const { hero } = siteConfig

  return (
    <section id="inicio" className="relative overflow-hidden pb-20 pt-32 sm:pb-28 lg:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute left-[-12%] top-[18%] h-[520px] w-[520px] rounded-full border border-lime/10" />
        <span className="absolute left-[-6%] top-[24%] h-[400px] w-[400px] rounded-full border border-lime/10" />
        <span className="absolute right-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-mint/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
        <motion.div
          variants={reduceMotion ? undefined : container}
          initial={reduceMotion ? false : 'hidden'}
          animate="show"
          className="flex flex-col gap-14 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10"
        >
          <div className="lg:col-span-7">
            <motion.div variants={item} className="flex flex-wrap items-center gap-3">
              <Badge>
                <MapPin className="h-3 w-3" /> {hero.badge}
              </Badge>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {hero.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-balance mt-7 text-[clamp(2.9rem,7.4vw,6.6rem)] font-bold leading-[0.9] tracking-[-0.055em]"
            >
              <span className="block">{hero.titleTop}</span>
              <span className="block text-muted">{hero.titleMiddle}</span>
              <span className="relative mt-2 block text-lime">
                {hero.titleAccent}
                <svg
                  className="absolute -bottom-3 left-0 h-3 w-full text-amber/70"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 8C72 2 168 2 298 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            <motion.p variants={item} className="mt-9 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {hero.subtitle}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <a href={hero.primaryCta.href}>
                  {hero.primaryCta.label} <ArrowDownRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={hero.secondaryCta.href}>
                  {hero.secondaryCta.label} <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-6"
            >
              {hero.facts.map((fact) => (
                <div key={fact.label} className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-bold text-paper">{fact.value}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    {fact.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 40, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <RouteMap />
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted/70">
              Visualização conceitual da operação-piloto
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
