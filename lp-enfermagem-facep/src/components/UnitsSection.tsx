import { siteContent } from '../data/siteContent';
import { SectionHeading } from './SectionHeading';
import { UnitCard } from './UnitCard';

const { units } = siteContent;

/** Seção azul-marinho com as três unidades no Espírito Santo. */
export function UnitsSection() {
  return (
    <section id={units.id} className="bg-deep py-20 text-deep-foreground sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow={units.eyebrow} title={units.title} tone="deep" />

        {/* Com uma única unidade o card fica centralizado; com várias, vira grade. */}
        <div
          className={
            units.items.length === 1
              ? 'mx-auto mt-12 max-w-xl'
              : 'mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3'
          }
        >
          {units.items.map((unit, index) => (
            <UnitCard key={unit.name} unit={unit} delay={index * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
