import { siteContent } from '../data/siteContent';
import { RevealOnScroll } from './RevealOnScroll';
import { SectionHeading } from './SectionHeading';
import { UnitCard } from './UnitCard';

const { units } = siteContent;

/**
 * Seção azul-marinho da unidade: fachada à esquerda, endereço à direita.
 *
 * No celular a foto vem primeiro e o endereço embaixo — quem procura onde
 * fica reconhece o prédio antes de ler a rua.
 */
export function UnitsSection() {
  return (
    <section id={units.id} className="bg-deep py-20 text-deep-foreground sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow={units.eyebrow} title={units.title} tone="deep" />

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <RevealOnScroll as="figure" className="overflow-hidden rounded-large shadow-elegant">
            <img
              src={units.image.src}
              alt={units.image.alt}
              width={units.image.width}
              height={units.image.height}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </RevealOnScroll>

          <div className="grid gap-6">
            {units.items.map((unit, index) => (
              <UnitCard key={unit.name} unit={unit} delay={index * 120} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
