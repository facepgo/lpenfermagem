import type { ScheduleOption } from '../data/siteContent';
import { getIcon } from './icons/iconMap';
import { RevealOnScroll } from './RevealOnScroll';

export type ScheduleCardProps = {
  option: ScheduleOption;
  delay?: number;
};

export function ScheduleCard({ option, delay = 0 }: ScheduleCardProps) {
  return (
    <RevealOnScroll
      delay={delay}
      className="rounded-large bg-card p-7 text-card-foreground shadow-elegant transition duration-200 hover:-translate-y-1 sm:p-9"
    >
      <h3 className="inline-block rounded-full bg-accent-strong px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">
        {option.badge}
      </h3>

      <ul className="mt-6 space-y-4 text-base">
        {option.items.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <li key={item.label} className="flex items-center gap-3">
              <Icon className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <span className="font-semibold">{item.label}</span>
            </li>
          );
        })}
      </ul>

      {option.note ? <p className="mt-4 text-sm text-muted-foreground">{option.note}</p> : null}
    </RevealOnScroll>
  );
}
