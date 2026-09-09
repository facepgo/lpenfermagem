import { siteContent } from '../data/siteContent';
import { PricingCard } from './PricingCard';
import { RevealOnScroll } from './RevealOnScroll';
import { SectionHeading } from './SectionHeading';

const { pricing } = siteContent;

/** Seção branca de investimento com o card da oferta especial. */
export function PricingSection() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow={pricing.eyebrow} title={pricing.title} />

        <PricingCard />

        <RevealOnScroll as="p" className="mt-5 text-center text-sm font-semibold text-danger">
          {pricing.warning}
        </RevealOnScroll>
      </div>
    </section>
  );
}
