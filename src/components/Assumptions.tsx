import { siteConfig } from '@/config/site'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'

export function Assumptions() {
  const { assumptions } = siteConfig

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              index="04"
              eyebrow={assumptions.eyebrow}
              title={assumptions.title}
              description={assumptions.description}
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="rounded-[28px] border border-white/10 bg-forest/60 px-6 py-2 sm:px-8">
              <Accordion type="single" collapsible defaultValue="item-0">
                {assumptions.items.map((item, index) => (
                  <AccordionItem key={item.title} value={`item-${index}`}>
                    <AccordionTrigger>
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-lime/70">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {item.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
