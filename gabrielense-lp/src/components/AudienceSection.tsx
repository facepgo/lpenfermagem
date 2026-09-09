import { siteContent } from '../data/siteContent';
import { AudienceCard } from './AudienceCard';
import { SectionHeading } from './SectionHeading';

const { audience } = siteContent;

/** Seção branca “Para você” com os três perfis de aluno. */
export function AudienceSection() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow={audience.eyebrow} title={audience.title} />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {audience.cards.map((card, index) => (
            <AudienceCard key={card.title} card={card} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
