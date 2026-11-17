import { Leaf } from 'lucide-react'
import { siteConfig } from '@/config/site'

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {siteConfig.ticker.map((text) => (
        <span key={text} className="flex items-center gap-6 px-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/80">{text}</span>
          <Leaf className="h-3.5 w-3.5 text-lime/70" />
        </span>
      ))}
    </div>
  )
}

export function Ticker() {
  return (
    <div className="relative border-y border-lime/15 bg-lime/[0.04] py-4">
      <div className="mask-fade-x flex w-full overflow-hidden">
        <div className="flex animate-marquee">
          <Track />
          <Track hidden />
        </div>
      </div>
    </div>
  )
}
