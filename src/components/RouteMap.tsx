import { motion, useReducedMotion } from 'framer-motion'
import { Leaf, Navigation2, Timer } from 'lucide-react'

const routes = [
  'M60 320 C142 286 148 190 245 205 S372 126 458 92',
  'M60 320 C118 366 214 356 272 300 S390 258 462 286',
  'M245 205 C264 266 212 312 150 352',
]

export function RouteMap() {
  const reduceMotion = useReducedMotion()
  const repeat = reduceMotion ? 0 : Infinity

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] border border-lime/20 bg-[#081710] shadow-panel sm:aspect-[5/4]">
      <div className="absolute inset-0 bg-grid-fade bg-grid opacity-40" />
      <div className="absolute inset-0 contour-bg opacity-70" />
      <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-lime/20 blur-[90px]" />
      <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-mint/15 blur-[90px]" />

      <div className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full border border-lime/20 bg-ink/70 px-3 py-1.5 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-lime">Rota viva</span>
      </div>

      <svg
        viewBox="0 0 520 420"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Mapa abstrato de rotas elétricas conectando o hub de Guarulhos aos bairros"
      >
        <defs>
          <linearGradient id="routeGradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#7de0a8" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#c9f24d" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f4b942" stopOpacity="0.65" />
          </linearGradient>
          <filter id="dotGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g opacity="0.35" stroke="#7de0a8" strokeWidth="0.6" fill="none">
          <path d="M20 90 H500 M20 160 H500 M20 230 H500 M20 300 H500 M20 370 H500" />
          <path d="M80 20 V400 M170 20 V400 M260 20 V400 M350 20 V400 M440 20 V400" />
        </g>

        <path d="M0 392 C120 350 180 410 300 370 S450 340 520 372" stroke="#7de0a8" strokeOpacity="0.18" strokeWidth="16" fill="none" />

        {routes.map((path, index) => (
          <motion.path
            key={path}
            d={path}
            pathLength={1}
            strokeDasharray={1}
            stroke="url(#routeGradient)"
            strokeWidth={index === 0 ? 2.4 : 1.6}
            strokeLinecap="round"
            fill="none"
            initial={reduceMotion ? false : { strokeDashoffset: 1, opacity: 0 }}
            animate={{ strokeDashoffset: 0, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.25 + index * 0.18, ease: 'easeOut' }}
          />
        ))}

        {[
          { cx: 60, cy: 320, label: 'HUB' },
          { cx: 245, cy: 205, label: 'CENTRO' },
          { cx: 458, cy: 92, label: 'ZONA LESTE' },
          { cx: 462, cy: 286, label: 'Bairro' },
          { cx: 150, cy: 352, label: 'Bairro' },
        ].map((node) => (
          <g key={node.label + node.cx}>
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="10"
              fill="none"
              stroke="#c9f24d"
              strokeOpacity="0.5"
              initial={{ r: 10, opacity: 0.55 }}
              animate={reduceMotion ? {} : { r: [10, 26], opacity: [0.55, 0] }}
              transition={{ duration: 2.4, repeat, ease: 'easeOut' }}
            />
            <circle cx={node.cx} cy={node.cy} r="6" fill="#c9f24d" filter="url(#dotGlow)" />
            <circle cx={node.cx} cy={node.cy} r="2.2" fill="#07130f" />
          </g>
        ))}

        <motion.circle
          cx={60}
          cy={320}
          r="4.5"
          fill="#f4b942"
          filter="url(#dotGlow)"
          initial={{ cx: 60, cy: 320 }}
          animate={reduceMotion ? {} : { cx: [60, 145, 245, 360, 458], cy: [320, 250, 205, 150, 92] }}
          transition={{ duration: 7, repeat, ease: 'linear', delay: 0.4 }}
        />
        <motion.circle
          cx={60}
          cy={320}
          r="3.5"
          fill="#c9f24d"
          filter="url(#dotGlow)"
          initial={{ cx: 60, cy: 320 }}
          animate={reduceMotion ? {} : { cx: [60, 160, 272, 380, 462], cy: [320, 350, 300, 265, 286] }}
          transition={{ duration: 6.4, repeat, ease: 'linear', delay: 1.6 }}
        />
        <motion.circle
          cx={245}
          cy={205}
          r="3"
          fill="#7de0a8"
          filter="url(#dotGlow)"
          initial={{ cx: 245, cy: 205 }}
          animate={reduceMotion ? {} : { cx: [245, 228, 188, 150], cy: [205, 260, 315, 352] }}
          transition={{ duration: 5.2, repeat, ease: 'linear', delay: 0.9 }}
        />

        <text x="70" y="342" fill="#9db3a5" fontSize="9" fontFamily="JetBrains Mono">HUB / GUARULHOS</text>
        <text x="252" y="192" fill="#9db3a5" fontSize="9" fontFamily="JetBrains Mono">CENTRO</text>
        <text x="398" y="84" fill="#9db3a5" fontSize="9" fontFamily="JetBrains Mono">ZONA LESTE</text>
      </svg>

      <div className="absolute right-4 top-16 z-20 hidden rounded-2xl border border-white/10 bg-ink/80 px-4 py-3 backdrop-blur-md sm:block">
        <div className="flex items-center gap-2 text-lime">
          <Leaf className="h-4 w-4" />
          <span className="font-display text-xl font-bold">0 g</span>
        </div>
        <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">CO₂ na operação</p>
      </div>

      <div className="absolute bottom-16 left-4 z-20 rounded-2xl border border-white/10 bg-ink/80 px-4 py-3 backdrop-blur-md sm:bottom-20">
        <div className="flex items-center gap-2 text-mint">
          <Timer className="h-4 w-4" />
          <span className="font-display text-xl font-bold">98%+</span>
        </div>
        <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">SLA de entrega</p>
      </div>

      <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
        <Navigation2 className="h-3.5 w-3.5 text-amber" />
        3 rotas ativas
      </div>
    </div>
  )
}
