import type { SectionId } from "@/config/site";

const HEADER_HEIGHT = 80;

/**
 * Navega para uma seção de forma confiável em qualquer navegador.
 *
 * O `scroll-behavior: smooth` do CSS pode impedir o scroll disparado por
 * âncoras em alguns navegadores móveis (o hash muda, mas a página não rola).
 * Por isso o scroll é feito via JS, com um fallback para `instant` caso o
 * navegador não execute a animação suave.
 */
export function goToSection(id: SectionId, smooth = true) {
  const target = document.getElementById(id);
  if (!target) return;

  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT);
  const startY = window.scrollY;

  window.scrollTo({ top, behavior: smooth ? "smooth" : "instant" });

  if (window.location.hash !== `#${id}`) {
    window.history.pushState(null, "", `#${id}`);
  }

  if (smooth) {
    window.setTimeout(() => {
      const stuck = Math.abs(window.scrollY - startY) < 4 && Math.abs(window.scrollY - top) > 4;
      if (stuck) window.scrollTo({ top, behavior: "instant" });
    }, 400);
  }
}
