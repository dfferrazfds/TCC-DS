import { Reveal } from './Reveal'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description: string
  index: string
  className?: string
  action?: React.ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  index,
  className,
  action,
}: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between', className)}>
      <Reveal className="max-w-3xl">
        <div className="mb-4 flex items-center gap-3">
          <span className="font-mono text-xs text-lime/70">{index}</span>
          <span className="h-px w-10 bg-lime/40" />
          <Badge variant="outline">{eyebrow}</Badge>
        </div>
        <h2 className="text-balance text-3xl font-bold leading-[1.05] sm:text-4xl lg:text-[3.4rem]">
          {title}
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{description}</p>
      </Reveal>
      {action ? <Reveal delay={0.1}>{action}</Reveal> : null}
    </div>
  )
}
