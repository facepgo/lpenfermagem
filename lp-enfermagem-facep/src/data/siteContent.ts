/**
 * Fonte única de verdade da landing page.
 * Textos, unidades, contatos, links e caminhos de imagem ficam concentrados
 * aqui — nenhum componente deve conter conteúdo fixo.
 *
 * Todos os dados vêm do próprio site da FACEP (facep.com.br). Nada de número,
 * preço, depoimento ou estatística inventada.
 */

import type { IconName } from '../components/icons/iconMap';

const WHATSAPP_NUMBER = '5562982871553';
const WHATSAPP_MESSAGE =
  'Olá! Vi a página do Curso Técnico em Enfermagem e quero saber mais sobre as vagas, os horários e os valores.';

/** Resolve o caminho da imagem respeitando a base do deploy (`/enf/`). */
const asset = (file: string) => `${import.meta.env.BASE_URL}assets/${file}`;

export const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export type Feature = {
  icon: IconName;
  title: string;
  description: string;
  /** Ocupa as duas colunas no mobile. Use no 3º card de um grupo de três:
   *  em 2 colunas ele sobraria sozinho na última fileira. */
  wide?: boolean;
};

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type GalleryImage = ImageAsset & {
  caption: string;
};

export type ScheduleOption = {
  badge: string;
  items: { icon: IconName; label: string }[];
  note?: string;
};

export type Unit = {
  name: string;
  addressLines: string[];
  phoneLabel: string;
  phoneHref: string;
};

export const siteContent = {
  contact: {
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappMessage: WHATSAPP_MESSAGE,
    whatsappUrl,
    phoneLabel: '(62) 98287-1553',
    phoneHref: 'tel:+5562982871553',
  },

  brand: {
    name: 'FACEP — Faculdade Científica de Ensino e Pesquisa',
    /** Versão azul, para o cabeçalho branco. */
    logo: {
      src: asset('logo-facep-h-dark.webp'),
      alt: 'FACEP — Faculdade Científica de Ensino e Pesquisa',
      width: 900,
      height: 347,
    },
    /** Versão branca, para o rodapé azul-marinho. */
    logoLight: {
      src: asset('logo-facep-h-light.webp'),
      alt: 'FACEP — Faculdade Científica de Ensino e Pesquisa',
      width: 900,
      height: 347,
    },
  },

  header: {
    homeHref: '#top',
    homeAriaLabel: 'FACEP — ir para o topo da página',
    ctaLabel: 'Fale conosco',
    ctaAriaLabel: 'Fale conosco pelo WhatsApp',
  },

  hero: {
    badge: 'Matrículas abertas — próxima turma',
    headline: {
      before: 'Torne-se ',
      highlight: 'Técnico em Enfermagem',
      after: ' em Goiânia',
    },
    subtitle: 'Aulas práticas desde o 1º Módulo',
    ctaLabel: 'QUERO GARANTIR MINHA VAGA',
    ctaHelper: 'Fale agora com a secretaria acadêmica',
    seals: ['MEC', 'COREN', 'SISTEC'],
    image: {
      src: asset('hero-aluna.webp'),
      alt: 'Três alunas da FACEP em frente à unidade: uma com material de estudo, uma de jaleco segurando um estetoscópio e uma formanda com beca e diploma',
      width: 1080,
      height: 1350,
    },
    floatingCard: {
      eyebrow: 'Próxima turma',
      title: 'Matrículas abertas — início imediato',
    },
  },

  trustBar: {
    id: 'beneficios',
    items: [
      {
        icon: 'graduation-cap',
        title: 'Diploma reconhecido',
        description: 'MEC — válido em todo o território nacional',
      },
      {
        icon: 'hospital',
        title: 'Estágio supervisionado',
        description: 'Nas melhores unidades de saúde de Goiânia',
      },
      {
        icon: 'book-open',
        title: '1.600 horas',
        description: '3 módulos de 400 horas + estágio',
        wide: true,
      },
    ] as Feature[],
    /** Grupo separado: o rótulo é o que amarra os três cursos numa trilha só. */
    certification: {
      label: 'Tripla certificação',
      note: 'Três certificados ao longo do mesmo curso, um a cada etapa concluída:',
      items: [
        {
          icon: 'hand-heart',
          title: 'Cuidador de Idosos',
          description: '1ª certificação — em 6 meses',
        },
        {
          icon: 'syringe',
          title: 'Auxiliar de Enfermagem',
          description: '2ª certificação — em 12 meses',
        },
        {
          icon: 'award',
          title: 'Téc. em Enfermagem',
          description: '3ª certificação — em 18 meses',
          wide: true,
        },
      ] as Feature[],
    },
  },

  audience: {
    eyebrow: 'Para você',
    title: 'Esse curso é para você que…',
    cards: [
      {
        icon: 'heart',
        title: 'Quer entrar na área da saúde',
        description: 'e busca rápida inserção no mercado, com foco em aprendizado prático.',
      },
      {
        icon: 'repeat',
        title: 'Está em transição de carreira',
        description: 'e precisa de uma formação técnica reconhecida e voltada para a prática.',
      },
      {
        icon: 'clipboard-list',
        title: 'Quer ampliar onde atuar',
        description: 'em hospitais, clínicas, asilos, laboratórios e atendimento domiciliar.',
      },
    ] as Feature[],
  },

  schedule: {
    id: 'cursos',
    eyebrow: 'Como funciona',
    title: 'Escolha o horário ideal para você',
    options: [
      {
        badge: 'Opção 1 — Durante a semana',
        items: [
          { icon: 'calendar-days', label: 'Turmas em dias de semana' },
          { icon: 'clock', label: 'Modalidade 100% presencial' },
          { icon: 'timer', label: 'Duração: 18 meses' },
        ],
      },
      {
        badge: 'Opção 2 — Finais de semana',
        items: [
          { icon: 'calendar-days', label: 'Turmas aos finais de semana' },
          { icon: 'clock', label: 'Modalidade 100% presencial' },
          { icon: 'timer', label: 'Duração: 24 meses' },
        ],
        note: 'Horários de cada turno: consulte a secretaria acadêmica.',
      },
    ] as ScheduleOption[],
    footnote: [
      'Carga horária de 1.600 horas • 3 módulos de 400 horas',
      '400 horas de estágio supervisionado em unidades reais do SUS',
    ],
  },

  gallery: {
    id: 'estrutura',
    eyebrow: 'Estrutura',
    title: 'Conheça nossa estrutura',
    description: 'Laboratório próprio, aulas práticas e estágio em ambientes reais de assistência à saúde.',
    location: 'Rua 03, Quadra 61, Lote 125, nº 170\nSetor Central, Goiânia - GO',
    images: [
      {
        src: asset('estrutura-01-unidade.webp'),
        alt: 'Fachada da unidade da FACEP em Goiânia',
        caption: 'Nossa unidade',
        width: 1200,
        height: 900,
      },
      {
        src: asset('estrutura-02-laboratorio.webp'),
        alt: 'Aluna da FACEP usando o microscópio no laboratório',
        caption: 'Laboratório de práticas',
        width: 1200,
        height: 900,
      },
      {
        src: asset('estrutura-03-pratica.webp'),
        alt: 'Alunas de jaleco e luvas durante uma aula prática de laboratório',
        caption: 'Aula prática em laboratório',
        width: 1200,
        height: 900,
      },
      {
        src: asset('estrutura-04-estagio.webp'),
        alt: 'Alunas em estágio no centro cirúrgico de uma unidade de saúde',
        caption: 'Estágio em ambiente hospitalar',
        width: 1200,
        height: 900,
      },
      {
        src: asset('estrutura-05-alunos.webp'),
        alt: 'Alunas da FACEP de jaleco, touca e máscara durante atividade prática',
        caption: 'Alunos em prática de enfermagem',
        width: 1200,
        height: 900,
      },
      {
        src: asset('estrutura-06-lampada.webp'),
        alt: 'Aluna acendendo a lâmpada durante a Cerimônia da Lâmpada da FACEP',
        caption: 'Cerimônia da Lâmpada',
        width: 1200,
        height: 900,
      },
      {
        src: asset('estrutura-07-formatura.webp'),
        alt: 'Formandos da FACEP com beca durante a cerimônia de formatura',
        caption: 'Formatura da turma',
        width: 1200,
        height: 900,
      },
      {
        src: asset('estrutura-08-colacao.webp'),
        alt: 'Formanda atravessando o palco durante a colação de grau',
        caption: 'Colação de grau',
        width: 1200,
        height: 900,
      },
    ] as GalleryImage[],
  },

  pricing: {
    eyebrow: 'Investimento',
    title: 'Condições especiais para matrículas antecipadas',
    badge: '🏷️ Matrículas abertas',
    benefits: [
      'Matrícula 100% online, em poucos minutos e sem burocracia',
      'Parcelamento e descontos informados pela secretaria acadêmica',
      'Condições especiais para matrículas antecipadas',
      'Processo seletivo em 3 passos: WhatsApp, matrícula online e início das aulas',
    ],
    disclaimer:
      '* Valores, formas de parcelamento e descontos são informados pela secretaria acadêmica da FACEP.',
    ctaLabel: 'CONSULTAR VALORES PELO WHATSAPP',
    warning: '⚠️ Garanta sua vaga na próxima turma',
  },

  units: {
    id: 'unidades',
    eyebrow: 'Unidade',
    title: 'Onde você vai estudar',
    items: [
      {
        name: 'Goiânia — GO',
        addressLines: ['Rua 03, Quadra 61, Lote 125, nº 170', 'Setor Central', 'CEP 74030-071'],
        phoneLabel: '(62) 98287-1553',
        phoneHref: 'tel:+5562982871553',
      },
    ] as Unit[],
  },

  finalCta: {
    id: 'contato',
    headline: ['Sua carreira na saúde', 'começa aqui'],
    subtitle: 'Matrículas abertas para a próxima turma',
    ctaLabel: '👇 FALAR COM A FACEP',
    ctaHelper: 'Fale agora com a secretaria acadêmica',
  },

  footer: {
    about:
      'FACEP — Faculdade Científica de Ensino e Pesquisa. Formação técnica em Goiânia, com diploma reconhecido pelo MEC.',
    navTitle: 'Navegação',
    nav: [
      { label: 'Diferenciais', href: '#beneficios' },
      { label: 'Cursos e Horários', href: '#cursos' },
      { label: 'Estrutura', href: '#estrutura' },
      { label: 'Localização', href: '#unidades' },
      { label: 'Contato', href: '#contato' },
    ],
    socialTitle: 'Fale com a FACEP',
    copyright: '© 2026 FACEP — Faculdade Científica de Ensino e Pesquisa. Todos os direitos reservados.',
  },

  floatingWhatsApp: {
    ariaLabel: 'Abrir WhatsApp',
  },
};

export type SiteContent = typeof siteContent;
