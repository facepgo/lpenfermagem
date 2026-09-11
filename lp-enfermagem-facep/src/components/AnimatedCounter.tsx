import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export type AnimatedCounterProps = {
  value: number;
  /** Número em que a contagem começa. */
  from?: number;
  /** Duração total da contagem, em ms. */
  duration?: number;
  /**
   * `out` desacelera no fim — bom para milhares, onde a corrida dos dígitos é
   * o efeito. Em intervalo curto ele atropela: de 1 a 3 o número chega ao 3
   * com pouco mais de um terço do tempo e fica parado o resto. Para contagens
   * de poucos passos, `linear` dá o mesmo tempo a cada número.
   */
  ease?: 'out' | 'linear';
  className?: string;
};

const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

/**
 * Conta de `from` até `value` quando o número entra na tela.
 * Com `prefers-reduced-motion` o valor final aparece direto.
 */
export function AnimatedCounter({
  value,
  from = 0,
  duration = 1800,
  ease = 'out',
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState(from);

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
            const eased = ease === 'linear' ? progress : easeOutCubic(progress);
            setDisplayed(Math.round(from + (value - from) * eased));
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
  }, [value, from, duration, ease]);

  return (
    <span ref={ref} className={className}>
      {displayed.toLocaleString('pt-BR')}
    </span>
  );
}
