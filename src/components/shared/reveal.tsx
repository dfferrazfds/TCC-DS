import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { EASE_OUT } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  as?: "div" | "li" | "article" | "span";
}

export function Reveal({ children, className, delay = 0, y = 28, x = 0, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const props = {
    className,
    initial: reduced ? false : { opacity: 0, y, x },
    whileInView: { opacity: 1, y: 0, x: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, delay, ease: EASE_OUT },
  };

  if (as === "li") return <motion.li {...props}>{children}</motion.li>;
  if (as === "article") return <motion.article {...props}>{children}</motion.article>;
  if (as === "span") return <motion.span {...props}>{children}</motion.span>;
  return <motion.div {...props}>{children}</motion.div>;
}
