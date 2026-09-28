import { MapPin, X } from 'lucide-react';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { siteContent } from '../data/siteContent';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

const { whatsappGate, contact } = siteContent;

const GateContext = createContext<(() => void) | null>(null);

/**
 * Abre o aviso de presencial. Fora do provider devolve `null`, e o
 * `WhatsAppLink` cai no comportamento de link comum — nunca deixa o CTA morto.
 */
export function useWhatsAppGate() {
  return useContext(GateContext);
}

/**
 * Trava de intenção antes do WhatsApp: o visitante confirma que consegue vir às
 * aulas presenciais e só então o WhatsApp abre.
 *
 * O `window.open` roda dentro do clique em "Sim, consigo vir", que é um gesto
 * do usuário — por isso não é barrado como pop-up. Abrir no fim de um timer ou
 * de uma promessa seria.
 */
export function WhatsAppGateProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const openGate = useCallback(() => {
    lastFocused.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    // Devolve o foco ao CTA que abriu, senão quem navega por teclado volta
    // para o começo da página.
    lastFocused.current?.focus?.();
  }, []);

  const confirm = useCallback(() => {
    window.open(contact.whatsappUrl, '_blank', 'noopener,noreferrer');
    close();
  }, [close]);

  useEffect(() => {
    if (!open) return;

    confirmRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);

    // Trava a rolagem do fundo enquanto o aviso está aberto.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <GateContext.Provider value={openGate}>
      {children}

      {open ? (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-deep/70 p-5 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wa-gate-title"
            aria-describedby="wa-gate-body"
            className="relative w-full max-w-md rounded-large border-2 border-brand bg-card p-7 text-card-foreground shadow-elegant sm:p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label={whatsappGate.cancelLabel}
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-promo text-white">
              <MapPin className="h-6 w-6" aria-hidden="true" />
            </span>

            <h2 id="wa-gate-title" className="mt-5 text-xl font-black text-deep">
              {whatsappGate.title}
            </h2>

            <p id="wa-gate-body" className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {whatsappGate.body}
            </p>

            <p className="mt-4 text-base font-bold">{whatsappGate.question}</p>

            <div className="mt-6 flex flex-col gap-2.5">
              <button ref={confirmRef} type="button" onClick={confirm} className="btn-whatsapp">
                <WhatsAppIcon className="h-5 w-5" />
                {whatsappGate.confirmLabel}
              </button>
              <button
                type="button"
                onClick={close}
                className="rounded-full px-5 py-2.5 text-sm font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {whatsappGate.cancelLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </GateContext.Provider>
  );
}
