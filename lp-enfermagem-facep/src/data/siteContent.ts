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
  /** Fecha a descrição com a bandeira do Brasil. Fica aqui, e não no texto,
   *  para este arquivo continuar livre de JSX. */
  flag?: boolean;
};

/** Aviso central no formato de push: `source` é a linha de cima, como o nome
 *  do app numa notificação de celular. */
export type PushNotification = {
  icon: IconName;
  source: string;
  title: string;
  description: string;
};

/**
 * Depoimento público de aluno, exibido como a captura de tela original — é o
 * print que prova que o comentário existe; texto redigitado qualquer um faz.
 *
 * `alt` carrega a transcrição completa: sem ela o depoimento simplesmente não
 * existe para quem usa leitor de tela, e para o Google, que não lê imagem.
 */
export type Testimonial = {
  image: ImageAsset;
  caption: string;
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
  /**
   * Selo embaixo dos CTAs. Afirmação vaga de propósito, sem prometer prazo:
   * a referência anuncia "respondemos em até 5 minutos", que é promessa
   * mensurável — e falha sozinha toda vez que alguém escreve de madrugada,
   * porque a secretaria atende em horário comercial.
   */
  fastReply: 'Essa empresa responde muito rápido as mensagens',

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
        title: 'Diploma reconhecido pelo MEC',
        description: 'Válido em todo o território nacional',
        flag: true,
      },
      {
        icon: 'hospital',
        title: 'Estágio supervisionado',
        description: 'Nas melhores unidades de saúde de Goiânia',
      },
      {
        icon: 'map-pin',
        title: 'Localização privilegiada',
        description: 'No centro de Goiânia',
      },
      {
        icon: 'bus',
        title: 'Passe estudantil',
        description: 'Sitpass para alunos FACEP',
      },
      {
        icon: 'briefcase',
        title: 'Preparação para o mercado',
        description: 'Formação para sua carreira',
      },
      {
        icon: 'timer',
        title: 'Formação rápida',
        description: 'Formação a partir de 18 meses',
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
        badge: 'Opção 1 — Manhã',
        items: [
          { icon: 'calendar-days', label: 'Segunda a Quinta' },
          { icon: 'clock', label: '8h às 11h' },
          { icon: 'timer', label: 'Duração: 18 meses' },
          { icon: 'hospital', label: 'Estágio incluso' },
        ],
      },
      {
        badge: 'Opção 2 — Noite',
        items: [
          { icon: 'calendar-days', label: 'Segunda a Quinta' },
          { icon: 'clock', label: '19h às 22h' },
          { icon: 'timer', label: 'Duração: 18 meses' },
          { icon: 'hospital', label: 'Estágio incluso' },
        ],
      },
      {
        badge: 'Opção 3 — Sábado',
        items: [
          { icon: 'calendar-days', label: 'Sábado' },
          { icon: 'clock', label: '8h às 16h' },
          { icon: 'timer', label: 'Duração: 24 meses' },
          { icon: 'hospital', label: 'Estágio incluso' },
        ],
      },
    ] as ScheduleOption[],
  },

  gallery: {
    id: 'estrutura',
    eyebrow: 'Estrutura',
    title: 'Conheça nossa estrutura',
    description: 'Laboratório próprio, aulas práticas e estágio em ambientes reais de assistência à saúde.',
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

  /**
   * Depoimentos reais, exibidos como a captura de tela original em vez de
   * texto redigitado: o print é o que prova que o comentário existe.
   *
   * Falam da FACEP como instituição, não do curso de Enfermagem: nenhum dos
   * autores diz qual curso fez, e a de @patriciacamarg diz que o dela é o de
   * Necropsia e Tanatopraxia. Por isso o título da seção é sobre a escola, e
   * não "alunos de Enfermagem" — no print a pessoa lê o curso e o contexto,
   * que é justamente o que a transcrição solta esconderia.
   *
   * O `alt` de cada um carrega a transcrição: sem ele o depoimento não existe
   * para leitor de tela nem para o Google, que não leem imagem.
   */
  testimonials: {
    id: 'depoimentos',
    eyebrow: 'Depoimentos',
    title: 'Quem passou pela FACEP',
    description: 'Comentários públicos no Instagram e no Google da FACEP, como foram publicados.',
    items: [
      {
        image: {
          src: asset('depoimento-lidiane.png'),
          alt: 'Comentário de @lidiane.inverizzi.brossi no Instagram da FACEP: “Nunca me arrependi de ter escolhido a Facep como faculdade para depositar meus sonhos.”',
          width: 499,
          height: 62,
        },
        caption: 'Instagram · comentário no perfil da FACEP',
      },
      {
        image: {
          src: asset('depoimento-gil.png'),
          alt: 'Comentário de @gilaraujosilva123 no Instagram da FACEP: “Orgulho dessa professora e amigos de sala e administração da FACEP.”',
          width: 442,
          height: 62,
        },
        caption: 'Instagram · comentário no perfil da FACEP',
      },
      {
        image: {
          src: asset('depoimento-patricia.png'),
          alt: 'Comentário de @patriciacamarg no Instagram da FACEP: “Gostaria de registrar que iniciei agora em agosto meu curso de técnico em necro e tanato! Um sonho que carrego desde 2017! Estou feliz demais e sei que vai dar tudo certo!”',
          width: 459,
          height: 127,
        },
        caption: 'Instagram · comentário no perfil da FACEP',
      },
      {
        image: {
          src: asset('depoimento-joceilma.png'),
          alt: 'Avaliação de cinco estrelas de Joceilma Martins no Google: “Minha Filha estudou no Facep e realizou o sonho de estar concursada. Obrigada a toda equipe pela dedicação com seus alunos e por realizar sonhos!”',
          width: 675,
          height: 153,
        },
        caption: 'Google · avaliação da unidade, 5 estrelas',
      },
    ] as Testimonial[],
  },

  pricing: {
    eyebrow: 'Investimento',
    title: 'Investimento acessível para mudar sua vida',
    badge: '🏷️ Matrículas abertas',
    /**
     * Os dois números saem da lista e sobem para o topo do card. Preço perdido
     * entre seis itens de peso igual não é lido; é a informação que a pessoa
     * veio buscar nesta seção.
     *
     * O R$ 99,00 riscado é o valor de tabela da matrícula da FACEP, confirmado
     * pelo responsável em 10/09/2026. Preço riscado é a afirmação mais
     * fiscalizada de uma página de oferta — o Decreto 5.903/2006 exige que o
     * "de" tenha sido praticado de verdade. Não trocar por número maior para
     * engordar o desconto.
     */
    highlights: [
      {
        label: 'Matrícula',
        value: 'GRÁTIS',
        tone: 'free',
        strikePrice: 'R$ 99,00',
        finalPrice: 'R$ 0',
      },
      { label: 'Mensalidade a partir de', value: 'R$ 279,90', tone: 'price' },
    ],
    benefits: [
      'Descontos de pontualidade',
      'Desconto de até 30% para pagamento à vista',
      'Matrícula 100% online, em poucos minutos e sem burocracia',
      'Processo seletivo em 3 passos: WhatsApp, matrícula online e início das aulas',
    ],
    /** Sai a ressalva de que os valores ficam com a secretaria: a página passou
     *  a publicá-los, e a frase antiga contradizia a lista logo acima. */
    disclaimer:
      '* Condições confirmadas com a secretaria acadêmica no ato da matrícula.',
    ctaLabel: 'FALAR COM A SECRETARIA PELO WHATSAPP',
  },

  units: {
    id: 'unidades',
    eyebrow: 'Unidade',
    title: 'Onde estamos',
    /** Mesma fachada que abre a galeria — é a foto que identifica a unidade. */
    image: {
      src: asset('estrutura-01-unidade.webp'),
      alt: 'Fachada da unidade da FACEP no Setor Central, em Goiânia',
      width: 1200,
      height: 900,
    },
    items: [
      {
        name: 'Goiânia — GO',
        /* O endereço veio duplicado do Google Maps ("... Setor Central,
           Goiânia CEP 74030-071 - St. Central, Goiânia - GO, 74030-071").
           Aqui fica a versão sem repetição — é o mesmo endereço. */
        addressLines: [
          'Rua 03, Quadra 61, Lote 125, nº 170',
          'Setor Central, Goiânia - GO',
          'CEP 74030-071',
        ],
        phoneLabel: '(62) 98287-1553',
        phoneHref: 'tel:+5562982871553',
      },
    ] as Unit[],
  },

  finalCta: {
    id: 'contato',
    headline: ['Sua carreira na saúde', 'começa aqui'],
    subtitle: 'Matrículas abertas para a próxima turma',
    ctaLabel: 'FALAR COM A FACEP',
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

  /**
   * Avisos centrais, no formato de notificação push de celular.
   *
   * ⚠️ O NÚMERO TEM PRAZO DE VALIDADE — reveja toda segunda-feira.
   *
   * As duas frases afirmam fato sobre matrícula e vaga, e foram confirmadas
   * pelo responsável como dado real da secretaria em 10/09/2026. Mas "essa
   * semana" caduca: deixado parado, o mesmo número vira afirmação falsa na
   * semana seguinte, que é exatamente o que a página evita em todo o resto do
   * conteúdo. Ou a secretaria atualiza o número toda semana, ou estas duas
   * entradas saem e voltam as de `notifications`, que não dependem de data.
   */
  pushNotifications: [
    {
      icon: 'graduation-cap',
      source: 'FACEP',
      title: '87 alunos já se matricularam essa semana',
      description: 'Turma de Técnico em Enfermagem',
    },
    {
      icon: 'flame',
      source: 'FACEP',
      title: 'Restam poucas vagas para a próxima turma',
      description: 'Fale com a secretaria e garanta a sua',
    },
  ] as PushNotification[],

  /**
   * Avisos que entram um a um no canto inferior esquerdo, no formato das
   * notificações de página de pagamento da Hotmart.
   *
   * Lá o texto é "X pessoas interessadas nas últimas 24h", e funciona porque o
   * número sai do banco de vendas da própria Hotmart — tanto que existe um
   * mínimo configurável para esconder o aviso enquanto o número é baixo. Esta
   * landing não mede nada: o contato acontece no WhatsApp, fora da página, e
   * não há GTM instalado. Sem fonte, qualquer contagem aqui seria inventada.
   *
   * Então o formato é o da Hotmart e o conteúdo é fato verificável — tudo
   * abaixo já está publicado no facep.com.br e no resto desta página.
   */
  notifications: [
    {
      icon: 'circle-check',
      title: 'Matrículas abertas',
      description: 'Turma presencial com início imediato',
    },
    {
      icon: 'hospital',
      title: '400 horas de estágio',
      description: 'Em unidades reais do SUS de Goiânia',
    },
    {
      icon: 'award',
      title: 'Tripla certificação',
      description: 'Cuidador de Idosos, Auxiliar e Técnico',
    },
    {
      icon: 'graduation-cap',
      title: 'Diploma reconhecido pelo MEC',
      description: 'Válido em todo o território nacional',
    },
    {
      icon: 'calendar-days',
      title: 'Semana ou fim de semana',
      description: '18 ou 24 meses, 100% presencial',
    },
  ] as Feature[],
};

export type SiteContent = typeof siteContent;
