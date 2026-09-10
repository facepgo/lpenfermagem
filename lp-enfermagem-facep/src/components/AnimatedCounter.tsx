import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export type AnimatedCounterProps = {
  value: number;
  /** Duração total da contagem, em ms. */
  duration?: number;
  className?: string;
};

const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

/**
 * Conta de zero até `value` quando o número entra na tela.
 * Com `prefers-reduced-motion` o valor final aparece direto.
 */
export function AnimatedCounter({ value, duration = 1800, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      setDisplayed(value);
      return;
    }

    let frame = 0;
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || started) continue;
          started = true;
          observer.unobserve(entry.target);

          const startedAt = performance.now();
          const step = (now: number) => {
            const progress = Math.min(1, (now - startedAt) / duration);
            setDisplayed(Math.round(value * easeOutCubic(progress)));
            if (progress < 1) frame = requestAnimationFrame(step);
          };
          frame = requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayed.toLocaleString('pt-BR')}
    </span>
  );
}
