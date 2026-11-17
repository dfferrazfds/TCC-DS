import { ArrowUp, Leaf } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { Button } from './ui/button'
import { Reveal } from './Reveal'

export function Footer() {
  const { footer } = siteConfig

  return (
    <footer className="relative overflow-hidden border-t border-white/10 pt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-lime/10 blur-[120px]" />
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-8 rounded-[32px] border border-lime/20 bg-lime/[0.05] p-8 sm:p-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">Próximo passo</p>
              <h2 className="text-balance mt-4 text-3xl font-bold leading-tight sm:text-5xl">
                {footer.ctaTitle}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{footer.ctaDescription}</p>
            </div>
            <Button asChild size="lg">
              <a href="#inicio">
                {footer.ctaLabel} <ArrowUp className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-lime/25 bg-lime/10">
              <Leaf className="h-4 w-4 text-lime" />
            </span>
            <div>
              <p className="font-display text-sm font-bold">{siteConfig.name}</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                {siteConfig.location}
              </p>
            </div>
          </div>
          <p className="max-w-md font-mono text-[10px] uppercase tracking-[0.12em] text-muted/70">
            {footer.note}
          </p>
          <div className="flex gap-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            {siteConfig.nav.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-lime">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
