import { GraduationCap } from 'lucide-react';
import { siteContent } from '../data/siteContent';

const { hero } = siteContent;

/**
 * Card vertical 4:5 do hero: aura desfocada, recorte da profissional de
 * enfermagem e cartão branco flutuante com o aviso da próxima turma.
 */
export function HeroImageCard() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      {/* Aura azul/dourada desfocada atrás do card. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-gold/30 via-brand/10 to-transparent blur-2xl"
      />

      <div className="relative overflow-hidden rounded-hero border border-white/10 bg-white/5 shadow-elegant">
        {/* Gradiente azul + brilho sutil sob o recorte transparente da foto. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand/20 via-brand/5 to-transparent"
        />

        <img
          src={hero.image.src}
          alt={hero.image.alt}
          width={hero.image.width}
          height={hero.image.height}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="relative aspect-[4/5] w-full object-cover object-bottom"
        />

        <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/95 p-4 text-foreground shadow-xl backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {hero.floatingCard.eyebrow}
              </p>
              <p className="text-sm font-bold leading-snug">{hero.floatingCard.title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
