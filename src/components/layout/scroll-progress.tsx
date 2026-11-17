import { motion, useScroll, useSpring } from "framer-motion";

import { site } from "@/config/site";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-label={site.a11y.scrollProgress}
      role="progressbar"
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-lime-300 shadow-[0_0_14px_rgba(215,255,79,0.7)]"
      style={{ scaleX }}
    />
  );
}
