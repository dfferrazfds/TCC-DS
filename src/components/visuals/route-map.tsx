import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { Truck } from "lucide-react";

import { site } from "@/config/site";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

const ROUTE_PATH = "M 72 332 C 145 332 152 214 232 214 S 342 300 404 222 S 520 112 574 86";

interface Point {
  x: number;
  y: number;
}

interface RouteMapProps {
  activeStopIndex?: number;
  showCards?: boolean;
  className?: string;
}

export function RouteMap({ activeStopIndex, showCards = false, className }: RouteMapProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [geometry, setGeometry] = useState<{ length: number; points: Point[] }>({ length: 0, points: [] });
  const progress = useMotionValue(0.01);
  const reduced = useReducedMotion();

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    setGeometry({
      length,
      points: site.hero.mapStops.map((stop) => {
        const point = path.getPointAtLength(length * stop.progress);
        return { x: point.x, y: point.y };
      }),
    });
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduced || geometry.length === 0) return;
    progress.set((progress.get() + delta * 0.000035) % 1);
  });

  const vehicleX = useTransform(progress, (value) => {
    const path = pathRef.current;
    if (!path || geometry.length === 0) return 72;
    return path.getPointAtLength(value * geometry.length).x;
  });
  const vehicleY = useTransform(progress, (value) => {
    const path = pathRef.current;
    if (!path || geometry.length === 0) return 332;
    return path.getPointAtLength(value * geometry.length).y;
  });

  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-8 rounded-full bg-mint-500/10 blur-3xl" aria-hidden="true" />

      <svg
        viewBox="0 0 640 420"
        className="relative w-full"
        role="img"
        aria-label={site.a11y.mapDescription}
      >
        <defs>
          <linearGradient id="route-gradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#43cf8d" />
            <stop offset="55%" stopColor="#a4edc8" />
            <stop offset="100%" stopColor="#d7ff4f" />
          </linearGradient>
          <radialGradient id="stop-glow">
            <stop offset="0%" stopColor="#d7ff4f" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#d7ff4f" stopOpacity="0" />
          </radialGradient>
          <pattern id="dot-grid" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#a4edc8" opacity="0.14" />
          </pattern>
        </defs>

        <rect width="640" height="420" fill="url(#dot-grid)" opacity="0.65" aria-hidden="true" />

        <g aria-hidden="true" fill="none" stroke="#a4edc8" strokeWidth="1" opacity="0.1">
          <path d="M -20 140 C 120 30 240 240 380 120 S 600 20 680 90" />
          <path d="M -20 200 C 120 90 240 300 380 180 S 600 80 680 150" />
          <path d="M -20 380 C 120 270 240 480 380 360 S 600 260 680 330" />
          <ellipse cx="330" cy="210" rx="270" ry="160" strokeDasharray="4 8" />
        </g>

        <path
          ref={pathRef}
          d={ROUTE_PATH}
          fill="none"
          stroke="#a4edc8"
          strokeOpacity="0.18"
          strokeWidth="12"
          strokeLinecap="round"
          aria-hidden="true"
        />
        <path
          d={ROUTE_PATH}
          fill="none"
          stroke="#d7ff4f"
          strokeOpacity="0.14"
          strokeWidth="2"
          strokeDasharray="1 9"
          strokeLinecap="round"
          aria-hidden="true"
        />
        <motion.path
          d={ROUTE_PATH}
          fill="none"
          stroke="url(#route-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ pathLength: progress }}
          aria-hidden="true"
        />

        {geometry.points.map((point, index) => {
          const stop = site.hero.mapStops[index];
          const isActive = activeStopIndex === index;
          if (!stop) return null;
          return (
            <g key={stop.label}>
              <circle cx={point.x} cy={point.y} r={isActive ? 34 : 22} fill="url(#stop-glow)" />
              {!reduced ? (
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r="9"
                  fill="none"
                  stroke={isActive ? "#d7ff4f" : "#5ee2a0"}
                  strokeWidth="1.5"
                  animate={{ r: [9, 22], opacity: [0.75, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.35, ease: "easeOut" }}
                />
              ) : null}
              <circle
                cx={point.x}
                cy={point.y}
                r={isActive ? 8 : 6}
                fill={isActive ? "#d7ff4f" : "#081a13"}
                stroke={isActive ? "#081a13" : "#5ee2a0"}
                strokeWidth="3"
              />
              <text
                x={point.x}
                y={point.y - (isActive ? 22 : 18)}
                textAnchor="middle"
                fill={isActive ? "#d7ff4f" : "#d4f9e5"}
                fontSize="12"
                fontWeight="600"
              >
                {stop.label}
              </text>
              {isActive ? (
                <text x={point.x} y={point.y + 27} textAnchor="middle" fill="#a4edc8" fontSize="10">
                  {stop.detail}
                </text>
              ) : null}
            </g>
          );
        })}

        <motion.g style={{ x: vehicleX, y: vehicleY }} aria-hidden="true">
          <circle r="17" fill="#d7ff4f" opacity="0.2" />
          <circle r="11" fill="#d7ff4f" />
          <Truck x={-8} y={-8} width={16} height={16} color="#081a13" strokeWidth={2.5} />
        </motion.g>
      </svg>

      {showCards ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {site.hero.floatingCards.map((card) => (
            <motion.div
              key={card.label}
              className={cn(
                "absolute flex items-center gap-3 rounded-2xl border border-lime-300/20 bg-forest-900/85 px-4 py-3 shadow-lift backdrop-blur-md",
                card.className,
              )}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: [0, -9, 0] }}
              transition={
                reduced
                  ? { duration: 0.3 }
                  : { opacity: { duration: 0.6, delay: card.delay }, scale: { duration: 0.6, delay: card.delay }, y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: card.delay } }
              }
            >
              <span className="grid size-9 place-items-center rounded-xl bg-lime-300/15 text-lime-300">
                <Icon name={card.icon} className="size-4" />
              </span>
              <span className="flex flex-col">
                <strong className="font-editorial text-base leading-tight text-lime-200">{card.value}</strong>
                <span className="text-[11px] text-mint-100/60">{card.label}</span>
              </span>
            </motion.div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
