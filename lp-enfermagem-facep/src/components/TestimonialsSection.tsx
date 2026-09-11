import { siteContent } from '../data/siteContent';
import { SectionHeading } from './SectionHeading';
import { TestimonialCard } from './TestimonialCard';

const { testimonials } = siteContent;

/**
 * Seção azul-marinho de depoimentos, logo depois da estrutura.
 *
 * Fica escura porque as duas vizinhas — galeria e investimento — são claras,
 * e a página alterna os fundos do começo ao fim.
 */
export function TestimonialsSection() {
  return (
    <section id={testimonials.id} className="bg-deep py-20 text-deep-foreground sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
          description={testimonials.description}
          tone="deep"
        />

        <ul className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          {testimonials.items.map((testimonial, index) => (
            <li key={testimonial.image.src} className="h-full">
              <TestimonialCard testimonial={testimonial} delay={index * 120} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
