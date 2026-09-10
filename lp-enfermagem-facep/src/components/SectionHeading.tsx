import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { RevealOnScroll } from './RevealOnScroll';

export type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  /** `light` = seção branca (eyebrow azul); `deep` = seção azul-marinho (eyebrow dourada). */
  tone?: 'light' | 'deep';
  /** Largura do bloco de texto centralizado. */
  width?: '2xl' | '3xl';
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  width = '2xl',
  className,
}: SectionHeadingProps) {
  return (
    <RevealOnScroll
      className={cx('mx-auto text-center', width === '3xl' ? 'max-w-3xl' : 'max-w-2xl', className)}
    >
      <span
        className={cx(
          'text-xs font-bold uppercase tracking-wider',
          tone === 'deep' ? 'text-accent' : 'text-brand',
        )}
      >
        {eyebrow}
      </span>
      <h2 className="h2-section mt-2 font-black">{title}</h2>
      {description ? (
        <p className={cx('mt-3', tone === 'deep' ? 'text-deep-foreground/75' : 'text-muted-foreground')}>
          {description}
        </p>
      ) : null}
    </RevealOnScroll>
  );
}
