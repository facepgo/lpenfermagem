import { CircleCheck } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { RevealOnScroll } from './RevealOnScroll';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WhatsAppLink } from './WhatsAppLink';

const { pricing } = siteContent;

/** Card central da oferta. Os valores ficam com a secretaria — nada é fixado aqui. */
export function PricingCard() {
  return (
    <RevealOnScroll className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-large border-2 border-brand bg-card shadow-elegant">
      <p className="flex items-center justify-center gap-2 bg-gold py-3 text-base font-black uppercase tracking-wider text-gold-foreground">
        {pricing.badge}
      </p>

      <div className="p-7 sm:p-10">
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
