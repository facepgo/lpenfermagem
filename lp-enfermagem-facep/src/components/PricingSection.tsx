import { siteContent } from '../data/siteContent';
import { PricingCard } from './PricingCard';
import { SectionHeading } from './SectionHeading';

const { pricing } = siteContent;

/** Seção branca de investimento com o card da oferta especial. */
export function PricingSection() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow={pricing.eyebrow} title={pricing.title} />

        <PricingCard />
      </div>
    </section>
  );
}
