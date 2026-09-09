import { Zap } from 'lucide-react';
import { Fragment } from 'react';
import { siteContent } from '../data/siteContent';
import { RevealOnScroll } from './RevealOnScroll';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WhatsAppLink } from './WhatsAppLink';

const { finalCta } = siteContent;

const GLOW =
  'radial-gradient(700px 380px at 50% 0%, color-mix(in oklab, var(--color-brand) 55%, transparent), transparent 65%),' +
  'radial-gradient(600px 340px at 50% 100%, color-mix(in oklab, var(--color-gold) 18%, transparent), transparent 65%)';

/** Fechamento azul-marinho com profundidade radial e o CTA final. */
export function FinalCTA() {
  return (
    <section
      id={finalCta.id}
      className="relative isolate overflow-hidden bg-deep py-24 text-deep-foreground sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ background: GLOW }}
      />

      <div className="container-page relative text-center">
        <RevealOnScroll as="h2" className="h2-cta font-black text-white">
          {finalCta.headline.map((line, index) => (
            <Fragment key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </Fragment>
          ))}
        </RevealOnScroll>

        <RevealOnScroll as="p" className="mt-5 text-lg font-semibold text-gold sm:text-xl">
          {finalCta.subtitle}
        </RevealOnScroll>

        <RevealOnScroll className="mt-10 flex flex-col items-center gap-3">
          <WhatsAppLink className="w-full max-w-md text-base sm:w-auto sm:text-lg">
            <WhatsAppIcon className="h-6 w-6" />
            {finalCta.ctaLabel}
          </WhatsAppLink>
          <p className="inline-flex items-center gap-1.5 text-xs text-deep-foreground/70">
            <Zap className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            {finalCta.ctaHelper}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
