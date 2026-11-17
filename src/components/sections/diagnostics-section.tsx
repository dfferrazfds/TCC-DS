import { motion, useReducedMotion } from "framer-motion";

import { site } from "@/config/site";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { EASE_OUT } from "@/lib/motion";

export function DiagnosticsSection() {
  const { diagnostics } = site;
  const reduced = useReducedMotion();

  return (
    <SectionShell id="diagnostico">
      <SectionHeading
        eyebrow={diagnostics.eyebrow}
        title={diagnostics.title}
        description={diagnostics.description}
        titleId="diagnostico-title"
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {diagnostics.stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.1}>
            <article className="flex h-full flex-col justify-between rounded-3xl border border-border/70 bg-card/60 p-7 transition-colors hover:border-lime-300/40">
              <span className="font-editorial text-5xl font-semibold tracking-tight text-lime-300 sm:text-6xl">
                {stat.value}
              </span>
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-mint-200">
                  {stat.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stat.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <Reveal>
          <div className="h-full rounded-3xl border border-border/70 bg-card/60 p-7 sm:p-9">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-editorial text-xl font-semibold">Para onde vai cada quilômetro</h3>
              <Badge variant="outline">% dos km rodados</Badge>
            </div>
            <ul className="mt-9 space-y-6">
              {diagnostics.bars.map((bar, index) => (
                <li key={bar.label}>
                  <div className="mb-2 flex items-baseline justify-between gap-4 text-sm">
                    <span className="text-mint-100/85">{bar.label}</span>
                    <span className="font-medium text-lime-300/85">{bar.caption}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-foreground/10">
                    <motion.div
                      className={index === diagnostics.bars.length - 1 ? "h-full rounded-full bg-mint-300" : "h-full rounded-full bg-lime-300"}
                      initial={reduced ? false : { width: 0 }}
                      whileInView={{ width: `${bar.value}%` }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 1, delay: index * 0.12, ease: EASE_OUT }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="flex h-full flex-col justify-between gap-8 rounded-3xl border border-lime-300/20 bg-lime-300/[0.06] p-7 sm:p-9">
            <div>
              <span className="font-editorial text-6xl font-medium leading-none text-lime-300">?</span>
              <h3 className="mt-5 max-w-xs font-editorial text-2xl font-medium leading-snug text-cream">
                Quanto a sua operação desperdiça hoje?
              </h3>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-muted-foreground">{diagnostics.note}</p>
              <a
                href={`mailto:${site.brand.email}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-lime-300 transition-colors hover:text-lime-200"
              >
                Descobrir minha linha de base <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
