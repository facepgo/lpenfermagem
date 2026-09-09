import type { GalleryImage } from '../data/siteContent';
import { RevealOnScroll } from './RevealOnScroll';

export type GalleryCardProps = {
  image: GalleryImage;
  delay?: number;
};

export function GalleryCard({ image, delay = 0 }: GalleryCardProps) {
  return (
    <RevealOnScroll
      as="li"
      delay={delay}
      className="group relative aspect-[4/3] overflow-hidden rounded-card border border-border bg-muted"
    >
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
        <span className="text-[11px] font-semibold text-white">{image.caption}</span>
      </div>
    </RevealOnScroll>
  );
}
