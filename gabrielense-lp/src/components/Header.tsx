import { siteContent } from '../data/siteContent';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WhatsAppLink } from './WhatsAppLink';

const { brand, header } = siteContent;

/**
 * Cabeçalho branco fixo (~78px no desktop) com as duas marcas à esquerda
 * e o botão verde de contato à direita.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="container-page flex items-center justify-between gap-3 py-3">
        <a
          href={header.homeHref}
          aria-label={header.homeAriaLabel}
          className="flex min-w-0 items-center gap-2 sm:gap-3"
        >
          <img
            src={brand.logo.src}
            alt={brand.logo.alt}
            width={brand.logo.width}
            height={brand.logo.height}
            className="h-10 w-auto sm:h-12"
          />
        </a>

        {/* Desktop e tablet: pill completo com rótulo. */}
        <WhatsAppLink className="hidden shrink-0 text-sm sm:inline-flex" ariaLabel={header.ctaAriaLabel}>
          <WhatsAppIcon className="h-5 w-5" />
          {header.ctaLabel}
        </WhatsAppLink>

        {/* Mobile: versão compacta só com o ícone, sem quebrar o cabeçalho. */}
        <WhatsAppLink
          variant="plain"
          ariaLabel={header.ctaAriaLabel}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-whatsapp text-white shadow-whatsapp transition hover:bg-whatsapp-hover sm:hidden"
        >
          <WhatsAppIcon className="h-5 w-5" />
        </WhatsAppLink>
      </div>
    </header>
  );
}
