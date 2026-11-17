import { ArrowUpRight } from "lucide-react";

import { site } from "@/config/site";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FaqSection() {
  const { faq } = site;

  return (
    <SectionShell id="faq" light>
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow={faq.eyebrow}
            title={faq.title}
            description={faq.description}
            titleId="faq-title"
            light
          />
          <Reveal delay={0.2}>
            <a
              href={`mailto:${site.brand.email}`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-forest-700 underline-offset-4 hover:underline"
            >
              {faq.fallback}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible defaultValue="faq-0" className="w-full">
            {faq.items.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </SectionShell>
  );
}
