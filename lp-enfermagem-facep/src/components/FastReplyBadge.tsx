import { Zap } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { cx } from '../lib/cx';

const { fastReply } = siteContent;

export type FastReplyBadgeProps = {
  className?: string;
};

/**
 * Selo de resposta rápida, embaixo dos CTAs.
 *
 * Desenhado com a linguagem da própria página, de propósito. O selo "Muito
 * responsivo" do WhatsApp é concedido pela Meta a partir do tempo real de
 * resposta do perfil — imitar aquela cara aqui sugeriria uma verificação de
 * terceiro que não existe. Este é a FACEP falando por si, e parece isso.
 */
export function FastReplyBadge({ className }: FastReplyBadgeProps) {
  return (
    <p
      className={cx(
        'inline-flex items-center gap-2 rounded-full border border-whatsapp/25 bg-whatsapp/10',
        'px-3.5 py-1.5 text-xs font-bold text-whatsapp',
        className,
      )}
    >
      <Zap className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {fastReply}
    </p>
  );
}
