import { siteContent } from '../data/siteContent';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WhatsAppLink } from './WhatsAppLink';

const { brand, contact, footer } = siteContent;

/** Rodapé azul-marinho em três colunas (empilhadas no mobile). */
export function Footer() {
  return (
    <footer className="bg-deep pb-10 text-deep-foreground/80">
      <div className="container-page border-t border-white/10 pt-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <img
                src={brand.logoLight.src}
                alt={brand.logoLight.alt}
                width={brand.logoLight.width}
                height={brand.logoLight.height}
                loading="lazy"
                className="h-16 w-auto"
              />
            </div>
            <p className="mt-4 max-w-sm text-sm">{footer.about}</p>
          </div>

          <nav aria-label="Rodapé" className="text-sm">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gold">{footer.navTitle}</p>
            <ul className="space-y-2">
              {footer.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gold">{footer.socialTitle}</p>
            <div className="flex items-center gap-3">
              <WhatsAppLink
                variant="plain"
                ariaLabel="WhatsApp da FACEP"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition hover:border-whatsapp hover:text-whatsapp"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </WhatsAppLink>
              <a href={contact.phoneHref} className="text-sm font-bold transition hover:text-white">
                {contact.phoneLabel}
              </a>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-deep-foreground/60">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
