import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { siteContent } from '../data/siteContent';
import { cx } from '../lib/cx';
import { getIcon } from './icons/iconMap';

const { pushNotifications } = siteContent;

/** Respiro depois de o áudio destravar, antes do primeiro aviso. */
const FIRST_DELAY_MS = 1200;
/** Quanto cada aviso fica na tela. */
const VISIBLE_MS = 6000;
/** Silêncio entre um aviso e o próximo. */
const GAP_MS = 4000;
/** Precisa casar com a duração da transição de saída. */
const EXIT_MS = 400;
/** Volume de pico do "ding". */
const PEAK_GAIN = 0.38;
/**
 * Até quanto tempo a fila espera por um gesto antes de começar mesmo assim.
 *
 * Curto de propósito. Esperar o gesto é o que dá som ao primeiro aviso, mas
 * esperar demais é pior que o silêncio: com 6s aqui o aviso só aparecia aos
 * 7,5s para quem não clica, e na prática parecia que tinha sumido da página.
 * Com 2,5s o pior caso fica em 3,7s — perto do que era antes do áudio entrar.
 */
const UNLOCK_WAIT_MS = 2500;

/**
 * Um AudioContext só para a página inteira.
 *
 * Antes havia um novo a cada aviso, e cada um nascia suspenso: mesmo depois de
 * a pessoa já ter tocado na tela, o contexto recém-criado continuava travado.
 * Com um só, destravado no primeiro gesto, todos os avisos seguintes tocam.
 */
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (audioCtx) return audioCtx;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  audioCtx = new Ctor();
  return audioCtx;
}

/** Toca um "ding" curto de duas notas pelo Web Audio, sem arquivo de áudio. */
function playChime() {
  try {
    const ctx = getAudioContext();
    // Suspenso quer dizer que o navegador ainda não liberou áudio nesta aba.
    if (!ctx || ctx.state !== 'running') return;

    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(PEAK_GAIN, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);

    [880, 1320].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      osc.connect(gain);
      osc.start(ctx.currentTime + i * 0.11);
      osc.stop(ctx.currentTime + 0.5);
    });

    // O contexto não é fechado: ele é compartilhado e precisa seguir destravado
    // para o próximo aviso.
  } catch {
    // Sem áudio disponível: o aviso continua aparecendo normalmente.
  }
}

/**
 * Aviso central, no formato de notificação push de celular.
 *
 * Aparece no hero, poucos segundos depois de a pessoa chegar. Não usa fundo
 * escurecido: com ele o aviso vira interstitial de tela cheia, que o Google
 * penaliza em ranqueamento mobile. O cartão sozinho no centro entrega a mesma
 * presença sem esse custo, e a página continua legível atrás.
 *
 * O X fecha a fila inteira — é o que atende o critério 2.2.2 da WCAG, que
 * exige poder esconder conteúdo que se move ou troca sozinho.
 *
 * A fila só começa depois que o áudio destrava, para o primeiro aviso também
 * sair com som. No celular isso é quase imediato: o toque que inicia a rolagem
 * já dispara `touchstart`, que conta como gesto. No desktop, rolar com a roda
 * não conta, então entra o limite de espera e a fila começa muda.
 */
export function PushNotification() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);
  const [armed, setArmed] = useState(false);
  const soundedFor = useRef(-1);

  useEffect(() => {
    let done = false;
    const start = () => {
      if (done) return;
      done = true;
      clearTimeout(fallback);
      events.forEach((event) => window.removeEventListener(event, unlock));
      setArmed(true);
    };

    const unlock = () => {
      const ctx = getAudioContext();
      if (!ctx) {
        start();
        return;
      }
      // `resume()` só é aceito dentro do gesto; o then/catch apenas espera a
      // promessa para a fila não começar antes de o áudio estar de pé.
      void ctx.resume().then(start, start);
    };

    const events = ['pointerdown', 'touchstart', 'keydown'] as const;
    events.forEach((event) =>
      window.addEventListener(event, unlock, { once: true, passive: true }),
    );
    const fallback = setTimeout(start, UNLOCK_WAIT_MS);

    return () => {
      done = true;
      clearTimeout(fallback);
      events.forEach((event) => window.removeEventListener(event, unlock));
    };
  }, []);

  useEffect(() => {
    if (!armed || closed || index >= pushNotifications.length) return;

    const delay = index === 0 ? FIRST_DELAY_MS : GAP_MS;
    const enter = setTimeout(() => setVisible(true), delay);
    const leave = setTimeout(() => setVisible(false), delay + VISIBLE_MS);
    const next = setTimeout(() => setIndex((i) => i + 1), delay + VISIBLE_MS + EXIT_MS);

    return () => {
      clearTimeout(enter);
      clearTimeout(leave);
      clearTimeout(next);
    };
  }, [armed, index, closed]);

  // Um toque por aviso, no momento em que ele entra.
  useEffect(() => {
    if (!visible || soundedFor.current === index) return;
    soundedFor.current = index;
    playChime();
  }, [visible, index]);

  const item = pushNotifications[index];
  if (closed || !item) return null;

  const Icon = getIcon(item.icon);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cx(
        // No celular o centro da tela é onde fica o botão de matrícula, então
        // o card sobe para o terço superior e deixa o clique livre. No desktop
        // o centro é a foto do hero, e aí pode ficar no meio mesmo.
        'fixed left-1/2 top-[30%] z-50 w-[min(24rem,calc(100vw-2.5rem))] -translate-x-1/2 sm:top-1/2',
        'rounded-3xl border border-border bg-card p-4 pr-11 shadow-elegant',
        'transition-all duration-400 ease-out',
        visible
          ? '-translate-y-1/2 scale-100 opacity-100'
          : 'pointer-events-none -translate-y-[calc(50%+0.75rem)] scale-95 opacity-0',
      )}
    >
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-promo text-white">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>

        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {item.source}
          </p>
          <p className="mt-1 text-[15px] font-bold leading-snug text-card-foreground">
            {item.title}
          </p>
          <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{item.description}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setClosed(true)}
        aria-label="Fechar avisos"
        className="absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
