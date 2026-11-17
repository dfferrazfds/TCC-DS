import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Leaf, Menu, X } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { Button } from './ui/button'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-ink/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-5 sm:px-8"
      >
        <a href="#inicio" className="group flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-lime/30 bg-lime/10">
            <Leaf className="h-5 w-5 text-lime transition-transform duration-300 group-hover:rotate-[-18deg] group-hover:scale-110" />
            <span className="absolute -bottom-3 -right-3 h-6 w-6 rounded-full bg-lime/20 blur-md" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm font-bold tracking-tight sm:text-base">ECOLOGÍSTICA</span>
            <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
              Guarulhos / piloto
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-lime"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button asChild size="sm" variant="outline">
            <a href="#numeros">
              Ver projeção <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-paper md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-5">
              {siteConfig.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 font-display text-lg text-paper hover:bg-white/5 hover:text-lime"
                >
                  {item.label}
                </a>
              ))}
              <Button asChild className="mt-3">
                <a href="#numeros" onClick={() => setOpen(false)}>
                  Ver projeção <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
