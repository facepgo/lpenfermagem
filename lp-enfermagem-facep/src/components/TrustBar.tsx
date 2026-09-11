import type { Feature } from '../data/siteContent';
import { siteContent } from '../data/siteContent';
import { cx } from '../lib/cx';
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
      <p className="mt-1 text-sm text-deep-foreground/75">{item.description}</p>
    </RevealOnScroll>
  );
}

/**
 * Faixa azul-marinho logo abaixo do hero: primeiro as credenciais, depois a
 * trilha de certificações sob um rótulo que as amarra como um conjunto só.
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

        <ul className="mt-4 grid grid-cols-2 gap-4 lg:mt-6 lg:grid-cols-4 lg:gap-6">
          {trustBar.extras.map((item, index) => (
            <TrustCard key={item.title} item={item} delay={index * 80} />
          ))}
        </ul>

        <RevealOnScroll className="mt-10">
          <h3 className="flex items-center gap-4 text-sm font-black uppercase tracking-wider text-accent">
            {certification.label}
            <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
          </h3>
          <p className="mt-2 text-sm text-deep-foreground/75">{certification.note}</p>
        </RevealOnScroll>

        <ul className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
          {certification.items.map((item, index) => (
            <TrustCard key={item.title} item={item} delay={index * 80} />
          ))}
        </ul>
      </div>
    </section>
  );
}
