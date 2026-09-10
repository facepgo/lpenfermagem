import { siteContent } from '../data/siteContent';
import { cx } from '../lib/cx';
import { getIcon } from './icons/iconMap';
import { RevealOnScroll } from './RevealOnScroll';

const { trustBar } = siteContent;

/** Faixa azul-marinho logo abaixo do hero: as três certificações na primeira
 *  fileira, as três credenciais na segunda. */
export function TrustBar() {
  return (
    <section id={trustBar.id} className="bg-deep py-16 text-deep-foreground sm:py-20">
      <div className="container-page">
        <h2 className="sr-only">Diferenciais da FACEP</h2>
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
          {trustBar.items.map((item, index) => {
            const Icon = getIcon(item.icon);
            return (
              <RevealOnScroll
                key={item.title}
                as="li"
                delay={index * 80}
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
          })}
        </ul>
      </div>
    </section>
  );
}
