import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { siteContent } from '../data/siteContent';

export type WhatsAppLinkProps = {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  /** `button` aplica o pill verde padrão; `plain` deixa o estilo a cargo do chamador. */
  variant?: 'button' | 'plain';
};

/**
 * Âncora padrão de conversão: sempre aponta para o WhatsApp configurado
 * e carrega os atributos de segurança de link externo.
 */
export function WhatsAppLink({ children, className, ariaLabel, variant = 'button' }: WhatsAppLinkProps) {
  return (
    <a
      href={siteContent.contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cx(variant === 'button' && 'btn-whatsapp', className)}
    >
      {children}
    </a>
  );
}
