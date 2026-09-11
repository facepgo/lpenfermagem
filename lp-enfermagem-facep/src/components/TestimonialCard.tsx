import type { Testimonial } from '../data/siteContent';
import { RevealOnScroll } from './RevealOnScroll';

export type TestimonialCardProps = {
  testimonial: Testimonial;
  delay?: number;
};

export function TestimonialCard({ testimonial, delay = 0 }: TestimonialCardProps) {
  const { image, caption } = testimonial;

  return (
    <RevealOnScroll
      as="figure"
      delay={delay}
      className="flex h-full flex-col gap-4 rounded-2xl bg-card p-4 shadow-elegant sm:p-5"
    >
      {/* `maxWidth` no tamanho original impede que o print seja esticado: são
          capturas pequenas, e ampliar borra o texto — que é a única coisa que
          este card tem para mostrar. Sobrando espaço, ele fica centralizado. */}
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        style={{ maxWidth: image.width }}
        className="mx-auto h-auto w-full rounded-lg"
      />

      <figcaption className="mt-auto text-center text-xs font-semibold text-muted-foreground">
        {caption}
      </figcaption>
    </RevealOnScroll>
  );
}
