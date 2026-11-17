import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
  titleId?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  light = false,
  titleId,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      <Reveal>
        <Badge variant={light ? "forest" : "default"}>{eyebrow}</Badge>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          id={titleId}
          className="max-w-3xl text-balance font-editorial text-3xl font-medium leading-[1.12] tracking-[-0.02em] sm:text-4xl lg:text-[3.25rem]"
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
