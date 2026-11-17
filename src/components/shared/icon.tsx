import {
  Check,
  ChartNoAxesCombined,
  Clock3,
  Coins,
  Globe2,
  Instagram,
  Leaf,
  Linkedin,
  Mail,
  Radar,
  Route,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { IconKey } from "@/config/site";

const icons: Record<IconKey, LucideIcon> = {
  leaf: Leaf,
  clock: Clock3,
  coins: Coins,
  route: Route,
  radar: Radar,
  sparkles: Sparkles,
  truck: Truck,
  chart: ChartNoAxesCombined,
  shield: ShieldCheck,
  globe: Globe2,
  users: Users,
  mail: Mail,
  check: Check,
  linkedin: Linkedin,
  instagram: Instagram,
};

export function Icon({ name, className }: { name: IconKey; className?: string }) {
  const Component = icons[name] ?? Leaf;
  return <Component className={className} aria-hidden="true" />;
}
