import { MessageCircle, Star } from 'lucide-react';
import type { Testimonial } from '../data/siteContent';
import { RevealOnScroll } from './RevealOnScroll';

export type TestimonialCardProps = {
  testimonial: Testimonial;
  delay?: number;
};

/** Estrelas cheias da avaliação, com o número acessível em texto ao lado. */
function Rating({ value }: { value: number }) {
  return (
    <p className="flex items-center gap-0.5 text-accent">
      {Array.from({ length: value }, (_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
      ))}
      <span className="sr-only">{value} de 5 estrelas</span>
    </p>
  );
}

export function TestimonialCard({ testimonial, delay = 0 }: TestimonialCardProps) {
  const { quote, author, source, rating } = testimonial;

  return (
    <RevealOnScroll
      as="figure"
      delay={delay}
      className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
    >
      {rating ? (
        <Rating value={rating} />
      ) : (
        <MessageCircle className="h-5 w-5 text-accent" aria-hidden="true" />
      )}

      {/* flex-1 empurra a assinatura para o rodapé, alinhando os três cards
          mesmo com citações de tamanhos diferentes. */}
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-deep-foreground/90">
        “{quote}”
      </blockquote>

      <figcaption className="mt-5 text-sm">
        <span className="font-bold">{author}</span>
        <span className="text-deep-foreground/60">
          {source === 'google' ? ' · Google' : ' · Instagram'}
        </span>
      </figcaption>
    </RevealOnScroll>
  );
}
