type BrazilFlagIconProps = {
  className?: string;
};

/**
 * Bandeira do Brasil desenhada à mão em vez do emoji 🇧🇷: o Windows não tem
 * glifo de bandeira no Segoe UI Emoji e renderiza as letras "BR" no lugar.
 *
 * Simplificada de propósito — no tamanho em que aparece, ao lado de um texto
 * de 14px, as 27 estrelas e a faixa "Ordem e Progresso" viram ruído. Ficam o
 * campo verde, o losango e o círculo com a faixa, que é o que se reconhece.
 */
export function BrazilFlagIcon({ className = 'h-3.5 w-5' }: BrazilFlagIconProps) {
  return (
    <svg
      viewBox="0 0 28 20"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="28" height="20" rx="2" fill="#009B3A" />
      <path d="M14 2.6 25.4 10 14 17.4 2.6 10Z" fill="#FEDF00" />
      <circle cx="14" cy="10" r="4.4" fill="#002776" />
      <path
        d="M9.9 8.3a10.4 10.4 0 0 1 8.4 2.3 4.4 4.4 0 0 1-.3.9 9.4 9.4 0 0 0-7.8-2.3 4.4 4.4 0 0 1-.3-.9Z"
        fill="#fff"
      />
    </svg>
  );
}
