import {
  Award,
  BookOpen,
  Briefcase,
  Bus,
  CalendarDays,
  CircleCheck,
  ClipboardList,
  Clock,
  GraduationCap,
  HandHeart,
  Heart,
  Hospital,
  MapPin,
  Phone,
  Repeat,
  Star,
  Stethoscope,
  Syringe,
  Timer,
  Zap,
  Flame,
  type LucideIcon,
} from 'lucide-react';

/**
 * Ponte entre o arquivo de conteúdo (que guarda apenas nomes) e os
 * componentes de ícone, mantendo `siteContent.ts` livre de JSX.
 */
export const iconMap = {
  award: Award,
  'book-open': BookOpen,
  briefcase: Briefcase,
  bus: Bus,
  'calendar-days': CalendarDays,
  'circle-check': CircleCheck,
  'clipboard-list': ClipboardList,
  clock: Clock,
  flame: Flame,
  'graduation-cap': GraduationCap,
  'hand-heart': HandHeart,
  heart: Heart,
  hospital: Hospital,
  'map-pin': MapPin,
  phone: Phone,
  repeat: Repeat,
  star: Star,
  stethoscope: Stethoscope,
  syringe: Syringe,
  timer: Timer,
  zap: Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

export function getIcon(name: IconName): LucideIcon {
  return iconMap[name];
}
