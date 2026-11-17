import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em]',
  {
    variants: {
      variant: {
        default: 'border-lime/25 bg-lime/10 text-lime',
        mint: 'border-mint/25 bg-mint/10 text-mint',
        amber: 'border-amber/25 bg-amber/10 text-amber',
        outline: 'border-white/15 bg-white/5 text-muted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
