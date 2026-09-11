import { CircleCheck, Flame, Zap } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { HeroImageCard } from './HeroImageCard';
import { RevealOnScroll } from './RevealOnScroll';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WhatsAppLink } from './WhatsAppLink';

const { hero } = siteContent;

/** Brilho bem discreto — sobre fundo claro, qualquer coisa mais forte suja o texto. */
const GLOW =
  'radial-gradient(900px 520px at 88% 8%, color-mix(in oklab, var(--color-accent) 12%, transparent), transparent 62%),' +
  'radial-gradient(700px 420px at 0% 100%, color-mix(in oklab, var(--color-brand) 8%, transparent), transparent 62%)';

/**
 * Primeira dobra em fundo claro: promessa, prova, CTA e o card das alunas.
 * O esmeralda usado aqui é o `accent-strong`, porque o tom claro não tem
 * contraste suficiente sobre branco.
 */
export function HeroSection() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: GLOW }}
      />

      <div className="container-page relative grid items-center gap-10 py-12 md:py-20 lg:grid-cols-2 lg:gap-14 lg:py-28">
        <RevealOnScroll>
          <span className="badge-live inline-flex items-center gap-2 rounded-full border border-red-brand/35 bg-red-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-red-ink">
            <Flame className="badge-flame h-4 w-4" aria-hidden="true" />
            {hero.badge}
          </span>

          <h1 className="h1-hero mt-5 max-w-[550px] font-black text-foreground">
            {hero.headline.before}
            <span className="text-accent-strong">{hero.headline.highlight}</span>
            {hero.headline.after}
          </h1>

          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">{hero.subtitle}</p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:items-start">
            <WhatsAppLink className="w-full text-base sm:w-auto sm:text-lg">
              <WhatsAppIcon className="h-6 w-6" />
              {hero.ctaLabel}
            </WhatsAppLink>
            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground sm:justify-start sm:pl-1">
              <Zap className="h-3.5 w-3.5 text-accent-strong" aria-hidden="true" />
              {hero.ctaHelper}
            </p>
          </div>

          {/* Cada selo vira uma pastilha, para separarem-se entre si em vez de
              lerem como uma linha corrida. */}
          <ul className="mt-8 flex flex-wrap items-center gap-2.5 text-xs font-bold uppercase tracking-wider">
            {hero.seals.map((seal) => (
              <li
                key={seal}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1.5 text-foreground"
              >
                <CircleCheck className="h-4 w-4 shrink-0 text-accent-strong" aria-hidden="true" />
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
