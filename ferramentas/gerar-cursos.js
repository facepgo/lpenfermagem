// Uso (na raiz do repositório): node ferramentas/gerar-cursos.js . && node ferramentas/sync-comum.js .
// Gera as páginas de curso técnico no padrão da página de Técnico em Enfermagem (08/11/2026):
// topo com banner do curso, faixa de destaques, "Tudo sobre a formação" (11 abas), pilares,
// "Nossa identidade" (cards de texto no estilo das especializações) e chamada final.
// Cabeçalho e rodapé vêm da home; depois rode o sync-comum.js.
// Regra: nada de número, preço ou afirmação sem fonte. O que a FACEP ainda não mandou fica
// como convite "Consulte ... com o time FACEP" (antes era o selo "A solicitar à FACEP"; trocado para a visita do CEE).
const fs = require('fs');
const tabs = require('./tabs-lib.js');
const root = process.argv[2];
const home = fs.readFileSync(root + '/institucional/index.html', 'utf8');

const SV = d => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
const ICO = {
  seta: '<path pathLength="1" d="M5 12h14"/><path pathLength="1" d="M13 6l6 6-6 6"/>',
  chev: '<path pathLength="1" d="M9 6l6 6-6 6"/>',
  zap: '<path pathLength="1" d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path pathLength="1" d="M9 10h6M9 13h4"/>',
  check: '<path pathLength="1" d="M5 12.5l4.5 4.5L19 7.5"/>',
  pessoa: '<circle pathLength="1" cx="12" cy="8" r="3.5"/><path pathLength="1" d="M5 20c1.2-3.6 3.8-5.5 7-5.5s5.8 1.9 7 5.5"/>',
  livro: '<path pathLength="1" d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5z"/><path pathLength="1" d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z"/>',
  pulso: '<path pathLength="1" d="M3 12h4l2-4 3 8 2-4h7"/>',
  estrela: '<path pathLength="1" d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1-4.5-4.2 6.1-.8z"/>',
  frasco: '<path pathLength="1" d="M9 3h6M10 3v6l-5.5 9.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path pathLength="1" d="M7.5 15h9"/>',
  sobe: '<path pathLength="1" d="M3 17l6-6 4 4 8-8"/><path pathLength="1" d="M15 7h6v6"/>'
};
const draft = t => `<span class="consulte">Consulte ${t} com o time FACEP. <a class="consulte-link" data-wa="Olá, FACEP! Vim pelo site e quero consultar datas e condições.">Falar com o time FACEP</a></span>`;
const waBtn = (txt, msg) => `<a class="btn btn-acc btn-sm" data-wa="${msg}">${txt}<span class="dot">${SV(ICO.zap)}</span></a>`;
const lista = itens => `<ul>${itens.map(i => `<li>${SV(ICO.check)}${i}</li>`).join('')}</ul>`;

function pagina(c) {
  const wa = `Olá, FACEP! Quero saber sobre o curso ${c.nome}.`;
  const head = home.slice(0, home.indexOf('<main id="topo">'))
    .replace('<title>FACEP | Faculdade Científica de Ensino e Pesquisa</title>', `<title>${c.nome} | FACEP</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${c.descricao}">`)
    .replace(/property="og:title" content="[^"]*"/, `property="og:title" content="${c.nome} | FACEP"`)
    .replace(/href="#(quem-somos|missao|estrutura|ambientes|contato|cursos)"/g, 'href="/#$1"');
  const tail = home.slice(home.indexOf('<footer>')).replace('Olá, FACEP! Vim pelo site institucional e gostaria de atendimento.', wa);
  const ticker = c.ticker.map(t => `${t} <i>✦</i>`).join(' ');
  const stats = c.stats ? `\n      <div class="stats" data-rv>${c.stats.map(([n, t, rot]) => `\n        <div><b${n ? ` data-count="${n}"` : ''}>${rot || n}</b><span>${t}</span></div>`).join('')}\n      </div>` : '';
  const pilares = c.pilares.map(([ic, tit, corpo]) => `\n      <article class="pc" data-rv><span class="ibox">${SV(ICO[ic])}</span><h3>${tit}</h3>${corpo}</article>`).join('');
  const total = c.identidade.length;
  const ident = c.identidade.map(([grupo, tit, txt], i) => `\n      <article class="pc esp"><div class="pc-top"><span class="ibox">${SV(ICO[{'Seu Sonho': 'estrela', 'Ação': 'frasco', 'Nova Carreira': 'sobe'}[grupo]])}</span><span class="num">${String(i + 1).padStart(2, '0')}/${String(total).padStart(2, '0')}</span></div><div><span class="area">${grupo}</span><h3>${tit}</h3></div><p>${txt}</p></article>`).join('');
  const main = `<main id="topo">
<section class="page-hero">
  <div class="wrap curso-hero">
    <div>
      <nav class="crumbs" aria-label="Você está em"><a href="/">Início</a>${SV(ICO.chev)}<a href="/#cursos">Cursos</a>${SV(ICO.chev)}<span>${c.nome}</span></nav>
      <p style="margin:22px 0 0"><span class="kind rec">${c.selo}</span></p>
      <h1 class="page-title" data-split>${c.titulo}</h1>
      <p class="lead" data-rv>${c.lead}</p>${stats}
      <div class="ctas" data-rv>
        <a class="btn btn-acc magnetic" data-wa="${wa}">Falar com a FACEP<span class="dot">${SV(ICO.seta)}</span></a>
        <a class="btn btn-ghost magnetic" href="#sobre-o-curso">Ver detalhes do curso<span class="dot">${SV(ICO.seta)}</span></a>
      </div>
    </div>
    <figure class="curso-banner curso-banner-h" data-rv><img src="${c.banner}" alt="${c.nome} na FACEP" width="1200" height="990" fetchpriority="high"></figure>
  </div>
  <div class="marquee" aria-label="Destaques do curso"><div class="mq-track"><span>${ticker}</span><span aria-hidden="true">${ticker}</span></div></div>
</section>

<section class="sec" id="sobre-o-curso">
  <div class="wrap">
    <div class="head-split">
      <div><span class="eyebrow">Sobre o curso</span><h2 class="h2" data-split>Tudo sobre a <em>formação</em></h2></div>
      <p class="lead" data-rv>Programa, grade curricular, estágio, corpo docente, valores, processo seletivo e perguntas frequentes.</p>
    </div>
    ${c.abasHtml || tabs(c.id, c.abas, 'Informações do curso ' + c.nome)}
  </div>
</section>

<section class="sec tight" id="pilares">
  <div class="wrap">
    <div class="head-split">
      <div><span class="eyebrow">O curso</span><h2 class="h2" data-split>Para quem é e o que <em>você aprende</em></h2></div>
    </div>
    <div class="grid3">${pilares}
    </div>
  </div>
</section>

<section class="sec" id="identidade" data-rail>
  <div class="wrap rail-head">
    <div><span class="eyebrow">Nossa identidade</span><h2 class="h2" data-split>A fórmula FACEP para <em>a sua carreira</em></h2></div>
  </div>
  <div class="rail">${ident}
  </div>
</section>

<section class="final">
  <div class="ring"></div><div class="ring r2"></div>
  <div class="wrap">
    <img class="crest" src="/tecnicoemenfermagem/assets/logo-facep-h-light.webp" alt="" width="905" height="347" loading="lazy">
    <h2 data-split>${c.chamada}</h2>
    <p>Consulte as vagas e saiba como se matricular.</p>
    <div class="ctas">
      <a class="btn btn-acc magnetic" data-wa="${wa}">Falar no WhatsApp<span class="dot">${SV(ICO.seta)}</span></a>
      <a class="btn btn-ghost magnetic" href="/#cursos">Ver todos os cursos<span class="dot">${SV(ICO.seta)}</span></a>
    </div>
  </div>
</section>
</main>

`;
  fs.mkdirSync(`${root}/${c.slug}`, {recursive: true});
  fs.writeFileSync(`${root}/${c.slug}/index.html`, head + main + tail);
  console.log(c.slug, 'ok');
}

// ---------- Técnico em Segurança do Trabalho (fonte: FACEP_Tecnico_em_Seguranca_do_Trabalho.pdf) ----------
const segAtual = fs.readFileSync(root + '/tecnico-seguranca-do-trabalho/index.html', 'utf8');
const t0 = segAtual.indexOf('<div class="tabs"');
const t1 = segAtual.indexOf('</section>', t0);
// Bloco das abas: do <div class="tabs"> até antes do </div> que fecha o .wrap da seção.
// Fecha os <div> que faltarem (antes, cada execução perdia um </div> e o bloco ficava aberto).
let segAbas = segAtual.slice(t0, segAtual.lastIndexOf('</div>', t1)).trim();
for (let falta = (segAbas.match(/<div[ >]/g) || []).length - (segAbas.match(/<\/div>/g) || []).length; falta > 0; falta--) segAbas += '\n</div>';
pagina({
  slug: 'tecnico-seguranca-do-trabalho', id: 'seg', nome: 'Técnico em Segurança do Trabalho',
  titulo: 'Técnico em <em>Segurança do Trabalho</em>', selo: 'Curso técnico · aulas presenciais',
  descricao: 'Técnico em Segurança do Trabalho na FACEP, em Goiânia: 1.440 horas, 240 horas de estágio, turmas durante a semana (18 meses) ou aos sábados (24 meses).',
  lead: 'Aprenda a identificar riscos, prevenir acidentes e orientar equipes para tornar os ambientes de trabalho mais seguros. Aulas presenciais, atividades on-line e prática supervisionada.',
  stats: [[1440, 'horas de formação', '1.440'], [240, 'horas de estágio obrigatório'], [18, 'ou 24 meses, conforme a turma']],
  banner: '/institucional/assets/capa-seguranca.webp',
  ticker: ['Duração de 18 ou 24 meses', 'Carga horária de 1.440 horas', '3 módulos', '240 horas de estágio supervisionado', 'Certificação intermediária de Auxiliar em Segurança do Trabalho'],
  abasHtml: segAbas,
  pilares: [
    ['pessoa', 'Para quem é esse curso?', '<p>Para quem já concluiu o Ensino Médio e quer trabalhar com prevenção de acidentes e saúde ocupacional.</p><p>Ao longo da formação, você desenvolve a capacidade de observar ambientes, analisar riscos e orientar pessoas sobre práticas seguras.</p>'],
    ['livro', 'O que você vai aprender', lista(['Normas Regulamentadoras, saúde ocupacional e ergonomia.', 'Prevenção e controle de riscos e primeiros socorros.', 'Segurança na construção civil, indústria, agroindústria e mineração.'])],
    ['pulso', 'O que você será capaz de fazer', lista(['Avaliar riscos nas instalações, nos equipamentos e nos procedimentos de trabalho.', 'Aplicar as NRs e propor medidas de prevenção.', 'Orientar equipes e participar da investigação de acidentes.'])]
  ],
  identidade: [
    ['Seu Sonho', 'Uma profissão técnica em 18 meses', 'Com turmas durante a semana, você conclui a formação em 18 meses; aos sábados, em 24 meses.'],
    ['Seu Sonho', 'Estude no turno que cabe na sua rotina', 'Aulas durante a semana ou aos sábados em período integral, para quem trabalha e quer mudar de área.'],
    ['Seu Sonho', 'Certificação já no caminho', 'O plano prevê certificação intermediária de Auxiliar em Segurança do Trabalho antes da habilitação técnica.'],
    ['Ação', 'Prática em laboratório', 'Aulas com práticas, estudos dirigidos, atividades em grupo e resolução de problemas do dia a dia profissional.'],
    ['Ação', '240 horas de estágio', 'Estágio supervisionado obrigatório em duas etapas, acompanhando a rotina real de segurança do trabalho.'],
    ['Ação', 'Ambiente Virtual de Aprendizagem', 'Atividades on-line no Ambiente Virtual da FACEP complementam as aulas presenciais.'],
    ['Nova Carreira', 'Atuação em vários setores', 'A formação prepara para a prevenção de riscos na construção civil, indústria, agroindústria e mineração.'],
    ['Nova Carreira', 'Normas Regulamentadoras na prática', 'Você aprende a aplicar as NRs e a propor medidas de prevenção nos ambientes de trabalho.'],
    ['Nova Carreira', 'Prevenção que protege pessoas', 'Orientar equipes, avaliar riscos e investigar acidentes para evitar novas ocorrências.']
  ],
  chamada: 'Comece sua <em>carreira.</em>'
});

// ---------- Técnico em Necropsia (fontes: textos de anúncio da FACEP de 2026, pôster do curso,
// Instagram @facepgo "Aulas presenciais em Goiânia"). Carga horária, grade e requisitos: a solicitar. ----------
const necWa = 'Olá, FACEP! Quero saber sobre o curso Técnico em Necropsia.';
pagina({
  slug: 'tecnico-necropsia', id: 'nec', nome: 'Técnico em Necropsia',
  titulo: 'Técnico em <em>Necropsia</em>', selo: 'Curso técnico · aulas presenciais',
  descricao: 'Técnico em Necropsia e Agente Funerário na FACEP, em Goiânia, com Tanatopraxia integrada à grade e estágios em necrotérios e funerárias.',
  lead: 'Formação técnica para atuar em procedimentos de necropsia e em serviços funerários, com Tanatopraxia integrada à grade e estágios em necrotérios e funerárias.',
  stats: null,
  banner: '/institucional/assets/capa-necropsia.webp',
  ticker: ['Técnico em Necropsia e Agente Funerário', 'Tanatopraxia integrada à grade', 'Estágios em necrotérios e funerárias', 'Aulas presenciais em Goiânia'],
  abas: [
    {t: 'Programa e Metodologia', h: `<p>O Técnico em Necropsia da FACEP forma profissionais para atuar em procedimentos de necropsia e em serviços funerários: são <b>dois cursos em um</b>, Técnico em Necropsia e Agente Funerário.</p>
          <p>A grade de <b>Tanatopraxia</b> está integrada ao curso. As aulas são presenciais, na sede da FACEP em Goiânia, com apostilas em PDF.</p>
          <p>${draft('carga horária total, duração em meses e metodologia de ensino')}</p>`},
    {t: 'Grade Curricular', h: `<p>A grade inclui a formação técnica em Necropsia, a qualificação de Agente Funerário e Tanatopraxia.</p><p>${draft('módulos, disciplinas e carga horária de cada uma')}</p>`},
    {t: 'Estágio e Parcerias', h: `<p>Os estágios estão <b>inclusos no curso</b> e acontecem em <b>necrotérios e funerárias</b>.</p><p>${draft('carga horária do estágio e lista de campos de estágio')}</p>`},
    {t: 'Corpo Docente', h: `<p>${draft('nomes e formação dos professores do curso')}</p>`},
    {t: 'Local e Horário', h: `<p>Sede da FACEP: <b>Rua 3, nº 170, Setor Central, Goiânia - GO</b>.</p><p>Consulte a equipe de matrículas para confirmar os dias e horários das turmas.</p>`},
    {t: 'Perfil do Aluno', h: `<p>Para quem quer trabalhar em necrotérios, serviços de verificação de óbito, institutos de medicina legal e serviços funerários.</p><p>${draft('requisitos de escolaridade e idade')}</p>`},
    {t: 'Objetivos e Qualificações', h: `<ul><li>Atuar nos procedimentos técnicos de necropsia.</li><li>Atuar como Agente Funerário.</li><li>Aplicar técnicas de Tanatopraxia.</li></ul><p>${draft('habilitação, certificações intermediárias e ato de autorização do curso')}</p>`},
    {t: 'Valor do Curso', h: `<p>Fale com a equipe de matrículas para consultar valores e condições de pagamento.</p>\n          ${waBtn('Consultar valores no WhatsApp', 'Olá, FACEP! Quero saber valores do Técnico em Necropsia.')}`},
    {t: 'Processo Seletivo', h: `<p>A matrícula é feita pela Secretaria da FACEP, que orienta sobre documentação e vagas.</p><p>${draft('requisitos e documentos para a matrícula')}</p>`},
    {t: 'Cronograma de Aulas', h: `<p>${draft('duração, turnos e datas das turmas')}</p>`},
    {t: 'Perguntas frequentes', h: `<div class="mods">
            <details><summary>O curso é presencial?</summary><ul><li>Sim. As aulas são presenciais, na sede da FACEP em Goiânia.</li></ul></details>
            <details><summary>O que quer dizer "dois cursos em um"?</summary><ul><li>A formação reúne o Técnico em Necropsia e a qualificação de Agente Funerário.</li></ul></details>
            <details><summary>O curso tem Tanatopraxia?</summary><ul><li>Sim. A grade de Tanatopraxia está integrada ao curso.</li></ul></details>
            <details><summary>Tem estágio?</summary><ul><li>Sim. Os estágios estão inclusos e acontecem em necrotérios e funerárias.</li></ul></details>
          </div>
          ${waBtn('Falar com o time da FACEP', necWa)}`}
  ],
  pilares: [
    ['pessoa', 'Para quem é esse curso?', '<p>Para quem quer trabalhar em necrotérios, serviços de verificação de óbito, institutos de medicina legal e serviços funerários.</p>'],
    ['livro', 'O que você vai aprender', lista(['Técnicas e procedimentos de necropsia.', 'Rotina e atendimento como Agente Funerário.', 'Tanatopraxia, integrada à grade do curso.'])],
    ['pulso', 'O que você será capaz de fazer', lista(['Atuar nos procedimentos técnicos de necropsia.', 'Trabalhar em funerárias e serviços funerários.', 'Aplicar técnicas de Tanatopraxia.'])]
  ],
  identidade: [
    ['Seu Sonho', 'Dois cursos em um', 'Técnico em Necropsia e Agente Funerário na mesma formação.'],
    ['Seu Sonho', 'Uma atuação essencial', 'Ciência que transforma a verdade em justiça.'],
    ['Ação', 'Estágios em necrotérios e funerárias', 'Os estágios estão inclusos no curso, em ambientes reais de trabalho.'],
    ['Ação', 'Laboratório de Anatomia Humana', 'Estudo prático da anatomia humana na sede da FACEP.'],
    ['Nova Carreira', 'Tanatopraxia na grade', 'A grade de Tanatopraxia está integrada ao curso.'],
    ['Nova Carreira', 'Uma carreira de grande impacto', 'Prepare-se para uma carreira diferenciada e de grande impacto.']
  ],
  chamada: 'Comece sua <em>carreira.</em>'
});
