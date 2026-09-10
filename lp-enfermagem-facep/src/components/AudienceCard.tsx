import type { Feature } from '../data/siteContent';
import { getIcon } from './icons/iconMap';
import { RevealOnScroll } from './RevealOnScroll';

export type AudienceCardProps = {
  card: Feature;
  delay?: number;
};

export function AudienceCard({ card, delay = 0 }: AudienceCardProps) {
  const Icon = getIcon(card.icon);

  return (
    <RevealOnScroll
      as="article"
      delay={delay}
      className="group relative rounded-card border-2 border-brand/15 bg-card p-6 transition duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-elegant sm:p-7"
    >
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-strong text-accent-foreground transition duration-200 group-hover:scale-110">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-xl font-bold">{card.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
    </RevealOnScroll>
  );
}
