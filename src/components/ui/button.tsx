import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
  {
    variants: {
      variant: {
        default:
          'bg-lime text-ink shadow-[0_12px_40px_-16px_rgba(201,242,77,0.8)] hover:bg-white hover:shadow-[0_18px_50px_-16px_rgba(201,242,77,0.9)] hover:-translate-y-0.5',
        outline:
          'border border-lime/30 bg-lime/5 text-paper hover:border-lime/70 hover:bg-lime/10 hover:-translate-y-0.5',
        ghost: 'text-muted hover:bg-white/5 hover:text-paper',
        solid: 'bg-paper text-ink hover:bg-lime hover:-translate-y-0.5',
      },
      size: {
        default: 'h-11 px-6',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-14 px-8 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
