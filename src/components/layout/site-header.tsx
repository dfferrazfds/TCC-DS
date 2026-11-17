import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Compass, Menu, Route, X } from "lucide-react";

import { site, type SectionId } from "@/config/site";
import { Button } from "@/components/ui/button";
import { goToSection } from "@/lib/scroll-to-section";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  activeId: SectionId;
  onToggleTour: () => void;
  isTourPlaying: boolean;
}

export function SiteHeader({ activeId, onToggleTour, isTourPlaying }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [activeId]);

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    event.preventDefault();
    setMenuOpen(false);
    goToSection(id, !reduced);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-mint-100/10 bg-forest-950/85 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="container flex h-20 items-center justify-between gap-6">
        <a
          href="#inicio"
          onClick={(event) => navigate(event, "inicio")}
          className="group flex items-center gap-2.5"
          aria-label={`${site.brand.name} — início`}
        >
          <span className="relative grid size-10 place-items-center rounded-xl bg-lime-300 text-forest-950 transition-transform duration-300 group-hover:rotate-6">
            <Route className="size-5" aria-hidden="true" />
          </span>
          <span className="font-editorial text-xl font-semibold tracking-tight text-cream">
            <span className="text-lime-300">{site.brand.prefix}</span>
            {site.brand.suffix}
          </span>
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
          {site.sections.slice(1, 9).map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(event) => navigate(event, section.id)}
              aria-current={activeId === section.id ? "location" : undefined}
              className={cn(
                "relative rounded-full px-3 py-2 text-xs font-medium transition-colors",
                activeId === section.id ? "text-lime-300" : "text-mint-100/60 hover:text-cream",
              )}
            >
              {section.navLabel}
              {activeId === section.id ? (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-3 -bottom-0.5 h-px bg-lime-300"
                  transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 30 }}
                />
              ) : null}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant={isTourPlaying ? "default" : "outline"}
            size="sm"
            onClick={onToggleTour}
            className="hidden sm:inline-flex"
            aria-pressed={isTourPlaying}
          >
            <Compass />
            {isTourPlaying ? "Pausar tour" : site.tour.label}
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={`mailto:${site.brand.email}`}>
              Falar com a gente
              <ArrowUpRight />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={menuOpen ? site.a11y.closeMenu : site.a11y.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            aria-label="Navegação móvel"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden border-t border-mint-100/10 bg-forest-950/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container grid gap-1 py-5">
              {site.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(event) => navigate(event, section.id)}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      activeId === section.id ? "bg-lime-300/10 text-lime-300" : "text-mint-100/70 hover:bg-foreground/5",
                    )}
                  >
                    {section.navLabel}
                  </a>
                </li>
              ))}
              <li className="mt-2 grid grid-cols-2 gap-2 px-1">
                <Button variant="outline" size="sm" onClick={onToggleTour}>
                  <Compass />
                  {site.tour.label}
                </Button>
                <Button asChild size="sm">
                  <a href={`mailto:${site.brand.email}`} onClick={() => setMenuOpen(false)}>
                    Contato
                  </a>
                </Button>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
