// Uso (na raiz do repositório): node ferramentas/gerar-institucionais.js . && node ferramentas/sync-comum.js .
// Gera a Política de Privacidade (LGPD) em /politica-de-privacidade e a página 404, com o cabeçalho e o rodapé da home.
// Criado em 08/11/2026 para a visita do CEE-GO.
// Dados da mantenedora: "Plano de Curso das Especializações Técnicas em Enfermagem", seção 1 (Drive, pasta "Planos de cursos").
// O que o site faz com dados foi conferido no código em 08/11/2026: sem formulário, sem cookies próprios, sem analytics,
// sem pixel e sem armazenamento no navegador. Se isso mudar (ex.: entrar Google Analytics ou Meta Pixel), atualize a seção 3.
const fs = require('fs');
const root = process.argv[2];
const home = fs.readFileSync(root + '/institucional/index.html', 'utf8');
const seta = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path pathLength="1" d="M9 6l6 6-6 6"/></svg>';
const arrow = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path pathLength="1" d="M5 12h14M13 6l6 6-6 6"/></svg>';

function cabeca(titulo, descricao, robots) {
  let h = home.slice(0, home.indexOf('<main id="topo">'))
    .replace('<title>FACEP | Faculdade Científica de Ensino e Pesquisa</title>', `<title>${titulo}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${descricao}">`)
    .replace(/property="og:title" content="[^"]*"/, `property="og:title" content="${titulo}"`)
    .replace(/href="#(quem-somos|missao|historia|estrutura|ambientes|contato|cursos)"/g, 'href="/#$1"');
  if (robots) h = h.replace('<meta name="description"', `<meta name="robots" content="${robots}">\n<meta name="description"`);
  return h;
}
const rodape = home.slice(home.indexOf('<footer>'))
  .replace(/href="#(?!topo")([a-z-]+)"/g, 'href="/#$1"');

// ---------- Política de Privacidade ----------
const atualizado = '8 de novembro de 2026';
const secoes = [
  ['quem', 'Quem é responsável pelos seus dados', `
      <p>O controlador dos dados pessoais tratados neste site e no atendimento da FACEP é a <b>Sociedade de Educação e Cultura FACEP LTDA</b>, nome fantasia <b>Faculdade Científica de Ensino e Pesquisa – FACEP</b>, CNPJ <b>35.277.291/0001-44</b>, com sede na Rua 03, Qd. 61, Lt. 125, nº 170, Setor Central, Goiânia - GO, CEP 74.030-071.</p>
      <p>Esta política segue a Lei Geral de Proteção de Dados Pessoais (<b>LGPD, Lei nº 13.709/2018</b>) e explica, de forma direta, quais dados tratamos, por quê e quais são os seus direitos.</p>`],
  ['site', 'O que este site coleta', `
      <p>O site <b>facep.com.br</b> é informativo. Ele <b>não tem formulário, não pede cadastro, não usa cookies próprios</b> e não usa ferramentas de análise de audiência ou de anúncios.</p>
      <p>Mesmo assim, alguns dados técnicos circulam quando você navega:</p>
      <ul>
        <li><b>Registros de acesso:</b> a empresa de hospedagem do site (Vercel) registra, por segurança e funcionamento, dados como endereço IP, navegador, página acessada, data e hora.</li>
        <li><b>Fontes e bibliotecas:</b> o visual do site usa fontes do Google Fonts e bibliotecas de animação do cdnjs (Cloudflare). Para entregá-las, esses serviços recebem o seu endereço IP e dados do navegador.</li>
        <li><b>Mapa:</b> o mapa da seção de contato é do Google Maps. Ao carregá-lo, o Google pode coletar dados e usar cookies conforme a política dele.</li>
      </ul>
      <p>Os servidores desses fornecedores podem ficar fora do Brasil. Nesses casos, a transferência internacional segue o que a LGPD permite (art. 33).</p>`],
  ['saida', 'Quando você sai do site', `
      <p>Alguns botões levam você a serviços de outras empresas, que têm políticas de privacidade próprias:</p>
      <ul>
        <li><b>WhatsApp</b> (Meta): botões "Falar no WhatsApp" e "Falar com o time FACEP". Antes de abrir a conversa, o site mostra um aviso; nenhum dado é enviado pelo site.</li>
        <li><b>Instagram</b> (Meta): link para o perfil @facepgo.</li>
        <li><b>Gestão Escolar</b>: botões "Sou aluno" e "Sou professor", que levam à Secretaria Online.</li>
        <li><b>Minha Biblioteca</b>: botão "Biblioteca virtual".</li>
      </ul>`],
  ['atendimento', 'Dados no atendimento e na matrícula', `
      <p><b>Atendimento.</b> Quando você fala com a FACEP pelo WhatsApp, telefone, Instagram ou presencialmente, usamos seu nome, telefone e o que você nos contar para responder e orientar sobre cursos, datas e condições.</p>
      <p><b>Matrícula e vida acadêmica.</b> Para matricular e manter o registro escolar, pedimos dados como nome, data de nascimento, CPF, RG, endereço, comprovante de escolaridade, diploma ou declaração do curso exigido e, para homens, certificado de reservista. Durante o curso, tratamos também notas, frequência, atividades e documentos de estágio.</p>
      <p>Usamos esses dados para:</p>
      <ul>
        <li>fazer e administrar a matrícula e o contrato de prestação de serviços educacionais;</li>
        <li>organizar aulas, avaliações, ambiente virtual de aprendizagem, biblioteca virtual e estágio supervisionado;</li>
        <li>emitir histórico escolar, certificados e diplomas;</li>
        <li>cumprir obrigações legais e regulatórias da educação, inclusive prestar informações aos órgãos de educação quando exigido.</li>
      </ul>`],
  ['bases', 'Bases legais', `
      <p>Tratamos dados com base nas hipóteses do art. 7º da LGPD, principalmente:</p>
      <ul>
        <li><b>procedimentos preliminares e execução de contrato</b>, no atendimento e na matrícula (inciso V);</li>
        <li><b>cumprimento de obrigação legal ou regulatória</b>, na guarda da documentação escolar e na prestação de informações aos órgãos de educação (inciso II);</li>
        <li><b>exercício regular de direitos</b> em processos, quando necessário (inciso VI);</li>
        <li><b>legítimo interesse</b>, na segurança do site e na melhoria do atendimento, sempre respeitando os seus direitos (inciso IX).</li>
      </ul>`],
  ['compartilhamento', 'Com quem compartilhamos', `
      <p>A FACEP <b>não vende</b> dados pessoais. Compartilhamos apenas o necessário com:</p>
      <ul>
        <li>órgãos públicos de educação e de fiscalização, quando a lei exigir;</li>
        <li>instituições de saúde e empresas conveniadas que recebem alunos em estágio supervisionado;</li>
        <li>fornecedores de sistemas que usamos para funcionar, como gestão escolar, ambiente virtual de aprendizagem, biblioteca virtual e hospedagem, que tratam os dados em nome da FACEP.</li>
      </ul>`],
  ['guarda', 'Por quanto tempo guardamos', `
      <p>Documentos e registros escolares (como matrícula, histórico e certificados) são guardados pelo prazo exigido pela legislação educacional, que pode ser permanente, para que você possa pedir segundas vias e comprovar sua formação.</p>
      <p>Os demais dados, como conversas de atendimento, são guardados apenas pelo tempo necessário para a finalidade para a qual foram coletados ou para cumprir obrigações legais.</p>`],
  ['seguranca', 'Como protegemos', `
      <p>Adotamos medidas técnicas e administrativas para proteger os dados contra acessos não autorizados, perda ou uso indevido, como acesso restrito à documentação na Secretaria Acadêmica e sistemas com login individual. O site é servido com conexão segura (HTTPS).</p>`],
  ['direitos', 'Seus direitos', `
      <p>Pelo art. 18 da LGPD, você pode pedir a qualquer momento:</p>
      <ul>
        <li>confirmação de que tratamos seus dados e acesso a eles;</li>
        <li>correção de dados incompletos, inexatos ou desatualizados;</li>
        <li>anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desacordo com a lei;</li>
        <li>portabilidade dos dados;</li>
        <li>informação sobre com quem compartilhamos seus dados;</li>
        <li>revogação do consentimento, quando o tratamento depender dele.</li>
      </ul>
      <p>Dados que a lei manda guardar, como o registro escolar, não podem ser eliminados a pedido, mas você continua podendo acessá-los e corrigi-los.</p>
      <p>Se achar que seus direitos não foram respeitados, você também pode reclamar à <b>Autoridade Nacional de Proteção de Dados (ANPD)</b>, em <a href="https://www.gov.br/anpd" target="_blank" rel="noopener">gov.br/anpd</a>.</p>`],
  ['contato', 'Como falar com a FACEP sobre seus dados', `
      <p>Para exercer seus direitos ou tirar dúvidas sobre esta política, fale com o encarregado pelo tratamento de dados da FACEP:</p>
      <ul>
        <li>E-mail: <a href="mailto:diretoriafacep@gmail.com">diretoriafacep@gmail.com</a></li>
        <li>Telefone: <a href="tel:+556236248303">(62) 3624-8303</a></li>
        <li>Presencialmente, na Secretaria Acadêmica: Rua 03, nº 170, Setor Central, Goiânia - GO.</li>
      </ul>
      <p>Para sua segurança, podemos pedir que você confirme sua identidade antes de atender o pedido.</p>`],
  ['menores', 'Menores de idade', `
      <p>Os cursos da FACEP são para maiores de 18 anos, e este site não é voltado a crianças e adolescentes.</p>`],
  ['mudancas', 'Mudanças nesta política', `
      <p>Podemos atualizar esta política quando mudarem nossos serviços ou a legislação. A data da última atualização fica sempre no início da página.</p>`]
];
const indice = secoes.map(([id, t], i) => `<li><a href="#${id}">${i + 1}. ${t}</a></li>`).join('');
const corpo = secoes.map(([id, t, h], i) => `
    <section id="${id}" class="legal-sec">
      <h2><span>${String(i + 1).padStart(2, '0')}</span>${t}</h2>${h}
    </section>`).join('');

const privacidade = cabeca('Política de Privacidade | FACEP', 'Política de Privacidade e proteção de dados (LGPD) da FACEP – Faculdade Científica de Ensino e Pesquisa, em Goiânia.') + `<main id="topo">
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Você está em"><a href="/">Início</a>${seta}<span>Política de Privacidade</span></nav>
    <p style="margin:22px 0 0"><span class="kind rec">LGPD · Lei nº 13.709/2018</span></p>
    <h1 class="page-title" data-split>Política de <em>Privacidade</em></h1>
    <p class="lead" data-rv>Como a FACEP trata e protege os seus dados pessoais no site, no atendimento e na vida acadêmica.</p>
    <p class="legal-data">Última atualização: ${atualizado}</p>
  </div>
</section>

<section class="sec tight">
  <div class="wrap legal">
    <nav class="legal-indice" aria-label="Nesta página"><b>Nesta página</b><ol>${indice}</ol></nav>
    <div class="legal-corpo">${corpo}
    </div>
  </div>
</section>
</main>

` + rodape;
fs.mkdirSync(root + '/politica-de-privacidade', {recursive: true});
fs.writeFileSync(root + '/politica-de-privacidade/index.html', privacidade);

// ---------- 404 ----------
const erro = cabeca('Página não encontrada | FACEP', 'A página que você procurou não existe ou mudou de endereço.', 'noindex') + `<main id="topo">
<section class="page-hero erro404">
  <div class="wrap">
    <p class="erro-num" aria-hidden="true">404</p>
    <h1 class="page-title">Página não <em>encontrada</em></h1>
    <p class="lead">O endereço que você acessou não existe ou mudou. Veja os caminhos abaixo ou fale com o time FACEP.</p>
    <div class="ctas">
      <a class="btn btn-acc magnetic" href="/">Ir para o início<span class="dot">${arrow}</span></a>
      <a class="btn btn-ghost magnetic" href="/#cursos">Ver cursos<span class="dot">${arrow}</span></a>
    </div>
    <ul class="erro-links">
      <li><a href="/tecnico-enfermagem">Técnico em Enfermagem</a></li>
      <li><a href="/tecnico-seguranca-do-trabalho">Técnico em Segurança do Trabalho</a></li>
      <li><a href="/tecnico-necropsia">Técnico em Necropsia</a></li>
      <li><a href="/pos-tecnico-enfermagem/">Pós-Técnico em Enfermagem</a></li>
      <li><a href="/#contato">Contato</a></li>
    </ul>
  </div>
</section>
</main>

` + rodape;
fs.writeFileSync(root + '/404.html', erro);
console.log('ok: politica-de-privacidade/index.html e 404.html');
