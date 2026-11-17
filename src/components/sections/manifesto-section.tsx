import { Quote } from "lucide-react";

import { site } from "@/config/site";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Icon } from "@/components/shared/icon";

export function ManifestoSection() {
  const { manifesto } = site;

  return (
    <SectionShell id="manifesto" light>
      <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow={manifesto.eyebrow} title={manifesto.title} titleId="manifesto-title" light />
          <div className="mt-9 space-y-5 text-pretty text-base leading-[1.8] text-ink/70">
            {manifesto.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph} delay={0.05 * index}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <blockquote className="relative mt-12 rounded-3xl bg-forest-950 p-8 text-cream sm:p-10">
              <Quote className="absolute right-7 top-7 size-8 text-lime-300/40" aria-hidden="true" />
              <p className="max-w-lg font-editorial text-2xl font-medium leading-snug sm:text-3xl">
                “{manifesto.quote}”
              </p>
              <footer className="mt-6 text-xs uppercase tracking-[0.16em] text-mint-200/60">
                {manifesto.quoteAuthor}
              </footer>
            </blockquote>
          </Reveal>
        </div>

        <div className="flex flex-col gap-4">
          {manifesto.principles.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 0.1} x={24}>
              <article className="group flex gap-5 rounded-3xl border border-forest-900/10 bg-white/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-forest-700/30 hover:shadow-lift">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-forest-900 text-lime-300 transition-transform duration-300 group-hover:rotate-6">
                  <Icon name={principle.icon} className="size-5" />
                </span>
                <div>
                  <h3 className="font-editorial text-xl font-semibold text-ink">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{principle.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
