import { ArrowRight, Check } from "lucide-react";

import { site } from "@/config/site";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Icon } from "@/components/shared/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SolutionSection() {
  const { solution } = site;

  return (
    <SectionShell id="solucao" light>
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading
          eyebrow={solution.eyebrow}
          title={solution.title}
          description={solution.description}
          titleId="solucao-title"
          light
        />
        <Reveal delay={0.15}>
          <Button asChild variant="forest" size="lg">
            <a href={`mailto:${site.brand.email}`}>
              Aplicar o método
              <ArrowRight />
            </a>
          </Button>
        </Reveal>
      </div>

      <ol className="relative mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div
          className="pointer-events-none absolute left-[12%] right-[12%] top-9 hidden h-px bg-gradient-to-r from-forest-700/10 via-forest-700/40 to-forest-700/10 lg:block"
          aria-hidden="true"
        />
        {solution.steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.11} as="li">
            <article className="group relative flex h-full flex-col rounded-3xl border border-forest-900/10 bg-white/70 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-lift">
              <div className="flex items-center justify-between">
                <span className="relative z-10 grid size-[4.5rem] place-items-center rounded-2xl bg-forest-900 text-lime-300 shadow-lg transition-transform duration-300 group-hover:rotate-6">
                  <Icon name={step.icon} className="size-6" />
                </span>
                <span className="font-editorial text-4xl text-forest-900/10">0{index + 1}</span>
              </div>
              <Badge variant="outline" className="mt-7 w-fit border-forest-900/15 text-forest-700">
                {step.duration}
              </Badge>
              <h3 className="mt-4 font-editorial text-xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">{step.description}</p>
            </article>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={0.2}>
        <div className="mt-8 flex flex-col gap-6 rounded-3xl bg-forest-950 p-7 text-cream sm:p-9 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="font-editorial text-2xl font-medium">O que você recebe ao final</h3>
            <p className="mt-2 text-sm text-mint-100/60">Entregáveis concretos, prontos para virar decisão.</p>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {solution.deliverables.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-mint-100/85">
                <Check className="size-4 shrink-0 text-lime-300" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </SectionShell>
  );
}
