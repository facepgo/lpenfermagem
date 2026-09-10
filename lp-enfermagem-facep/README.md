# FACEP — Landing Page Técnico em Enfermagem

Landing page publicada em **https://facep.com.br/enf**.

O layout é uma reprodução da estrutura de `gabrielense.online` (grid, tipografia,
espaçamentos, animações), mas **todo o conteúdo, a marca, as cores, as fotos e os
contatos são da FACEP** — nada da escola de referência foi ao ar.

> A pasta ainda se chama `gabrielense-lp` por causa de um lock de processo no
> momento do deploy. Renomear para `lp-enfermagem-facep` não quebra nada: o
> `vite.config.ts` usa caminho relativo (`../enf`).

## Como rodar

```bash
npm install
npm run dev      # http://localhost:5173/enf/
npm run build    # typecheck + build direto em ../enf (pasta servida pela Vercel)
npm run preview
```

`base` é `/enf/` e `build.outDir` é `../enf`, então **o build já escreve na pasta
que a Vercel publica**. Depois de buildar, basta commitar `enf/` e fazer o deploy.

## Stack

| Item      | Escolha                                            |
| --------- | -------------------------------------------------- |
| Build     | Vite 8 + `@vitejs/plugin-react`                    |
| UI        | React 19 + TypeScript (strict)                     |
| Estilo    | Tailwind CSS v4 via `@tailwindcss/vite` (`@theme`) |
| Ícones    | `lucide-react` + glifo do WhatsApp próprio          |
| Animações | Intersection Observer + CSS (sem libs)             |

## Onde mexer no conteúdo

Tudo em **`src/data/siteContent.ts`**: textos, horários, unidade, telefone, link
do WhatsApp e caminhos de imagem. Nenhum componente tem texto fixo. Trocar o
WhatsApp é editar `WHATSAPP_NUMBER` — os 7 pontos de conversão acompanham.

Tokens visuais em `src/styles/globals.css`, bloco `@theme`:

| Token             | Valor     | Uso                                  |
| ----------------- | --------- | ------------------------------------ |
| `--color-deep`    | `#003050` | Fundo das seções azul-marinho        |
| `--color-brand`   | `#004F92` | Azul da Enfermagem — ícones, bordas  |
| `--color-gold`    | `#f6c919` | Destaques, badges, selos             |
| `--color-whatsapp`| `#3bca60` | Botões de conversão                  |

## Dados: tudo verificável

Toda afirmação da página veio do próprio site da FACEP (`facep.com.br`):
1.600 horas em 3 módulos de 400h, 18 meses (semana) / 24 meses (fim de semana),
100% presencial, 400h de estágio no SUS via convênio COAPES nº 008/2025 com a
Secretaria Municipal de Saúde de Goiânia, diploma reconhecido pelo MEC, dupla
certificação (Auxiliar → Técnico) e o endereço do Setor Central.

**Nada foi inventado.** Em particular:

- **Não há seção de depoimentos.** A FACEP não publica depoimento de aluno, e
  atribuir uma fala a uma pessoa real seria fabricar prova social. Assim que
  você tiver um depoimento autorizado (texto + nome + foto), a seção volta.
- **Não há contador de "alunos formados".** Mesmo motivo: não existe número
  publicado. Me passe o número real e eu recoloco o contador animado.
- **Não há preço na página.** O site da FACEP diz "consulte a secretaria
  acadêmica", então a seção de Investimento leva ao WhatsApp em vez de exibir
  mensalidade. Se quiser publicar valores, é só preencher `pricing`.

## Imagens

Todas em `public/assets/`, geradas a partir do material real da FACEP que já
estava no repositório (fotos de evento, laboratório, estágio e formatura).

| Arquivo                          | Origem                        | Uso                          |
| -------------------------------- | ----------------------------- | ---------------------------- |
| `hero-aluna.webp`                | `carrossel_07.webp`           | Card do hero (4:5)           |
| `estrutura-01-unidade.webp`      | `00.webp`                     | Fachada da unidade           |
| `estrutura-02-laboratorio.webp`  | `acao_01.webp`                | Microscópio no laboratório   |
| `estrutura-03-pratica.webp`      | `acao_02.webp`                | Aula prática                 |
| `estrutura-04-estagio.webp`      | `carreira_02.webp`            | Estágio no centro cirúrgico  |
| `estrutura-05-alunos.webp`       | `snapinsta-1787537148628.webp`| Alunos em prática            |
| `estrutura-06-lampada.webp`      | `carrossel_04.webp`           | Cerimônia da Lâmpada         |
| `estrutura-07-formatura.webp`    | `carrossel_08.webp`           | Formatura                    |
| `estrutura-08-colacao.webp`      | `carrossel_05.webp`           | Colação de grau              |
| `logo-facep-h-dark.webp`         | recorte de `sonho_02.webp`    | Logo azul (cabeçalho)        |
| `logo-facep-h-light.webp`        | recorte de `sonho_02.webp`    | Logo branco (rodapé)         |
| `favicon.png`                    | brasão do logo                | Favicon                      |

> **Logo:** as duas versões foram extraídas de uma arte promocional e
> recolorizadas por keying de luminância. Funciona bem nos tamanhos usados, mas
> um PNG/SVG oficial com fundo transparente fica melhor — é só sobrescrever os
> dois arquivos mantendo os nomes.

## Acessibilidade e performance

- Um único `<h1>`, hierarquia `h2`/`h3` correta, `alt` descritivo em tudo.
- Skip link, `aria-label` em botão só com ícone, foco visível (azul no claro,
  dourado no azul-marinho), navegação completa por teclado.
- `prefers-reduced-motion: reduce` desliga reveals e pulso.
- Hero com `fetchpriority="high"` e preload; resto com `loading="lazy"`.
- `width`/`height` em todas as imagens (sem layout shift). Assets ~700 KB.
- Sem rolagem horizontal de 320 px a 1920 px; zero erro de console.
