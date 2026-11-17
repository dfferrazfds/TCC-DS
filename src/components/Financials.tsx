import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { brl, cn } from '@/lib/utils'
import { AnimatedNumber } from './AnimatedNumber'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { Badge } from './ui/badge'

const formatBrl = (value: number) => brl.format(Math.round(value))
const formatBrlPlus = (value: number) => `+ ${brl.format(Math.round(value))}`

const kpiTone: Record<string, string> = {
  sky: 'border-sky-400/25 bg-sky-400/[0.06]',
  mint: 'border-mint/25 bg-mint/[0.06]',
  amber: 'border-amber/25 bg-amber/[0.06]',
  lime: 'border-lime/40 bg-lime/[0.09]',
}

type FinancialsProps = {
  activeStep: number | null
}

export function Financials({ activeStep }: FinancialsProps) {
  const reduceMotion = useReducedMotion()
  const { financials } = siteConfig

  return (
    <section id="numeros" className="relative py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/3 h-96 bg-lime/[0.04] blur-[120px]" />
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow={financials.eyebrow}
          title={financials.title}
          description={financials.description}
          action={
            <Badge variant="amber">
              <TrendingUp className="h-3 w-3" /> {financials.pill}
            </Badge>
          }
        />

        <div
          data-tour-step={10}
          data-active={activeStep === 10}
          className="mt-14 rounded-[32px] border border-white/10 bg-ink/70 p-5 shadow-panel backdrop-blur-xl sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {financials.kpis.map((kpi, index) => (
              <Reveal key={kpi.label} delay={index * 0.07}>
                <div
                  className={cn(
                    'flex h-full flex-col rounded-[22px] border p-5',
                    kpiTone[kpi.tone],
                    kpi.highlight && 'ring-1 ring-lime/25',
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                      {kpi.sublabel}
                    </span>
                    {kpi.highlight ? <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_12px_#c9f24d]" /> : null}
                  </div>
                  <p className="mt-4 font-display text-xl font-semibold text-paper">{kpi.label}</p>
                  <p
                    className={cn(
                      'mt-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold tracking-tight',
                      kpi.highlight ? 'text-lime' : 'text-paper',
                    )}
                  >
                    <AnimatedNumber
                      value={kpi.value}
                      format={kpi.format === 'brl-plus' ? formatBrlPlus : formatBrl}
                    />
                  </p>
                  <p className="mt-3 border-t border-white/10 pt-3 text-xs leading-relaxed text-muted">
                    {kpi.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <div className="h-full rounded-[24px] border border-white/10 bg-forest/60 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Fluxo mensal
                </p>
                <h3 className="mt-2 font-display text-xl font-bold">Entradas vs. saídas</h3>

                <div className="mt-7 space-y-6">
                  {[
                    { label: 'Receita', value: 64000, width: '100%', color: 'bg-lime', text: 'R$ 64.000' },
                    { label: 'Custo', value: 50000, width: '78%', color: 'bg-amber', text: 'R$ 50.000' },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                        <span>{bar.label}</span>
                        <span className="text-paper">{bar.text}</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          initial={reduceMotion ? false : { width: 0 }}
                          whileInView={{ width: bar.width }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                          className={cn('h-full rounded-full', bar.color)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex items-center justify-between rounded-2xl border border-lime/20 bg-lime/[0.06] px-4 py-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-lime">
                    Sobra operacional
                  </span>
                  <span className="font-display text-lg font-bold text-lime">R$ 14.000</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-7">
              <div className="h-full rounded-[24px] border border-white/10 bg-forest/60 p-6">
                <div className="flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      Composição dos custos
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold">Para onde vai cada R$</h3>
                  </div>
                  <span className="font-mono text-xs text-muted">total R$ 50.000/mês</span>
                </div>

                <div className="mt-7 flex h-4 overflow-hidden rounded-full bg-white/5">
                  {financials.costBreakdown.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={reduceMotion ? false : { width: 0 }}
                      whileInView={{ width: `${item.percent}%` }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.8, delay: index * 0.08 }}
                      style={{ backgroundColor: item.color }}
                      title={`${item.label}: ${item.percent}%`}
                    />
                  ))}
                </div>

                <div className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                  {financials.costBreakdown.map((item) => (
                    <div key={item.label} className="flex gap-3">
                      <span
                        className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="text-sm font-semibold text-paper">{item.label}</span>
                          <span className="font-mono text-[10px] text-muted">{item.percent}%</span>
                        </div>
                        <p className="mt-0.5 text-xs text-muted">
                          {item.value} · {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-white/10 bg-ink/50 p-4">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    <span>Payback estimado</span>
                    <span className="text-lime">mês 10,4</span>
                  </div>
                  <div className="relative mt-4 h-1.5 rounded-full bg-white/10">
                    {[0, 25, 50, 75, 100].map((tick) => (
                      <span
                        key={tick}
                        className="absolute top-1/2 h-2.5 w-px -translate-y-1/2 bg-white/20"
                        style={{ left: `${tick}%` }}
                      />
                    ))}
                    <span className="absolute -top-1 h-3.5 w-1 rounded-full bg-lime shadow-[0_0_12px_#c9f24d]" style={{ left: '86.7%' }} />
                  </div>
                  <div className="mt-2 flex justify-between font-mono text-[9px] text-muted/70">
                    <span>M01</span><span>M04</span><span>M08</span><span>M12</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {financials.annual.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.06}>
                <div className="h-full rounded-[20px] border border-white/10 bg-white/[0.03] p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{item.label}</p>
                  <p className="mt-3 font-display text-2xl font-bold text-paper">{item.value}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/70">
            <ArrowUpRight className="h-3 w-3 text-lime" /> Projeção de 12 meses · operação piloto
          </div>
        </div>
      </div>
    </section>
  )
}
