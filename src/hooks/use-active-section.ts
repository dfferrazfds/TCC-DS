import { useEffect, useState } from "react";

import { tourSections, type SectionId } from "@/config/site";

export function useActiveSection() {
  const [activeId, setActiveId] = useState<SectionId>(tourSections[0]?.id ?? "inicio");

  useEffect(() => {
    const elements = tourSections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id as SectionId);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.15, 0.4, 0.75] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return activeId;
}
