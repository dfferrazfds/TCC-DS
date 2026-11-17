import { ArrowUpRight } from "lucide-react";

import { site } from "@/config/site";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";

export function ProofSection() {
  const { proof } = site;

  return (
    <SectionShell id="casos" light>
      <SectionHeading
        eyebrow={proof.eyebrow}
        title={proof.title}
        description={proof.description}
        titleId="casos-title"
        light
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {proof.cases.map((item, index) => (
          <Reveal key={item.client} delay={index * 0.1}>
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-forest-900/10 bg-white/75 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
              <div className="relative overflow-hidden bg-forest-950 p-7 text-cream">
                <div className="pointer-events-none absolute -right-10 -top-16 size-44 rounded-full bg-mint-500/20 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mint-200/60">
                      {item.segment}
                    </span>
                    <h3 className="mt-2 font-editorial text-2xl font-semibold">{item.client}</h3>
                  </div>
                  <ArrowUpRight className="size-5 text-lime-300/70" aria-hidden="true" />
                </div>
                <div className="relative mt-10">
                  <span className="font-editorial text-5xl font-semibold text-lime-300">{item.metric}</span>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-mint-100/60">{item.metricLabel}</p>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <h4 className="font-editorial text-lg font-semibold leading-snug text-ink">{item.title}</h4>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">{item.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li key={tag}>
                      <Badge variant="outline" className="border-forest-900/15 text-forest-700">
                        {tag}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
