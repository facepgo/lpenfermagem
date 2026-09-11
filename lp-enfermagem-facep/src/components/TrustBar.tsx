import type { Feature } from '../data/siteContent';
import { siteContent } from '../data/siteContent';
import { cx } from '../lib/cx';
import { AnimatedCounter } from './AnimatedCounter';
import { BrazilFlagIcon } from './icons/BrazilFlagIcon';
import { getIcon } from './icons/iconMap';
import { RevealOnScroll } from './RevealOnScroll';

const { trustBar } = siteContent;

function TrustCard({ item, delay }: { item: Feature; delay: number }) {
  const Icon = getIcon(item.icon);

  return (
    <RevealOnScroll
      as="li"
      delay={delay}
      className={cx(
        'rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition duration-200 hover:border-accent/40 hover:bg-white/[0.07] sm:p-6',
        item.wide && 'col-span-2 lg:col-span-1',
      )}
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-strong text-accent-foreground">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-base font-bold sm:text-lg">{item.title}</h3>
      <p className="mt-1 text-sm text-deep-foreground/75">
        {item.description}
        {item.flag && (
          <BrazilFlagIcon className="ml-1.5 inline-block h-3 w-[1.05rem] translate-y-[0.1em] align-baseline" />
        )}
      </p>
    </RevealOnScroll>
  );
}

/**
 * Faixa azul-marinho logo abaixo do hero: primeiro os seis diferenciais em
 * duas fileiras de três, depois a trilha de certificações sob um rótulo
 * centralizado, no vermelho da marca, que as amarra como um conjunto só.
 */
export function TrustBar() {
  const { certification } = trustBar;

  return (
    <section id={trustBar.id} className="bg-deep py-16 text-deep-foreground sm:py-20">
      <div className="container-page">
        <h2 className="sr-only">Diferenciais da FACEP</h2>

        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
          {trustBar.items.map((item, index) => (
            <TrustCard key={item.title} item={item} delay={index * 80} />
          ))}
        </ul>

        {/* Mesmo shell dos cards de "Para você": card branco, ícone em quadrado
            esmeralda, título e apoio. Sobre o navy ele salta, que é o ponto. */}
        <RevealOnScroll
          as="article"
          className="group mx-auto mt-12 max-w-2xl rounded-card border-2 border-brand/15 bg-card p-6 text-card-foreground transition duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-elegant sm:p-7"
        >
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-strong text-accent-foreground transition duration-200 group-hover:scale-110">
            <AnimatedCounter
              value={3}
              from={1}
              ease="linear"
              duration={1800}
              className="text-2xl font-black tabular-nums"
            />
          </span>
          <h3 className="mt-5 text-xl font-bold text-red-ink">{certification.label}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{certification.note}</p>
        </RevealOnScroll>

        <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
          {certification.items.map((item, index) => (
            <TrustCard key={item.title} item={item} delay={index * 80} />
          ))}
        </ul>
      </div>
    </section>
  );
}
