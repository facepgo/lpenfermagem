import { Fragment } from 'react';
import { siteContent } from '../data/siteContent';
import { FastReplyBadge } from './FastReplyBadge';
import { RevealOnScroll } from './RevealOnScroll';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WhatsAppLink } from './WhatsAppLink';

const { finalCta } = siteContent;

/**
 * Brilho fraco, na mesma dosagem do hero. Sobre fundo claro o gradiente que
 * funcionava no navy (55% / 18%) vira mancha suja — aqui ele só precisa tirar
 * o branco de chapa.
 */
const GLOW =
  'radial-gradient(700px 380px at 50% 0%, color-mix(in oklab, var(--color-brand) 8%, transparent), transparent 65%),' +
  'radial-gradient(600px 340px at 50% 100%, color-mix(in oklab, var(--color-accent) 12%, transparent), transparent 65%)';

/**
 * Fechamento em fundo claro, como o hero: a página abre e fecha no mesmo tom.
 *
 * O esmeralda aqui é o `accent-strong`, não o `accent`: o tom claro rende
 * 2,5:1 sobre branco e sumiria. Mesma troca já feita no hero.
 */
export function FinalCTA() {
  return (
    <section
      id={finalCta.id}
      className="relative isolate overflow-hidden bg-background py-24 text-foreground sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: GLOW }}
      />

      <div className="container-page relative text-center">
        <RevealOnScroll as="h2" className="h2-cta font-black text-foreground">
          {finalCta.headline.map((line, index) => (
            <Fragment key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </Fragment>
          ))}
        </RevealOnScroll>

        <RevealOnScroll as="p" className="mt-5 text-lg font-semibold text-accent-strong sm:text-xl">
          {finalCta.subtitle}
        </RevealOnScroll>

        <RevealOnScroll className="mt-10 flex flex-col items-center gap-3">
          <WhatsAppLink className="w-full max-w-md text-base sm:w-auto sm:text-lg">
            <WhatsAppIcon className="h-6 w-6" />
            {finalCta.ctaLabel}
          </WhatsAppLink>
          <FastReplyBadge />
        </RevealOnScroll>
      </div>
    </section>
  );
}
