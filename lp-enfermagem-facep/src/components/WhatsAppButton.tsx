import { siteContent } from '../data/siteContent';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WhatsAppLink } from './WhatsAppLink';

const { floatingWhatsApp } = siteContent;

/** Botão flutuante fixo no canto inferior direito, com pulso discreto. */
export function WhatsAppButton() {
  return (
    <WhatsAppLink
      variant="plain"
      ariaLabel={floatingWhatsApp.ariaLabel}
      className="float-wa fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-float transition-colors hover:bg-whatsapp-hover sm:h-16 sm:w-16"
    >
      <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
    </WhatsAppLink>
  );
}
