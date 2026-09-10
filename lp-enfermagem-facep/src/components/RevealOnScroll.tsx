import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export type RevealOnScrollProps = {
  children: ReactNode;
  /** Tag renderizada — mantém o HTML semântico de cada seção. */
  as?: ElementType;
  /** Atraso progressivo, em ms, usado nas grades de cards. */
  delay?: number;
  className?: string;
  id?: string;
};

/**
 * Fade-in com deslocamento vertical disparado por Intersection Observer.
 * Executa uma única vez por elemento e é ignorado com `prefers-reduced-motion`.
 */
export function RevealOnScroll({ children, as = 'div', delay = 0, className, id }: RevealOnScrollProps) {
  const Component = as as 'div';
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      id={id}
      className={cx('reveal', visible && 'reveal-in', className)}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}
