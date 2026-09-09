import { MapPin, Phone } from 'lucide-react';
import type { Unit } from '../data/siteContent';
import { RevealOnScroll } from './RevealOnScroll';

export type UnitCardProps = {
  unit: Unit;
  delay?: number;
};

export function UnitCard({ unit, delay = 0 }: UnitCardProps) {
  return (
    <RevealOnScroll
      as="article"
      delay={delay}
      className="rounded-large bg-card p-7 text-card-foreground shadow-elegant transition duration-200 hover:-translate-y-1 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-brand-foreground">
          <MapPin className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="text-xl font-black">{unit.name}</h3>
      </div>

      <address className="mt-5 space-y-1 text-sm not-italic text-muted-foreground">
        {unit.addressLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </address>

      <a
        href={unit.phoneHref}
        className="mt-5 inline-flex items-center gap-2 font-bold text-brand hover:underline"
        aria-label={`Ligar para a unidade ${unit.name}: ${unit.phoneLabel}`}
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        {unit.phoneLabel}
      </a>
    </RevealOnScroll>
  );
}
