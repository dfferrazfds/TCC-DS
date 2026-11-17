import { motion, useReducedMotion } from 'framer-motion'
import { Leaf, PackageCheck, Timer, Users, type LucideIcon } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const icons: Record<string, LucideIcon> = {
  PackageCheck,
  Users,
  Timer,
}

const tones: Record<string, string> = {
  lime: 'text-lime border-lime/25 bg-lime/[0.06]',
  mint: 'text-mint border-mint/25 bg-mint/[0.06]',
  amber: 'text-amber border-amber/25 bg-amber/[0.06]',
}

export function Impact() {
  const reduceMotion = useReducedMotion()
  const { impact } = siteConfig

  return (
    <section id="impacto" className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-1/4 h-[600px] w-[600px] rounded-full border border-mint/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-1/3 h-[440px] w-[440px] rounded-full border border-mint/10" />

      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow={impact.eyebrow}
          title={impact.title}
          description={impact.description}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-[32px] border border-lime/20 bg-forest/70 p-8 text-center">
              <div className="absolute inset-0 contour-bg opacity-60" />
              <div className="absolute h-72 w-72 rounded-full bg-lime/10 blur-[80px]" />

              <motion.div
                initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex h-64 w-64 items-center justify-center rounded-full border border-lime/30 sm:h-72 sm:w-72"
              >
                <motion.span
                  className="absolute inset-0 rounded-full border border-lime/40"
                  animate={reduceMotion ? {} : { scale: [1, 1.28], opacity: [0.5, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
                />
                <span className="absolute inset-5 rounded-full border border-dashed border-mint/20" />
                <div className="relative z-10">
                  <Leaf className="mx-auto h-7 w-7 text-lime" />
                  <p className="mt-3 font-display text-[4.5rem] font-bold leading-none tracking-[-0.06em] text-lime sm:text-[5.4rem]">
                    {impact.heroMetric.value}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-paper">{impact.heroMetric.unit}</p>
                  <p className="mt-2 text-sm text-muted">{impact.heroMetric.label}</p>
                </div>
              </motion.div>

              <p className="relative z-10 mt-8 max-w-xs text-xs leading-relaxed text-muted">
                {impact.heroMetric.detail}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1">
            {impact.cards.map((card, index) => {
              const Icon = icons[card.icon]
              return (
                <Reveal key={card.label} delay={index * 0.09}>
                  <div className="group flex h-full items-center gap-5 rounded-[26px] border border-white/10 bg-forest/60 p-6 transition-colors hover:border-white/25 sm:flex-col sm:items-start lg:flex-row lg:items-center">
                    <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border', tones[card.tone])}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-display text-3xl font-bold leading-none text-paper">{card.value}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{card.label}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
