import { site } from "@/config/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { useTour } from "@/hooks/use-tour";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { TourController } from "@/components/layout/tour-controller";
import { HeroSection } from "@/components/sections/hero-section";
import { ManifestoSection } from "@/components/sections/manifesto-section";
import { DiagnosticsSection } from "@/components/sections/diagnostics-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { RoutesSection } from "@/components/sections/routes-section";
import { ImpactSection } from "@/components/sections/impact-section";
import { ProofSection } from "@/components/sections/proof-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqSection } from "@/components/sections/faq-section";

export default function App() {
  const activeId = useActiveSection();
  const tour = useTour();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lime-300 focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-forest-950"
      >
        {site.a11y.skipLink}
      </a>

      <ScrollProgress />
      <SiteHeader activeId={activeId} onToggleTour={tour.toggle} isTourPlaying={tour.isPlaying} />

      <main id="conteudo">
        <HeroSection />
        <ManifestoSection />
        <DiagnosticsSection />
        <SolutionSection />
        <RoutesSection />
        <ImpactSection />
        <ProofSection />
        <TestimonialsSection />
        <FaqSection />
      </main>

      <SiteFooter />
      <TourController
        activeIndex={tour.activeIndex}
        isPlaying={tour.isPlaying}
        onStart={tour.start}
        onStop={tour.stop}
        onToggle={tour.toggle}
        onNext={tour.next}
        onPrevious={tour.previous}
        onGoTo={tour.goTo}
      />
    </div>
  );
}
