import { CircleCheck, Flame, Zap } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { HeroImageCard } from './HeroImageCard';
import { RevealOnScroll } from './RevealOnScroll';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WhatsAppLink } from './WhatsAppLink';

const { hero } = siteContent;

const GLOW =
  'radial-gradient(900px 500px at 85% 10%, color-mix(in oklab, var(--color-brand) 55%, transparent), transparent 60%),' +
  'radial-gradient(700px 400px at 0% 100%, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent 60%)';

/** Primeira dobra: promessa, prova, CTA e o card da profissional de enfermagem. */
export function HeroSection() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-deep text-deep-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: GLOW }}
      />

      <div className="container-page relative grid items-center gap-10 py-12 md:py-20 lg:grid-cols-2 lg:gap-14 lg:py-28">
        <RevealOnScroll>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <Flame className="h-4 w-4" aria-hidden="true" />
            {hero.badge}
          </span>

          <h1 className="h1-hero mt-5 max-w-[550px] font-black text-white">
            {hero.headline.before}
            <span className="text-accent">{hero.headline.highlight}</span>
            {hero.headline.after}
          </h1>

          <p className="mt-5 max-w-xl text-base text-deep-foreground/85 sm:text-lg">{hero.subtitle}</p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:items-start">
            <WhatsAppLink className="w-full text-base sm:w-auto sm:text-lg">
              <WhatsAppIcon className="h-6 w-6" />
              {hero.ctaLabel}
            </WhatsAppLink>
            <p className="flex items-center justify-center gap-1.5 text-xs text-deep-foreground/65 sm:justify-start sm:pl-1">
              <Zap className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              {hero.ctaHelper}
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-deep-foreground/70">
            {hero.seals.map((seal) => (
              <li key={seal} className="inline-flex items-center gap-1.5">
                <CircleCheck className="h-4 w-4 text-accent" aria-hidden="true" />
                {seal}
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        <RevealOnScroll delay={120}>
          <HeroImageCard />
        </RevealOnScroll>
      </div>
    </section>
  );
}
