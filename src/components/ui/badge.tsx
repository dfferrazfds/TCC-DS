import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors",
  {
    variants: {
      variant: {
        default: "border-lime-300/30 bg-lime-300/10 text-lime-200",
        mint: "border-mint-400/30 bg-mint-400/10 text-mint-300",
        forest: "border-forest-900/15 bg-forest-900/5 text-forest-700",
        outline: "border-border/70 text-muted-foreground",
        solid: "border-transparent bg-lime-300 text-forest-950",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
