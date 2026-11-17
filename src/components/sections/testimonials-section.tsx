import { Star } from "lucide-react";

import { site } from "@/config/site";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

export function TestimonialsSection() {
  const { testimonials } = site;

  return (
    <SectionShell id="vozes">
      <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} titleId="vozes-title" />

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {testimonials.quotes.map((quote, index) => (
          <Reveal key={quote.name} delay={index * 0.1}>
            <figure className="flex h-full flex-col rounded-3xl border border-border/70 bg-card/60 p-7 sm:p-8">
              <div className="flex gap-1 text-lime-300" role="img" aria-label="5 de 5 estrelas">
                {Array.from({ length: 5 }).map((_, star) => (
                  <Star key={star} className="size-3.5 fill-current" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-6 flex-1 text-pretty font-editorial text-lg leading-relaxed text-cream/90">
                “{quote.text}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-foreground/10 pt-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint-400/15 font-editorial text-sm font-semibold text-lime-300">
                  {quote.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-cream">{quote.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {quote.role} · {quote.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
