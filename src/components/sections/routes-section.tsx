import { useState } from "react";
import { ArrowUpRight, Navigation2 } from "lucide-react";

import { site } from "@/config/site";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { RouteMap } from "@/components/visuals/route-map";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function RoutesSection() {
  const { routes } = site;
  const [selected, setSelected] = useState(0);
  const activeRoute = routes.items[selected] ?? routes.items[0];

  return (
    <SectionShell id="rotas">
      <SectionHeading
        eyebrow={routes.eyebrow}
        title={routes.title}
        description={routes.description}
        titleId="rotas-title"
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="flex flex-col gap-3">
          {routes.items.map((route, index) => {
            const isActive = selected === index;
            return (
              <Reveal key={route.id} delay={index * 0.08}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelected(index)}
                  className={cn(
                    "group w-full rounded-3xl border p-5 text-left transition-all duration-300",
                    isActive
                      ? "border-lime-300/50 bg-lime-300/[0.07] shadow-glow"
                      : "border-border/70 bg-card/50 hover:border-mint-300/30 hover:bg-card",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={cn("font-editorial text-lg font-semibold", isActive ? "text-lime-200" : "text-cream")}>
                          {route.name}
                        </span>
                        <Badge variant={isActive ? "solid" : "outline"}>{route.status}</Badge>
                      </div>
                      <p className="mt-2 flex items-center gap-2 text-sm text-mint-100/65">
                        {route.origin}
                        <span className="h-px w-6 bg-mint-300/40" aria-hidden="true" />
                        {route.destination}
                      </p>
                    </div>
                    <ArrowUpRight
                      className={cn(
                        "size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                        isActive ? "text-lime-300" : "text-mint-200/60",
                      )}
                      aria-hidden="true"
                    />
                  </div>

                  <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-foreground/10 pt-4">
                    <div>
                      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Distância</dt>
                      <dd className="mt-1 text-sm font-semibold text-cream">{route.distance}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">CO₂</dt>
                      <dd className="mt-1 text-sm font-semibold text-lime-300">{route.co2}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Tempo</dt>
                      <dd className="mt-1 text-sm font-semibold text-cream">{route.time}</dd>
                    </div>
                  </dl>
                </button>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="sticky top-28 rounded-[2rem] border border-border/70 bg-forest-950/60 p-4 shadow-lift backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-mint-200/70">
                <Navigation2 className="size-4 text-lime-300" aria-hidden="true" />
                {activeRoute?.mode}
              </span>
              <span className="text-xs text-mint-200/65">{routes.mapHint}</span>
            </div>
            <RouteMap activeStopIndex={activeRoute?.stopIndex} />
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
