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

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.items.map((testimonial, index) => (
            <li key={testimonial.author} className="h-full">
              <TestimonialCard testimonial={testimonial} delay={index * 120} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
