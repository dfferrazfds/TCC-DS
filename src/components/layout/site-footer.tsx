import { ArrowUp, Route } from "lucide-react";

import { site } from "@/config/site";
import { Icon } from "@/components/shared/icon";

export function SiteFooter() {
  const { footer, brand } = site;

  return (
    <footer className="relative border-t border-mint-100/10 bg-forest-950 px-5 pb-10 pt-16 sm:px-8">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#inicio" className="inline-flex items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-xl bg-lime-300 text-forest-950">
                <Route className="size-5" aria-hidden="true" />
              </span>
              <span className="font-editorial text-xl font-semibold text-cream">
                <span className="text-lime-300">{brand.prefix}</span>
                {brand.suffix}
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mint-100/70">{footer.description}</p>
            <p className="mt-6 text-xs uppercase tracking-[0.16em] text-mint-200/70">{footer.newsletterNote}</p>
            <a
              href={`mailto:${brand.email}`}
              className="mt-2 inline-block font-editorial text-lg text-lime-300 transition-colors hover:text-lime-200"
            >
              {brand.email}
            </a>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-200/70">{column.title}</h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-mint-100/80 transition-colors hover:text-lime-300">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-mint-100/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-mint-100/65">{footer.copyright}</p>
          <div className="flex items-center gap-4">
            {footer.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="grid size-9 place-items-center rounded-full border border-mint-100/15 text-mint-100/75 transition-colors hover:border-lime-300/50 hover:text-lime-300"
              >
                <Icon name={social.icon} className="size-4" />
              </a>
            ))}
            <a
              href="#inicio"
              className="ml-2 inline-flex items-center gap-2 text-xs font-semibold text-mint-100/75 transition-colors hover:text-lime-300"
            >
              {footer.backToTop}
              <ArrowUp className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
