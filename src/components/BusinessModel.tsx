import { motion, useReducedMotion } from 'framer-motion'
import {
  Bike,
  Handshake,
  HeartHandshake,
  LayoutGrid,
  Play,
  Radio,
  Receipt,
  Route,
  Sparkles,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { siteConfig, type CanvasBlock } from '@/config/site'
import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const icons: Record<CanvasBlock['icon'], LucideIcon> = {
  Handshake,
  Route,
  Sparkles,
  HeartHandshake,
  Users,
  Bike,
  Radio,
  Wallet,
  Receipt,
}

const toneStyles: Record<CanvasBlock['tone'], string> = {
  clay: 'border-clay/25 bg-clay/[0.06] text-clay',
  mint: 'border-mint/25 bg-mint/[0.06] text-mint',
  lime: 'border-lime/25 bg-lime/[0.06] text-lime',
  amber: 'border-amber/25 bg-amber/[0.06] text-amber',
  sky: 'border-sky-400/25 bg-sky-400/[0.06] text-sky-300',
}

type BlockProps = {
  block: CanvasBlock
  activeStep: number | null
  feature?: boolean
  className?: string
}

function CanvasCard({ block, activeStep, feature = false, className }: BlockProps) {
  const Icon = icons[block.icon]
  const reduceMotion = useReducedMotion()
  const isActive = activeStep === block.step

  return (
    <motion.article
      data-tour-step={block.step}
      data-active={isActive}
      initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: (block.step % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -5 }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[26px] border p-5 transition-colors duration-300 sm:p-6',
        feature
          ? 'border-lime bg-lime text-ink'
          : cn('bg-forest/70 text-paper hover:border-white/25', toneStyles[block.tone]),
        block.size === 'tall' && 'min-h-[260px]',
        block.size === 'short' && 'min-h-[212px]',
        block.size === 'feature' && 'min-h-[352px]',
        block.size === 'note' && 'min-h-[224px] rounded-[22px]',
        className,
      )}
    >
      {!feature ? <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-30" /> : null}

      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl border',
            feature ? 'border-ink/20 bg-ink/10 text-ink' : 'border-white/15 bg-white/5',
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={cn(
            'font-mono text-[10px] font-semibold tracking-[0.2em]',
            feature ? 'text-ink/60' : 'text-muted/60',
          )}
        >
          {String(block.step).padStart(2, '0')}
        </span>
      </div>

      <div className="mt-auto pt-8">
        <h3
          className={cn(
            'font-mono text-[10px] font-semibold uppercase tracking-[0.18em]',
            feature ? 'text-ink/70' : 'text-paper/70',
          )}
        >
          {block.label}
        </h3>
        <p
          className={cn(
            'mt-3 font-display font-semibold leading-[1.15]',
            feature ? 'text-[clamp(1.5rem,2.6vw,2.15rem)]' : 'text-lg sm:text-xl',
          )}
        >
          {block.body}
        </p>
        <p
          className={cn(
            'mt-4 border-t pt-3 text-xs leading-relaxed',
            feature ? 'border-ink/20 text-ink/75' : 'border-white/10 text-muted',
          )}
        >
          {block.extra}
        </p>
      </div>
    </motion.article>
  )
}

type BusinessModelProps = {
  activeStep: number | null
  onPlay: () => void
  onShowAll: () => void
  playing: boolean
}

export function BusinessModel({ activeStep, onPlay, onShowAll, playing }: BusinessModelProps) {
  const byStep = (step: number) => siteConfig.canvas.find((block) => block.step === step)!

  return (
    <section id="modelo" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="Business model canvas"
          title="Um canvas que gera impacto, não só entregas."
          description="Nove blocos conectados: frota limpa, trabalho formal, tecnologia leve e clientes locais. Cada peça sustenta a próxima."
          action={
            <div className="flex flex-wrap gap-3">
              <Button onClick={onPlay} variant={playing ? 'outline' : 'default'}>
                <Play className="h-4 w-4" /> {playing ? 'Tour em andamento' : 'Reproduzir tour'}
              </Button>
              <Button onClick={onShowAll} variant="ghost">
                <LayoutGrid className="h-4 w-4" /> Mostrar tudo
              </Button>
            </div>
          }
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-3">
            <CanvasCard block={byStep(1)} activeStep={activeStep} />
            <CanvasCard block={byStep(6)} activeStep={activeStep} />
          </div>

          <div className="flex flex-col gap-4 lg:col-span-6">
            <CanvasCard block={byStep(3)} activeStep={activeStep} feature />
            <div className="grid gap-4 sm:grid-cols-2">
              <CanvasCard block={byStep(2)} activeStep={activeStep} />
              <CanvasCard block={byStep(4)} activeStep={activeStep} />
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-3">
            <CanvasCard block={byStep(5)} activeStep={activeStep} />
            <Reveal delay={0.1} className="flex-1">
              <div className="flex h-full min-h-[212px] flex-col justify-between rounded-[26px] border border-dashed border-lime/25 bg-lime/[0.03] p-6">
                <Badge variant="mint">Ciclo fechado</Badge>
                <p className="font-display text-xl font-semibold leading-snug text-paper">
                  Receita volta para a frota, para a equipe e para o bairro.
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  Operação → receita → impacto
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:col-span-12">
            <CanvasCard block={byStep(7)} activeStep={activeStep} />
            <CanvasCard block={byStep(8)} activeStep={activeStep} />
            <CanvasCard block={byStep(9)} activeStep={activeStep} />
          </div>
        </div>
      </div>
    </section>
  )
}
