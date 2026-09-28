import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { siteContent } from '../data/siteContent';
import { useWhatsAppGate } from './WhatsAppGate';

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
 *
 * O clique é interceptado para mostrar antes o aviso de aulas presenciais. O
 * `href` continua real de propósito — assim o link segue funcionando para
 * "abrir em nova aba", botão do meio e leitor de tela, e ainda funciona se o
 * JavaScript falhar.
 */
export function WhatsAppLink({ children, className, ariaLabel, variant = 'button' }: WhatsAppLinkProps) {
  const openGate = useWhatsAppGate();

  return (
    <a
      href={siteContent.contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={(event) => {
        // Deixa passar direto o clique que a pessoa fez de propósito para abrir
        // noutro lugar (Ctrl/Cmd, Shift, botão do meio).
        if (!openGate || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
          return;
        }
        event.preventDefault();
        openGate();
      }}
      className={cx(variant === 'button' && 'btn-whatsapp', className)}
    >
      {children}
    </a>
  );
}
