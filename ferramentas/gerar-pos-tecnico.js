// Uso (na raiz do repositório): node ferramentas/gerar-pos-tecnico.js . && node ferramentas/sync-comum.js .
// Recria a página do Pós-Técnico inteira; depois o sync-comum.js recoloca rodapé e Estrutura física.
// Gera pos-tecnico-enfermagem/index.html com os dados do "Plano de Curso das Especializações Técnicas em Enfermagem"
// (PDF no Drive, lido em 07/11/2026). Cabeçalho e rodapé vêm da home institucional.
const fs = require('fs');
const tabs = require('./tabs-lib.js');
const root = process.argv[2];
const home = fs.readFileSync(root + '/institucional/index.html', 'utf8');
const head = home.slice(0, home.indexOf('<main id="topo">'))
  .replace('<title>FACEP | Faculdade Científica de Ensino e Pesquisa</title>', '<title>Pós-Técnico em Enfermagem | FACEP</title>')
  .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="Pós-Técnico em Enfermagem na FACEP: 10 Especializações Técnicas de Nível Médio em Enfermagem, 360 horas, EAD com práticas presenciais, em Goiânia.">')
  .replace(/href="#(quem-somos|missao|estrutura|ambientes|contato|cursos)"/g, 'href="/#$1"');
const tail = home.slice(home.indexOf('<footer>'))
  .replace(/href="#(quem-somos|missao|historia|estrutura)"/g, 'href="/#$1"')
  .replace('Olá, FACEP! Vim pelo site institucional e gostaria de atendimento.', 'Olá, FACEP! Quero saber sobre o Pós-Técnico em Enfermagem.');
const chk = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path pathLength="1" d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const arrow = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path pathLength="1" d="M5 12h14"/><path pathLength="1" d="M13 6l6 6-6 6"/></svg>';
const I = {
  trab: '<rect pathLength="1" x="3" y="7" width="18" height="13" rx="2"/><path pathLength="1" d="M9 7V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v2"/><path pathLength="1" d="M12 11v5M9.5 13.5h5"/>',
  instr: '<circle pathLength="1" cx="6.5" cy="17.5" r="2.5"/><circle pathLength="1" cx="17.5" cy="17.5" r="2.5"/><path pathLength="1" d="M8.3 15.7L19 3M15.7 15.7L5 3"/>',
  hemo: '<path pathLength="1" d="M12 3s5.5 6.2 5.5 10a5.5 5.5 0 0 1-11 0C6.5 9.2 12 3 12 3z"/><path pathLength="1" d="M9.5 13.5a2.5 2.5 0 0 0 2.5 2.5"/>',
  urg: '<path pathLength="1" d="M3 12h4l2-4 3 8 2-4h7"/>',
  uti: '<rect pathLength="1" x="3" y="4" width="18" height="12" rx="2"/><path pathLength="1" d="M6 10h3l1.5-2.5 2 5 1.5-2.5h4"/><path pathLength="1" d="M9 20h6M12 16v4"/>',
  mental: '<path pathLength="1" d="M12 20c-4.5 0-8-3-8-8a8 8 0 0 1 16 0c0 2.2-1 3.8-2.5 5V20z"/><path pathLength="1" d="M9.5 10a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5"/>',
  obst: '<circle pathLength="1" cx="12" cy="6" r="2.8"/><path pathLength="1" d="M7 21v-5a5 5 0 0 1 10 0v5"/><path pathLength="1" d="M12 13.5v4M10 15.5h4"/>',
  onco: '<path pathLength="1" d="M9 21c0-4 6-6.5 6-11a3 3 0 0 0-6 0c0 4.5 6 7 6 11"/>',
  orto: '<path pathLength="1" d="M7.5 4.5a2 2 0 1 0-2.8 2.8 2 2 0 1 0 2.8 2.8l6.2 6.2a2 2 0 1 0 2.8 2.8 2 2 0 1 0 2.8-2.8 2 2 0 1 0-2.8-2.8L10.3 7.3a2 2 0 1 0-2.8-2.8z"/>',
  queim: '<path pathLength="1" d="M12 21a6 6 0 0 0 6-6c0-3.5-2.5-5.5-3.5-8.5-1.5 2-2 3.5-2.5 5C11 10 10 9 9.5 7.5 7.5 9.5 6 12 6 15a6 6 0 0 0 6 6z"/>'
};
// [ícone, nome, área, grupo, foco (do plano), módulos [nome, horas]]
const E = [
  ['trab', 'Saúde do Trabalhador', 'Saúde ocupacional', 'clin', 'Vigilância em saúde do trabalhador, Normas Regulamentadoras, riscos ocupacionais, PGR e PCMSO, doenças e exames ocupacionais.',
    [['Fundamentos da Saúde do Trabalhador e Educação em Saúde', 40], ['Epidemiologia e Vigilância em Saúde do Trabalhador', 30], ['Legislação e Normas Regulamentadoras Aplicadas', 50], ['Riscos Ocupacionais, Ergonomia e Biossegurança', 50], ['Prevenção e Planejamento: PGR e PCMSO', 30], ['Doenças e Exames Ocupacionais', 50], ['Primeiros Socorros Aplicados à Saúde do Trabalhador', 38]]],
  ['instr', 'Instrumentação Cirúrgica', 'Centro cirúrgico', 'crit', 'Biossegurança e cirurgia segura, Central de Material e Esterilização, anestesia e recuperação, tempos cirúrgicos e instrumentais.',
    [['Anatomia e Fisiologia Aplicada', 20], ['Ética, Legislação e Prontuário', 20], ['Biossegurança e Segurança do Paciente', 30], ['Microbiologia, Controle de Infecções e Central de Material e Esterilização (CME)', 48], ['Tipos de Anestesia e Recuperação Pós-Anestésica', 40], ['Tempos Cirúrgicos e Técnicas Básicas de Instrumentação', 50], ['Instrumentais Cirúrgicos Básicos e Específicos', 80]]],
  ['hemo', 'Hemodiálise', 'Nefrologia', 'clin', 'Assistência ao paciente renal em hemodiálise: acessos vasculares, equipamentos dialíticos, diálise peritoneal, transplante e intercorrências.',
    [['Anatomia e Fisiologia do Sistema Urinário', 40], ['Ética, Legislação, Registros de Enfermagem', 20], ['Biossegurança, Prevenção e Controle de Infecções', 25], ['Patologias Renais Agudas e Crônicas', 30], ['Terapias Renais Substitutivas: Transplante Renal e Diálise Peritoneal', 40], ['Hemodiálise, Acessos Vasculares e Equipamentos Dialíticos', 85], ['Assistência de Enfermagem nas Intercorrências em Hemodiálise', 48]]],
  ['urg', 'Urgência e Emergência / APH', 'Atendimento de urgência', 'crit', 'Atendimento pré-hospitalar e hospitalar: rede de urgência e regulação, suporte básico e avançado de vida, trauma e emergências clínicas.',
    [['Fundamentos em Urgência e Emergência', 50], ['Rede de Atenção às Urgências e Sistema de Regulação', 40], ['Suporte Básico e Avançado de Vida Adulto e Pediátrico', 30], ['Atendimento ao Paciente Politraumatizado', 55], ['Emergências Clínicas', 55], ['Emergências Psiquiátricas e Obstétricas', 58]]],
  ['uti', 'Terapia Intensiva', 'Cuidados críticos', 'crit', 'Assistência ao paciente crítico em UTI: monitorização hemodinâmica e ventilatória, farmacologia e procedimentos de enfermagem.',
    [['Fundamentos da Unidade de Terapia Intensiva', 50], ['Implicações Éticas e Legais do Técnico em Enfermagem na UTI', 30], ['Biossegurança, Segurança do Paciente e Controle de Infecções na UTI', 30], ['Fisiopatologia do Paciente Grave', 50], ['Monitorização Hemodinâmica e Ventilatória do Paciente Grave', 30], ['Cuidados de Enfermagem em Farmacologia Aplicada ao Paciente Grave', 30], ['Procedimentos de Enfermagem na UTI', 68]]],
  ['mental', 'Saúde Mental', 'Atenção psicossocial', 'clin', 'Cuidado na Rede de Atenção Psicossocial (RAPS): psicopatologias e psicofármacos, crises e redução de danos, Plano Terapêutico Singular.',
    [['Políticas Públicas em Saúde Mental', 60], ['Princípios da Ética e Cuidado Humanizado em Saúde Mental', 38], ['Cuidados de Enfermagem em Psicopatologias e Farmacologia Aplicada', 70], ['Cuidados de Enfermagem em Crises, Redução de Danos e Comunicação Assertiva', 40], ['Práticas Psicossociais e Plano Terapêutico Singular', 40], ['Enfermagem em Emergências Psiquiátricas', 40]]],
  ['obst', 'Obstetrícia e Neonatologia', 'Saúde materno-infantil', 'clin', 'Pré-natal de baixo risco, parto e puerpério, alojamento conjunto e aleitamento, emergências obstétricas e UTI Neonatal.',
    [['Humanização, Segurança e Ética no Cuidado Materno-Infantil', 40], ['Assistência de Enfermagem ao Pré-Natal de Baixo Risco', 40], ['Assistência ao Parto e Puerpério', 58], ['Assistência Imediata e Mediata ao Recém-Nascido', 40], ['Alojamento Conjunto e Aleitamento Materno', 40], ['Alta Complexidade: Emergências Obstétricas e Cuidados na UTI Neonatal', 70]]],
  ['onco', 'Oncologia', 'Cuidado oncológico', 'clin', 'Cuidado integral à pessoa com câncer: rastreio, diagnóstico e tratamento, farmacologia e acessos vasculares, cuidados paliativos e emergências.',
    [['Fundamentos da Oncologia', 50], ['Métodos de Rastreio, Diagnóstico e Tratamento do Câncer', 50], ['Cuidados de Enfermagem ao Paciente Oncológico', 60], ['Princípios Farmacológicos em Oncologia e Acessos Vasculares', 50], ['Cuidados Paliativos, Humanização e o Processo de Morte', 40], ['Emergências Oncológicas', 38]]],
  ['orto', 'Traumato-Ortopedia', 'Ortopedia', 'crit', 'Lesões traumáticas e ortopédicas: imobilizações e trações, emergências, feridas ortopédico-cirúrgicas e reabilitação funcional.',
    [['Fundamentos em Traumatologia e Ortopedia', 60], ['Técnicas de Imobilizações e Trações', 50], ['Ética e Segurança no Cuidado Ortopédico e Traumático', 30], ['Emergências Traumáticas e Ortopédicas', 50], ['Cuidados de Enfermagem em Feridas Traumáticas e Ortopédico-Cirúrgicas', 60], ['Reabilitação Funcional e Prevenção de Complicações', 38]]],
  ['queim', 'Assistência a Queimados', 'Unidade de queimados', 'crit', 'Do atendimento inicial aos cuidados críticos: avaliação da queimadura, curativos especiais, controle de infecção, dor e reabilitação.',
    [['Fisiopatologia, Classificação e Avaliação do Paciente Queimado', 78], ['Biossegurança, Controle de Infecção e Manejo de Curativos Especiais', 80], ['Atendimento Inicial, Emergência e Cuidados Críticos em Queimaduras', 65], ['Manejo da Dor, Reabilitação e Cuidados Psicossociais na Queimadura', 65]]]
];
for (const e of E) { const s = e[5].reduce((a, m) => a + m[1], 0); if (s !== 288) throw new Error(e[1] + ' soma ' + s); }
const nCrit = E.filter(e => e[3] === 'crit').length, nClin = E.length - nCrit;

const cards = E.map(([ic, name, area, grp, foco, mods], i) => `
      <article class="pc esp" data-area="${grp}" data-rv>
        <div class="pc-top"><span class="ibox"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${I[ic]}</svg></span><span class="num">${String(i + 1).padStart(2, '0')}/10</span></div>
        <div><span class="area">${area}</span><h3>Especialização Técnica em ${name}</h3></div>
        <p>${foco}</p>
        <ul><li>${chk}360 h: 288 h EAD + 72 h presenciais</li><li>${chk}${mods.length} módulos + estágio supervisionado</li></ul>
        <div class="pc-foot"><span class="status">Autorização: a confirmar</span><a class="pc-go" data-wa="Olá, FACEP! Quero saber sobre a Especialização Técnica em ${name}.">Saber mais${arrow}</a></div>
      </article>`).join('');

const grade = `<p>Todas as especializações têm <b>360 horas</b>: 288 h de módulos teóricos no Ambiente Virtual e 72 h de estágio e práticas supervisionadas presenciais.</p>
          <div class="mods">
            ${E.map(([, name, , , , mods], i) => `<details${i ? '' : ' open'}><summary>${name} <span>360 h</span></summary><ul>${mods.map(([m, hrs]) => `<li>${m} · <span>${hrs} h</span></li>`).join('')}<li>Estágio e Práticas Supervisionadas Presenciais · <span>72 h</span></li></ul></details>`).join('\n            ')}
          </div>`;

const items = [
  {t: 'Programa e Metodologia', h: `<p>As Especializações Técnicas de Nível Médio em Enfermagem ampliam a atuação do Técnico em Enfermagem em áreas específicas da assistência, com formação técnica, ética e humanizada.</p>
          <p>Modalidade <b>EAD com encontros presenciais obrigatórios</b>: carga horária total de <b>360 horas</b>, sendo 288 h teóricas no Ambiente Virtual de Aprendizagem da FACEP e 72 h (20%) de estágio e práticas supervisionadas presenciais.</p>
          <p>É possível cursar uma ou mais especializações, ao mesmo tempo ou em sequência.</p>
          <p>Eixo tecnológico <b>Ambiente e Saúde</b>. Oferta baseada na Resolução CEE/Pleno nº 04/2015 (EAD com até 20% presencial), na Resolução CNE/CEB nº 6/2012 e na Resolução COFEN nº 609/2019.</p>
          <h4>Metodologia</h4>
          <ul><li>Aulas expositivas dialogadas e interativas, no ambiente virtual e presencial.</li><li>Estudo de casos clínicos e situações-problema.</li><li>Fóruns de discussão e atividades colaborativas.</li><li>Simulações realísticas e práticas supervisionadas presenciais, nos laboratórios da FACEP ou em instituições parceiras credenciadas.</li><li>Relatórios, portfólios e projetos integradores.</li></ul>
          <h4>Recursos de ensino</h4>
          <p>Videoaulas, textos de apoio, artigos científicos, laboratórios virtuais e físicos, equipamentos simuladores e manuais técnicos, no Ambiente Virtual de Aprendizagem (AVA-FACEP).</p>
          <h4>Como você é avaliado</h4>
          <ul><li>No ambiente virtual: fóruns, estudos dirigidos, questionários, análise de casos clínicos, provas e portfólios.</li><li>Presencialmente: provas práticas e simuladas em laboratório, avaliação de desempenho técnico e avaliação do estágio.</li><li>Aprovação com média mínima de 60 pontos em cada componente e frequência mínima de 75%. Quem não atingir a média pode fazer atividades de recuperação, conforme o Regimento Acadêmico.</li></ul>
          <h4>Acessibilidade e inclusão</h4>
          <p>Adaptação de recursos didáticos, prazos, atividades e avaliações, com acompanhamento individual quando necessário, conforme a Lei Brasileira de Inclusão (Lei nº 13.146/2015). O ambiente virtual permite ajustar fonte, contraste e formato de leitura.</p>`},
  {t: 'Grade Curricular', h: grade},
  {t: 'Estágio e Parcerias', h: `<p>As <b>72 horas</b> presenciais de cada especialização são feitas em encontros ao longo do curso ou em estágio supervisionado ao final.</p>
          <h4>Prefeitura de Goiânia</h4>
          <p>Convênio com a Secretaria Municipal de Saúde de Goiânia (Contrato nº 008/2025, publicado no Diário Oficial do Município nº 8471, de 04/02/2025, com vigência de 5 anos), que permite usar as unidades públicas de saúde como campo de prática e estágio supervisionado:</p>
          <ul><li>UPA Novo Mundo e UPA Jardim América.</li><li>Centros de Saúde da Família do Setor Coimbra, Jardim Guanabara, Bairro Goiá, Setor Leste Universitário, Jardim Curitiba e Pedro Ludovico.</li><li>UBS Parque Amazônia.</li><li>UAIS Vila Mutirão.</li></ul>
          <h4>Instituições privadas</h4>
          <ul><li>Clínica e Hospital Coração de Jesus (ACLIMA): Urgência e Emergência, Terapia Intensiva e Saúde do Trabalhador.</li><li>Casa de Eurípedes (Obras Sociais Eurípedes Barsanulfo): Saúde Mental.</li><li>Instituto Metamorfose de Reabilitação e Cuidados Integrativos: Saúde Mental.</li><li>Instituto Casa de Idosos Amar Mais: assistência humanizada ao idoso.</li></ul>
          <h4>Supervisão</h4>
          <p>Estágio em instituições conveniadas, supervisionado por enfermeiros habilitados e acompanhado pela Coordenação de Estágios da FACEP.</p>
          <h4>Dispensa do estágio</h4>
          <p>Quem comprova pelo menos <b>6 meses de atuação profissional</b> na área da especialização pode pedir a dispensa, com análise dos documentos pelas coordenações de estágio e de cursos, conforme a Resolução COFEN nº 609/2019.</p>
          <h4>Documentos do estágio</h4>
          <ul><li>Termo de Compromisso de Estágio.</li><li>Ficha de Acompanhamento de Estágio.</li><li>Ficha de Avaliação de Desempenho, preenchida pelo enfermeiro supervisor.</li><li>Relatório Final de Estágio.</li></ul>`},
  {t: 'Corpo Docente', h: `<div class="people">
            <div><b>Carlos Magno Rodrigues Alves</b><small>Especialista em Enfermagem do Trabalho e Docência Universitária · Direção Geral</small></div>
            <div><b>Meillyne Alves dos Reis</b><small>Doutora em Enfermagem · Coordenação Acadêmica</small></div>
            <div><b>Lucas Vinícius Dias Pereira</b><small>Especialista em UTI Adulto e Fisiologia Humana · Coordenação de Cursos</small></div>
            <div><b>Carla Muriely Rodrigues Alves</b><small>Graduada em Pedagogia · Secretaria Acadêmica</small></div>
          </div>`},
  {t: 'Local e Horário', h: `<p>Teoria no <b>Ambiente Virtual de Aprendizagem</b>, com atividades no seu ritmo.</p>
          <p>Encontros presenciais em períodos programados, na sede da FACEP (<b>Rua 03, nº 170, Setor Central, Goiânia - GO</b>) ou em instituições parceiras. Consulte a equipe de matrículas sobre as datas.</p>`},
  {t: 'Perfil do Aluno', h: `<p>Para quem é <b>Técnico em Enfermagem</b> e quer se especializar em uma área da assistência, ampliando as possibilidades no mercado de trabalho.</p>`},
  {t: 'Objetivos e Qualificações', h: `<p>Formação técnica continuada para Técnicos em Enfermagem, com base em princípios éticos, científicos e humanísticos, fortalecendo a prática assistencial e ampliando as possibilidades de atuação profissional.</p>
          <h4>Ao concluir, você estará apto a</h4>
          <ul><li>Aplicar os conhecimentos técnico-científicos em situações da sua área de especialização.</li><li>Executar procedimentos e protocolos de enfermagem com segurança, ética e eficiência.</li><li>Trabalhar em equipe multiprofissional, com foco na segurança do paciente e na qualidade do cuidado.</li><li>Atuar conforme as normativas e protocolos vigentes do COFEN e do SUS.</li><li>Adotar condutas baseadas em evidências e nas boas práticas de cuidado.</li><li>Atuar de forma humanizada, empática e ética.</li><li>Promover educação em saúde para paciente, família e comunidade.</li><li>Usar ferramentas digitais e registros eletrônicos em saúde.</li></ul>
          <h4>Certificado</h4>
          <p>Certificado de Conclusão da Especialização Técnica em Enfermagem, com histórico escolar (disciplinas, carga horária, notas, frequência e ato autorizativo), validade nacional e <b>registro no COREN</b>, conforme a Resolução COFEN nº 609/2019.</p>
          <h4>Para receber o certificado</h4>
          <ul><li>Cumprir as 360 horas.</li><li>Média mínima de 60 pontos em cada componente e frequência mínima de 75%.</li><li>Entregar todas as atividades obrigatórias.</li><li>Cumprir o estágio supervisionado ou ter a dispensa aprovada.</li><li>Estar em dia com a documentação e a parte financeira na Secretaria Acadêmica.</li></ul>`},
  {t: 'Valor do Curso', h: `<p>Fale com a equipe de matrículas para consultar valores e condições de pagamento.</p>
          <a class="btn btn-acc btn-sm" data-wa="Olá, FACEP! Quero saber valores do Pós-Técnico em Enfermagem.">Consultar no WhatsApp<span class="dot"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path pathLength="1" d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path pathLength="1" d="M9 10h6M9 13h4"/></svg></span></a>`},
  {t: 'Processo Seletivo', h: `<p>Requisitos: <b>diploma de Técnico em Enfermagem</b> (ou declaração de conclusão) e <b>18 anos ou mais</b>.</p>
          <p>Documentos: CPF, RG, comprovante de endereço, comprovante de escolaridade de nível médio e, para homens, certificado de reservista. Processo seletivo simplificado, pela Secretaria da FACEP.</p>`},
  // O plano não traz duração em meses, datas nem horários dos encontros: fica marcado para pedir à FACEP.
  {t: 'Cronograma de Aulas', h: `<p>Cada especialização tem <b>360 horas</b>: 288 h de módulos teóricos no Ambiente Virtual, no seu ritmo, e 72 h de práticas presenciais em períodos programados.</p>
          <p><span class="draft">A solicitar à FACEP: duração em meses, datas das turmas e horários dos encontros presenciais</span></p>`},
  {t: 'Perguntas frequentes', h: `<div class="mods">
            <details><summary>Quem pode fazer o Pós-Técnico?</summary><ul><li>Quem tem diploma de Técnico em Enfermagem (ou declaração de conclusão) e 18 anos ou mais.</li></ul></details>
            <details><summary>O curso é EAD ou presencial?</summary><ul><li>EAD, com 288 h no Ambiente Virtual, e 72 h (20%) de práticas presenciais obrigatórias.</li></ul></details>
            <details><summary>Qual a carga horária?</summary><ul><li>360 horas em cada especialização.</li></ul></details>
            <details><summary>Posso fazer mais de uma especialização?</summary><ul><li>Sim. É possível cursar uma ou mais, ao mesmo tempo ou em sequência.</li></ul></details>
            <details><summary>O certificado vale para o COREN?</summary><ul><li>Sim. O certificado tem validade nacional e permite o registro da especialização no COREN, conforme a Resolução COFEN nº 609/2019.</li></ul></details>
            <details><summary>Já trabalho na área. Preciso fazer o estágio?</summary><ul><li>Quem comprova pelo menos 6 meses de atuação profissional na área da especialização pode pedir a dispensa do estágio, com análise dos documentos pela FACEP.</li></ul></details>
            <details><summary>Posso aproveitar estudos que já fiz?</summary><ul><li>Sim, se você comprovar formação equivalente. A FACEP analisa ementas, carga horária e conteúdos.</li></ul></details>
            <details><summary>Como sou aprovado?</summary><ul><li>Com média mínima de 60 pontos e frequência mínima de 75% em cada componente.</li></ul></details>
          </div>
          <a class="btn btn-acc btn-sm" data-wa="Olá, FACEP! Tenho uma dúvida sobre o Pós-Técnico em Enfermagem.">Falar com o time da FACEP<span class="dot"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path pathLength="1" d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path pathLength="1" d="M9 10h6M9 13h4"/></svg></span></a>`}
];


const ticker = ['10 especializações técnicas', '360 horas cada', '288 h EAD + 72 h presenciais', 'Registro no COREN', 'Para técnicos em enfermagem'].map(t => t + ' <i>✦</i>').join(' ');
const icP = {pessoa: '<circle pathLength="1" cx="12" cy="8" r="3.5"/><path pathLength="1" d="M5 20c1.2-3.6 3.8-5.5 7-5.5s5.8 1.9 7 5.5"/>', livro: '<path pathLength="1" d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5z"/><path pathLength="1" d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z"/>', pulso: '<path pathLength="1" d="M3 12h4l2-4 3 8 2-4h7"/>', estrela: '<path pathLength="1" d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1-4.5-4.2 6.1-.8z"/>', frasco: '<path pathLength="1" d="M9 3h6M10 3v6l-5.5 9.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path pathLength="1" d="M7.5 15h9"/>', sobe: '<path pathLength="1" d="M3 17l6-6 4 4 8-8"/><path pathLength="1" d="M15 7h6v6"/>'};
const svgP = k => '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + icP[k] + '</svg>';
const listaP = itens => '<ul>' + itens.map(i => '<li>' + chk + i + '</li>').join('') + '</ul>';
const pilaresHtml = [
  ['pessoa', 'Para quem é esse curso?', '<p>Para quem já é <b>Técnico em Enfermagem</b> e quer se especializar em uma área da assistência, ampliando as possibilidades de atuação profissional.</p>'],
  ['livro', 'O que você vai aprender', listaP(['Competências técnicas e científicas na área escolhida.', 'Uso adequado de tecnologias em saúde e práticas seguras de assistência.', 'Normativas e protocolos vigentes do COFEN e do SUS.'])],
  ['pulso', 'O que você será capaz de fazer', listaP(['Executar procedimentos e protocolos de enfermagem com segurança, ética e eficiência.', 'Trabalhar em equipe multiprofissional.', 'Atuar com foco na segurança do paciente e na qualidade do cuidado.'])]
].map(([ic, t, c]) => '\n      <article class="pc" data-rv><span class="ibox">' + svgP(ic) + '</span><h3>' + t + '</h3>' + c + '</article>').join('');
const identP = [
  ['Seu Sonho', 'Especialize-se na área que você escolher', 'São 10 especializações técnicas, da Terapia Intensiva à Oncologia.'],
  ['Seu Sonho', 'Estude no seu ritmo', '288 horas de teoria no Ambiente Virtual de Aprendizagem, com atividades assíncronas.'],
  ['Seu Sonho', 'Registro no COREN', 'Certificado com validade nacional para registro da especialização, conforme a Resolução COFEN nº 609/2019.'],
  ['Ação', '72 horas de prática presencial', 'Encontros e estágio supervisionado presenciais em cada especialização.'],
  ['Ação', 'Laboratórios e instituições parceiras', 'Práticas nos laboratórios da FACEP ou em instituições parceiras credenciadas.'],
  ['Ação', 'Estágio na rede de saúde', 'Convênio com a Secretaria Municipal de Saúde de Goiânia e parcerias com instituições privadas.'],
  ['Nova Carreira', 'Mais possibilidades de atuação', 'Formação continuada que fortalece a prática assistencial do técnico em enfermagem.'],
  ['Nova Carreira', 'Uma ou mais especializações', 'Você pode cursar mais de uma especialização, ao mesmo tempo ou em sequência.'],
  ['Nova Carreira', 'Atualizado com COFEN e SUS', 'Conteúdo alinhado às normativas e protocolos vigentes da enfermagem.']
].map(([g, t, x], i, arr) => '\n      <article class="pc esp"><div class="pc-top"><span class="ibox">' + svgP({'Seu Sonho': 'estrela', 'Ação': 'frasco', 'Nova Carreira': 'sobe'}[g]) + '</span><span class="num">' + String(i + 1).padStart(2, '0') + '/' + String(arr.length).padStart(2, '0') + '</span></div><div><span class="area">' + g + '</span><h3>' + t + '</h3></div><p>' + x + '</p></article>').join('');

const main = `<main id="topo">
<section class="page-hero">
  <div class="wrap curso-hero">
    <div>
    <nav class="crumbs" aria-label="Você está em"><a href="/">Início</a><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path pathLength="1" d="M9 6l6 6-6 6"/></svg><a href="/#cursos">Cursos</a><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path pathLength="1" d="M9 6l6 6-6 6"/></svg><span>Pós-Técnico em Enfermagem</span></nav>
    <p style="margin:22px 0 0"><span class="kind rec">Especializações Técnicas de Nível Médio</span></p>
    <h1 class="page-title" data-split>Pós-Técnico em <em>Enfermagem</em></h1>
    <p class="lead" data-rv>Para quem já é técnico em enfermagem e quer se especializar. 10 especializações de 360 horas, EAD com práticas presenciais e registro no COREN.</p>
    <div class="stats" data-rv>
      <div><b data-count="10">10</b><span>especializações técnicas</span></div>
      <div><b data-count="360">360</b><span>horas cada uma</span></div>
      <div><b data-count="20">20</b><span>% de práticas presenciais</span></div>
    </div>
    <div class="ctas" data-rv>
      <a class="btn btn-acc magnetic" data-wa="Olá, FACEP! Quero saber sobre o Pós-Técnico em Enfermagem.">Falar com a FACEP<span class="dot">${arrow}</span></a>
      <a class="btn btn-ghost magnetic" href="#especializacoes">Ver especializações<span class="dot">${arrow}</span></a>
    </div>
    </div>
    <figure class="curso-banner curso-banner-h" data-rv><img src="/institucional/assets/capa-pos-tecnico.webp" alt="Pós-Técnico em Enfermagem na FACEP" width="1200" height="990" fetchpriority="high"></figure>
  </div>
  <div class="marquee" aria-label="Destaques do curso"><div class="mq-track"><span>${ticker}</span><span aria-hidden="true">${ticker}</span></div></div>
</section>

<section class="sec" id="especializacoes" style="padding-top:48px">
  <div class="wrap">
    <div class="head-split">
      <div><span class="eyebrow">As 10 especializações</span><h2 class="h2" data-split>Escolha a sua <em>área</em></h2></div>
      <p class="lead" data-rv>A situação de autorização de cada curso aparece no card. <span class="draft">Aguardando situação oficial de cada curso</span></p>
    </div>
    <div class="filters" role="group" aria-label="Filtrar especializações">
      <button type="button" data-f="all" aria-pressed="true">Todas <b>10</b></button>
      <button type="button" data-f="crit" aria-pressed="false">Alta complexidade e cirurgia <b>${nCrit}</b></button>
      <button type="button" data-f="clin" aria-pressed="false">Cuidado clínico e especializado <b>${nClin}</b></button>
    </div>
    <div class="esp-grid">${cards}
    </div>
  </div>
</section>

<!-- Resumo do Plano de Curso das Especializações Técnicas em Enfermagem (PDF no Drive, 07/11/2026) -->
<section class="sec tight" id="sobre-o-curso">
  <div class="wrap">
    <div class="head-split">
      <div><span class="eyebrow">Sobre o curso</span><h2 class="h2" data-split>Tudo sobre a <em>formação</em></h2></div>
      <p class="lead" data-rv>Programa, grade curricular, estágio, corpo docente, valores, processo seletivo e perguntas frequentes.</p>
    </div>
    ${tabs('pos', items, 'Informações do Pós-Técnico em Enfermagem')}
  </div>
</section>

<section class="sec tight" id="pilares">
  <div class="wrap">
    <div class="head-split">
      <div><span class="eyebrow">O curso</span><h2 class="h2" data-split>Para quem é e o que <em>você aprende</em></h2></div>
    </div>
    <div class="grid3">${pilaresHtml}
    </div>
  </div>
</section>

<section class="sec" id="identidade" data-rail>
  <div class="wrap rail-head">
    <div><span class="eyebrow">Nossa identidade</span><h2 class="h2" data-split>A fórmula FACEP para <em>a sua carreira</em></h2></div>
  </div>
  <div class="rail">${identP}
  </div>
</section>

<section class="final">
  <div class="ring"></div><div class="ring r2"></div>
  <div class="wrap">
    <img class="crest" src="/tecnicoemenfermagem/assets/logo-facep-h-light.webp" alt="" width="905" height="347" loading="lazy">
    <h2 data-split>Dê o próximo <em>passo.</em></h2>
    <p>Especialize-se e amplie suas possibilidades na enfermagem.</p>
    <div class="ctas">
      <a class="btn btn-acc magnetic" data-wa="Olá, FACEP! Quero saber sobre o Pós-Técnico em Enfermagem.">Falar no WhatsApp<span class="dot">${arrow}</span></a>
      <a class="btn btn-ghost magnetic" href="/#cursos">Ver todos os cursos<span class="dot">${arrow}</span></a>
    </div>
  </div>
</section>
</main>

`;
fs.writeFileSync(root + '/pos-tecnico-enfermagem/index.html', head + main + tail);
console.log('ok', nCrit, nClin, (head + main + tail).includes('data-tema'));
