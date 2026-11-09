// Uso (na raiz do repositório): node ferramentas/sync-comum.js .
// Padroniza rodapé e "Estrutura física" em todas as páginas novas, copiando da home (fonte única).
// Rodar sempre que o rodapé ou a estrutura da home mudarem:  node sync-comum.js <raiz-do-repo>
const fs = require('fs');
const root = process.argv[2];
const home = fs.readFileSync(root + '/institucional/index.html', 'utf8');

const footer = home.match(/<footer>[\s\S]*?<\/footer>/)[0]
  .replace(/href="#(?!topo")([a-z-]+)"/g, 'href="/#$1"'); // nas outras páginas, âncoras apontam para a home
const e0 = home.indexOf('<!-- Estrutura física -->');
const e1 = home.indexOf('</section>', home.indexOf('id="estrutura"')) + '</section>'.length;
if (e0 < 0) throw new Error('Estrutura física não encontrada na home');
const estrutura = '<!-- comum:estrutura (cópia da home, gerada por sync-comum.js) -->\n' + home.slice(e0, e1).replace('<!-- Estrutura física -->\n', '') + '\n<!-- /comum:estrutura -->';

// politica-de-privacidade e 404.html: rodapé copiado por gerar-institucionais.js (rode-o também quando o rodapé mudar)
for (const pg of ['tecnico-enfermagem', 'tecnico-seguranca-do-trabalho', 'tecnico-necropsia', 'pos-tecnico-enfermagem', 'politica-de-privacidade']) {
  const p = `${root}/${pg}/index.html`;
  let h = fs.readFileSync(p, 'utf8');
  // rodapé igual ao da home
  h = h.replace(/<footer>[\s\S]*?<\/footer>/, footer);
  // galeria própria do curso sai (a galeria é a da Estrutura física, comum a todas)
  h = h.replace(/<!-- Galeria: [\s\S]*?<section class="sec" id="galeria">[\s\S]*?<\/section>\s*/, '');
  // Estrutura física: só nas páginas da lista COM_ESTRUTURA (08/11/2026: saiu de Técnico em Enfermagem)
  const COM_ESTRUTURA = []; // padrão das páginas de curso (08/11/2026): sem Estrutura física
  if (!COM_ESTRUTURA.includes(pg)) h = h.replace(/<!-- comum:estrutura[\s\S]*?<!-- \/comum:estrutura -->\s*/, '');
  else if (h.includes('<!-- comum:estrutura')) h = h.replace(/<!-- comum:estrutura[\s\S]*?<!-- \/comum:estrutura -->/, estrutura);
  else h = h.replace('<section class="final">', estrutura + '\n\n<section class="final">');
  fs.writeFileSync(p, h);
  console.log(pg, '| estrutura:', (h.match(/id="estrutura"/g) || []).length, '| galeria antiga:', h.includes('id="galeria"'), '| rodapé = home:', h.includes(footer));
}
