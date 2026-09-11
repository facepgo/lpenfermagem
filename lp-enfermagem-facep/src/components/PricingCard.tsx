import { CircleCheck } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { RevealOnScroll } from './RevealOnScroll';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WhatsAppLink } from './WhatsAppLink';

const { pricing } = siteContent;

/** Card central da oferta, com os valores que a FACEP publica. */
export function PricingCard() {
  return (
    <RevealOnScroll className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-large border-2 border-brand bg-card shadow-elegant">
      <p className="flex items-center justify-center gap-2 bg-accent-strong py-3 text-base font-black uppercase tracking-wider text-accent-foreground">
        {pricing.badge}
      </p>

      <div className="p-7 sm:p-10">
        {/* Bloco de valores: o que a pessoa veio ver nesta seção. Divide-se ao
            meio no desktop e empilha no celular, com a régua virando na hora. */}
        <dl className="mb-8 grid gap-5 border-b border-border pb-8 sm:grid-cols-2 sm:gap-6 sm:divide-x sm:divide-border">
          {pricing.highlights.map((highlight, index) => (
            <div key={highlight.label} className={index > 0 ? 'sm:pl-6' : undefined}>
              <dt className="text-sm font-semibold text-muted-foreground">{highlight.label}</dt>
              <dd
                className={
                  highlight.tone === 'free'
                    ? 'mt-1 text-4xl font-black leading-none text-accent-strong sm:text-[2.75rem]'
                    : 'mt-1 text-3xl font-black leading-none text-foreground sm:text-4xl'
                }
              >
                {highlight.value}
              </dd>
              {highlight.strikePrice ? (
                <p className="mt-1.5 text-sm text-muted-foreground">
                  (de <s>{highlight.strikePrice}</s> por {highlight.finalPrice})
                </p>
              ) : null}
            </div>
          ))}
        </dl>

        <ul className="space-y-4 text-base sm:text-lg">
          {pricing.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3">
              <CircleCheck className="mt-0.5 h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-sm text-muted-foreground">{pricing.disclaimer}</p>

        <WhatsAppLink className="mt-8 w-full">
          <WhatsAppIcon className="h-5 w-5" />
          {pricing.ctaLabel}
        </WhatsAppLink>
      </div>
    </RevealOnScroll>
  );
}
