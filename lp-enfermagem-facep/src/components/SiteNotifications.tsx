import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { siteContent } from '../data/siteContent';
import { cx } from '../lib/cx';
import { getIcon } from './icons/iconMap';

const { notifications } = siteContent;

/** Respiro depois de passar do hero, para o aviso não entrar junto do scroll. */
const FIRST_DELAY_MS = 1500;
/** Quanto cada aviso fica na tela. */
const VISIBLE_MS = 6000;
/** Silêncio entre um aviso e o próximo. */
const GAP_MS = 9000;
/** Precisa casar com a duração da transição de saída, abaixo. */
const EXIT_MS = 500;

/**
 * Avisos no canto inferior esquerdo, no formato das notificações de página de
 * pagamento da Hotmart. O conteúdo está em `siteContent.notifications`, com a
 * explicação de por que são fatos e não contagem de visitante.
 *
 * Canto **esquerdo** porque o direito é do botão flutuante do WhatsApp.
 *
 * Só começa depois que a pessoa rola para além do hero. Em tela de notebook o
 * canto inferior esquerdo é exatamente onde cai o botão "Quero garantir minha
 * vaga": aviso entrando ali por cima tira do caminho justamente o clique que
 * a página existe para provocar. Passado o hero, o canto está livre.
 *
 * A fila roda uma vez e para. Movimento que não termina no campo de visão
 * disputa atenção com o CTA sem entregar informação nova, e o visitante já viu
 * os cinco avisos quando a fila acaba. O X encerra antes, e é também o que
 * satisfaz o critério 2.2.2 da WCAG (poder esconder conteúdo que se move
 * sozinho). Movimento reduzido já é tratado no `globals.css`, que zera a
 * duração de toda transição.
 */
export function SiteNotifications() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (armed || closed) return;

    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.6) setArmed(true);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [armed, closed]);

  useEffect(() => {
    if (!armed || closed || index >= notifications.length) return;

    const delay = index === 0 ? FIRST_DELAY_MS : GAP_MS;
    const enter = setTimeout(() => setVisible(true), delay);
    const leave = setTimeout(() => setVisible(false), delay + VISIBLE_MS);
    // Só troca de aviso depois que o atual terminou de sair, senão o texto
    // muda no meio do fade.
    const next = setTimeout(() => setIndex((i) => i + 1), delay + VISIBLE_MS + EXIT_MS);

    return () => {
      clearTimeout(enter);
      clearTimeout(leave);
      clearTimeout(next);
    };
  }, [armed, index, closed]);

  const item = notifications[index];
  if (!armed || closed || !item) return null;

  const Icon = getIcon(item.icon);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cx(
        'fixed bottom-5 left-5 z-40 flex max-w-[min(20rem,calc(100vw-7rem))] items-start gap-3',
        'rounded-2xl border border-border bg-card p-3.5 pr-10 shadow-elegant',
        'transition-all duration-500 ease-out',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-strong text-accent-foreground">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>

      <div className="min-w-0">
        <p className="text-sm font-bold leading-tight text-card-foreground">{item.title}</p>
        <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{item.description}</p>
      </div>

      <button
        type="button"
        onClick={() => setClosed(true)}
        aria-label="Fechar avisos"
        className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
