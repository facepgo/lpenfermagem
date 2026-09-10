type WhatsAppIconProps = {
  className?: string;
};

/**
 * Marca do WhatsApp (bolha sólida com o fone vazado por `fill-rule="evenodd"`).
 * Herda a cor do texto para funcionar em botão verde, rodapé e botão flutuante.
 */
export function WhatsAppIcon({ className = 'h-5 w-5' }: WhatsAppIconProps) {
  return (
    // O viewBox é justo à bolha para o glifo ocupar a mesma área útil do botão.
    <svg
      viewBox="2.4 2.4 27.2 27.2"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.352.613 4.651 1.779 6.68L2.667 29.333l6.84-1.752A13.28 13.28 0 0 0 16 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16 2.667Zm6.9 16.573c-.36-.18-2.13-1.05-2.46-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.78.09-.36-.18-1.52-.56-2.9-1.79-1.07-.96-1.79-2.14-2-2.5-.21-.36-.02-.56.16-.74.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.29-.7-.59-.6-.81-.61l-.69-.01c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3s1.29 3.48 1.47 3.72c.18.24 2.54 3.88 6.15 5.44.86.37 1.53.59 2.05.76.86.27 1.65.23 2.27.14.69-.1 2.13-.87 2.43-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42Z"
      />
    </svg>
  );
}
