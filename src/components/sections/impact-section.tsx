import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { site } from "@/config/site";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { EASE_OUT } from "@/lib/motion";

export function ImpactSection() {
  const { impact } = site;
  const reduced = useReducedMotion();

  return (
    <SectionShell id="impacto">
      <div className="pointer-events-none absolute -right-40 top-10 size-[520px] rounded-full bg-mint-500/10 blur-[120px]" aria-hidden="true" />
      <SectionHeading
        eyebrow={impact.eyebrow}
        title={impact.title}
        description={impact.description}
        titleId="impacto-title"
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {impact.kpis.map((kpi, index) => (
          <Reveal key={kpi.label} delay={index * 0.08}>
            <article className="group flex h-full flex-col justify-between rounded-3xl border border-border/70 bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-lime-300/40">
              <div className="flex items-start justify-between">
                <span className="font-editorial text-4xl font-semibold tracking-tight text-lime-300">{kpi.value}</span>
                <ArrowUpRight className="size-4 text-mint-200/30 transition-colors group-hover:text-lime-300" aria-hidden="true" />
              </div>
              <div className="mt-9">
                <h3 className="text-sm font-medium text-cream/90">{kpi.label}</h3>
                <p className="mt-1 text-xs text-mint-200/70">{kpi.delta}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div className="h-full rounded-3xl border border-border/70 bg-card/60 p-7 sm:p-9">
            <h3 className="font-editorial text-2xl font-medium">Metas em andamento</h3>
            <ul className="mt-8 space-y-7">
              {impact.goals.map((goal, index) => (
                <li key={goal.label}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm text-mint-100/85">{goal.label}</span>
                    <span className="font-editorial text-lg text-lime-300">
                      {goal.current}
                      <span className="text-sm text-mint-200/70">/{goal.target}{goal.unit}</span>
                    </span>
                  </div>
                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-foreground/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-mint-400 to-lime-300"
                      initial={reduced ? false : { width: 0 }}
                      whileInView={{ width: `${(goal.current / goal.target) * 100}%` }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 1.1, delay: index * 0.15, ease: EASE_OUT }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="flex h-full flex-col justify-between gap-6 rounded-3xl bg-gradient-to-br from-forest-700 to-forest-950 p-8 sm:p-10">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lime-300/80">
              Compromisso 2030
            </span>
            <p className="text-balance font-editorial text-2xl font-medium leading-snug text-cream sm:text-3xl">
              {impact.statement}
            </p>
            <a
              href="#faq"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-lime-300/30 px-5 py-2.5 text-sm font-semibold text-lime-200 transition-colors hover:bg-lime-300/10"
            >
              Entenda a metodologia
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
