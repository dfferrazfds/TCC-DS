import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionShellProps {
  id: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  light?: boolean;
}

export function SectionShell({ id, children, className, innerClassName, light = false }: SectionShellProps) {
  return (
    <section
      id={id}
      data-section={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "relative scroll-mt-24 overflow-hidden px-5 py-24 sm:px-8 lg:py-32",
        light && "light-surface bg-cream text-ink",
        className,
      )}
    >
      <div className={cn("container relative z-10", innerClassName)}>{children}</div>
    </section>
  );
}
