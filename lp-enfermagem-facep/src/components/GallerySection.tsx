import { MapPin } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { GalleryCard } from './GalleryCard';
import { RevealOnScroll } from './RevealOnScroll';
import { SectionHeading } from './SectionHeading';

const { gallery } = siteContent;

/** Galeria branca “Estrutura”: 4×2 no desktop, 2 colunas no mobile. */
export function GallerySection() {
  return (
    <section id={gallery.id} className="bg-background py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow={gallery.eyebrow} title={gallery.title} description={gallery.description} />

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {gallery.images.map((image, index) => (
            <GalleryCard key={image.src} image={image} delay={index * 60} />
          ))}
        </ul>

        <RevealOnScroll
          as="p"
          className="mt-8 whitespace-pre-line text-center text-sm font-medium text-muted-foreground"
        >
          <MapPin className="mr-1 inline h-4 w-4 text-brand" aria-hidden="true" />
          {gallery.location}
        </RevealOnScroll>
      </div>
    </section>
  );
}
