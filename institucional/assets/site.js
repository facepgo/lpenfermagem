/* FACEP institucional — interações e animações (GSAP + ScrollTrigger, com fallback sem animação). */
(function(){
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
const $ = id => document.getElementById(id);

/* Versões de cor. A versão B é o site oficial (raiz e /pos-tecnico-enfermagem, sem sufixo).
   A e C continuam em /institucional-a|c e /pos-tecnico-enfermagem-a|c (ou ?tema=), com o selo no canto;
   nelas, os links internos passam a manter a versão. */
const tema = document.documentElement.dataset.tema;
if(document.documentElement.hasAttribute('data-variante')){
  const casa = `/institucional-${tema}`;
  document.querySelectorAll('a[href^="/"]').forEach(a => {
    const h = a.getAttribute('href');
    if(h === '/' || h.startsWith('/#')) a.setAttribute('href', casa + h.slice(1));
    else if(/^\/(pos-tecnico-enfermagem|tecnico-seguranca-do-trabalho|tecnico-necropsia|tecnico-enfermagem)\/?(#|$)/.test(h)) a.setAttribute('href', h.replace(/^\/(pos-tecnico-enfermagem|tecnico-seguranca-do-trabalho|tecnico-necropsia|tecnico-enfermagem)\/?/, `/$1-${tema}`));
  });
  const nomes = {a:'Versão A · cores da LP de Enfermagem', b:'Versão B · vermelho e azul (oficial)', c:'Versão C · azul do site atual'};
  /* Página de curso atual (sem o sufixo da versão) ou a home */
  const pag = (location.pathname.match(/^\/(pos-tecnico-enfermagem|tecnico-seguranca-do-trabalho|tecnico-necropsia|tecnico-enfermagem)/) || [])[1];
  const ir = k => k === 'b' ? (pag ? '/' + pag : '/') : (pag ? `/${pag}-` : '/institucional-') + k;
  const outros = Object.keys(nomes).filter(k => k !== tema).map(k => `<a href="${ir(k)}">ver ${k.toUpperCase()}</a>`).join(' · ');
  const v = document.createElement('div'); v.className = 'ver';
  v.innerHTML = `<i></i><span><b>${nomes[tema]}</b> · ${outros}</span>`;
  document.body.appendChild(v);
  /* Fundo claro na versão C: troca o logo branco pelo logo colorido */
  if(tema === 'c') document.querySelectorAll('img[src$="logo-facep-h-light.webp"]').forEach(i => { i.src = i.src.replace('logo-facep-h-light', 'logo-facep-h-dark'); });
}

/* WhatsApp: antes de abrir a conversa, um aviso no formato do da LP /tecnicoemenfermagem.
   Texto adaptado em 07/11/2026: aulas presenciais no Setor Central e programas semipresenciais
   sob consulta. O WhatsApp abre dentro do clique em "Falar com o atendimento" (gesto do usuário,
   não é barrado como pop-up). Ctrl/Cmd/Shift + clique e "abrir em nova aba" vão direto. */
const WA = '5562982871553';
const WA_LOGO = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.534 5.845L.054 23.25a.75.75 0 0 0 .917.94l5.562-1.461A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.528-5.218-1.444l-.374-.224-3.876 1.018 1.037-3.78-.245-.39A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>';
const waUrl = msg => 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg || 'Olá, FACEP! Vim pelo site.');
const pop = document.createElement('div');
pop.className = 'wa-popup-overlay'; pop.id = 'waPopup'; pop.hidden = true;
pop.innerHTML = `<div class="wa-gate" role="dialog" aria-modal="true" aria-labelledby="waGateTitulo" aria-describedby="waGateTexto">
  <button type="button" class="wa-popup-close" data-fechar aria-label="Voltar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
  <span class="wa-gate-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/></svg></span>
  <h2 id="waGateTitulo">Antes de continuar</h2>
  <p id="waGateTexto">Nossas aulas são presenciais, na unidade do Setor Central de Goiânia. Também temos programas semipresenciais: consulte a disponibilidade com o nosso atendimento.</p>
  <div class="wa-gate-acoes">
    <button type="button" class="wa-gate-ok">${WA_LOGO}Falar com o atendimento</button>
    <button type="button" class="wa-gate-voltar" data-fechar>Voltar</button>
  </div>
</div>`;
document.body.appendChild(pop);
const waOk = pop.querySelector('.wa-gate-ok');
let waMsg = '', waFoco = null;
function abrirWa(msg, origem){
  waMsg = msg; waFoco = origem || null;
  pop.hidden = false; document.body.classList.add('lock');
  setTimeout(() => waOk.focus(), 30);
}
function fecharWa(){ pop.hidden = true; document.body.classList.remove('lock'); if(waFoco) waFoco.focus({preventScroll:true}); }
pop.addEventListener('click', e => { if(e.target === pop || e.target.closest('[data-fechar]')) fecharWa(); });
addEventListener('keydown', e => { if(e.key === 'Escape' && !pop.hidden) fecharWa(); });
waOk.addEventListener('click', () => { window.open(waUrl(waMsg), '_blank', 'noopener,noreferrer'); fecharWa(); });
document.querySelectorAll('[data-wa]').forEach(a => {
  a.href = waUrl(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener';
  a.addEventListener('click', e => {
    if(e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;
    e.preventDefault(); abrirWa(a.dataset.wa, a);
  });
});
/* Botão flutuante "Acesso acadêmico", ao lado do WhatsApp: abre um painel com
   Sou aluno, Sou professor e Biblioteca virtual (mesmos links da seção Ambientes acadêmicos). */
(function acessoAcademico(){
  const ICO = {
    cap: '<path d="M2.5 9L12 4.5 21.5 9 12 13.5z"/><path d="M6.5 11v4.5c1.5 1.6 3.4 2.5 5.5 2.5s4-.9 5.5-2.5V11"/><path d="M21.5 9v5"/>',
    aluno: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.2-3.6 3.8-5.5 7-5.5s5.8 1.9 7 5.5"/>',
    prof: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20l4-4 4 4"/><path d="M7 8.5h6M7 11.5h4"/>',
    livro: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z"/>',
    seta: '<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
    x: '<path d="M6 18L18 6M6 6l12 12"/>'
  };
  const svg = n => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICO[n]}</svg>`;
  const itens = [
    ['aluno', 'Sou aluno', 'Portal do Aluno · Gestão Escolar', 'https://facep.gestaoescolar.net.br/aluno'],
    ['prof', 'Sou professor', 'Gestão Escolar · ambiente do professor', 'https://facep.gestaoescolar.net.br'],
    ['livro', 'Biblioteca virtual', 'Minha Biblioteca', 'https://www.minhabiblioteca.com.br/']
  ];
  const btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'acad-fab'; btn.id = 'acadFab';
  btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'acadPainel');
  btn.innerHTML = svg('cap') + '<span>Acesso acadêmico</span>';
  const painel = document.createElement('div');
  painel.className = 'acad-painel'; painel.id = 'acadPainel'; painel.hidden = true;
  painel.setAttribute('role', 'dialog'); painel.setAttribute('aria-label', 'Acesso acadêmico');
  painel.innerHTML = `<div class="acad-topo"><b>Acesso acadêmico</b><button type="button" class="acad-x" aria-label="Fechar">${svg('x')}</button></div>`
    + itens.map(([ic, t, s, u]) => `<a href="${u}" target="_blank" rel="noopener"><span class="ibox">${svg(ic)}</span><span><b>${t}</b><small>${s}</small></span><span class="go">${svg('seta')}</span></a>`).join('');
  document.body.append(painel, btn);
  const abrir = on => { painel.hidden = !on; btn.setAttribute('aria-expanded', String(on)); btn.classList.toggle('on', on); if(on) painel.querySelector('a').focus({preventScroll:true}); };
  btn.addEventListener('click', () => abrir(painel.hidden));
  painel.querySelector('.acad-x').addEventListener('click', () => { abrir(false); btn.focus(); });
  document.addEventListener('click', e => { if(!painel.hidden && !painel.contains(e.target) && !btn.contains(e.target)) abrir(false); });
  addEventListener('keydown', e => { if(e.key === 'Escape' && !painel.hidden){ abrir(false); btn.focus(); } });
})();

/* Botão flutuante: só o ícone, como nas LPs */
const fabEl = document.getElementById('waFab');
if(fabEl){ fabEl.innerHTML = WA_LOGO; fabEl.setAttribute('aria-label', 'Falar no WhatsApp'); }

/* Formulário "Inicie sua matrícula": monta a mensagem e abre o WhatsApp (nada é gravado no site) */
const matForm = $('matForm');
if(matForm) matForm.addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(matForm);
  const msg = `Olá, FACEP! Meu nome é ${f.get('nome')} ${f.get('sobrenome')} (WhatsApp: ${f.get('whatsapp')}). Quero me matricular no Técnico em Enfermagem, turma: ${f.get('turma')}.`;
  window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
});

/* Links ainda sem endereço definitivo: avisa em vez de levar a lugar nenhum */
const toast = $('toast');
let tt;
document.addEventListener('click', e => {
  const a = e.target.closest('[data-pending]'); if(!a) return;
  e.preventDefault();
  if(!toast) return;
  toast.innerHTML = '<b>Prévia:</b> ' + a.dataset.pending;
  toast.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('show'), 3200);
});

/* Rodapé: "Voltar ao topo" sobe até o início da página (inclusive a barra de acesso) */
document.querySelectorAll('[data-topo]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'}); }));

/* Nav e menu */
const nav = $('nav'), menu = $('menu'), menuBtn = $('menuBtn'), fab = $('waFab');
let lastY = scrollY;
addEventListener('scroll', () => {
  const y = scrollY;
  if(nav && !document.body.classList.contains('lock')) nav.classList.toggle('hide', y > lastY && y > 520);
  lastY = y;
}, {passive:true});
function setMenu(open){
  menu.hidden = !open; menu.classList.toggle('show', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  document.body.classList.toggle('lock', open);
  nav.classList.remove('hide');
}
if(menuBtn){
  menuBtn.addEventListener('click', () => setMenu(menu.hidden));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if(e.key === 'Escape' && !menu.hidden) setMenu(false); });
}

/* Spotlight nos cards e botões magnéticos */
document.querySelectorAll('.pc').forEach(c => c.addEventListener('pointermove', e => { const b = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - b.left) + 'px'); c.style.setProperty('--my', (e.clientY - b.top) + 'px'); }));
if(!reduce && fine){
  document.querySelectorAll('.magnetic').forEach(b => {
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width/2) * .16}px,${(e.clientY - r.top - r.height/2) * .26}px)`; });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
}

/* Trilhos de cards (Nossos cursos, Nossa identidade): controle com setas e barra arrastável,
   acima e abaixo dos cards. A barra mostra a parte visível; arrastar ou clicar nela rola os cards. */
document.querySelectorAll('[data-rail]').forEach(wrap => {
  const rail = wrap.querySelector('.rail');
  if(!rail) return;
  const seta = d => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path pathLength="1" d="${d ? 'M5 12h14M13 6l6 6-6 6' : 'M19 12H5M11 6l-6 6 6 6'}"/></svg>`;
  const step = () => { const c = rail.querySelector('.pc'); return c ? c.getBoundingClientRect().width + 12 : 300; };
  const ir = dx => rail.scrollBy({left: dx, behavior: reduce ? 'auto' : 'smooth'});
  const fazer = () => {
    const c = document.createElement('div'); c.className = 'wrap rail-ctrl';
    c.innerHTML = `<button type="button" class="rc-prev" aria-label="Cards anteriores">${seta(0)}</button>
      <div class="rc-track" role="scrollbar" aria-orientation="horizontal" aria-label="Deslizar os cards" tabindex="0"><i></i></div>
      <button type="button" class="rc-next" aria-label="Próximos cards">${seta(1)}</button>`;
    c.querySelector('.rc-prev').addEventListener('click', () => ir(-step()));
    c.querySelector('.rc-next').addEventListener('click', () => ir(step()));
    const track = c.querySelector('.rc-track');
    track.addEventListener('keydown', e => { if(e.key === 'ArrowRight'){ e.preventDefault(); ir(step()); } if(e.key === 'ArrowLeft'){ e.preventDefault(); ir(-step()); } });
    /* arrastar/clicar na barra */
    let arr = false;
    const posicao = x => {
      const r = track.getBoundingClientRect(), vis = rail.clientWidth / rail.scrollWidth;
      const f = Math.min(1, Math.max(0, (x - r.left - r.width * vis / 2) / (r.width * (1 - vis) || 1)));
      rail.scrollLeft = f * (rail.scrollWidth - rail.clientWidth);
    };
    track.addEventListener('pointerdown', e => { arr = true; track.setPointerCapture(e.pointerId); track.classList.add('arr'); posicao(e.clientX); });
    track.addEventListener('pointermove', e => { if(arr) posicao(e.clientX); });
    const solta = () => { arr = false; track.classList.remove('arr'); };
    track.addEventListener('pointerup', solta); track.addEventListener('pointercancel', solta);
    return c;
  };
  const cima = fazer(), baixo = fazer();
  rail.before(cima); rail.after(baixo);
  const ctrls = [cima, baixo];
  const upd = () => {
    const max = rail.scrollWidth - rail.clientWidth, vis = Math.min(1, rail.clientWidth / rail.scrollWidth);
    const pos = max > 0 ? rail.scrollLeft / max : 0;
    ctrls.forEach(c => {
      c.hidden = max <= 2;
      const i = c.querySelector('.rc-track i');
      i.style.width = (vis * 100) + '%';
      i.style.left = (pos * (1 - vis) * 100) + '%';
      c.querySelector('.rc-prev').disabled = rail.scrollLeft <= 2;
      c.querySelector('.rc-next').disabled = rail.scrollLeft >= max - 2;
      c.querySelector('.rc-track').setAttribute('aria-valuenow', String(Math.round(pos * 100)));
    });
  };
  rail.addEventListener('scroll', upd, {passive:true}); addEventListener('resize', upd); upd();
});

/* Abas de informações do curso: um painel visível por vez; setas do teclado trocam de aba */
document.querySelectorAll('[data-tabs]').forEach(box => {
  const tabs = [...box.querySelectorAll('[role="tab"]')];
  const show = (t, focus) => {
    tabs.forEach(x => {
      const on = x === t;
      x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1;
      document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
    });
    if(focus) t.focus({preventScroll:true});
    /* No celular a lista de abas rola na horizontal: traz a aba escolhida para a vista sem mexer na página */
    const list = t.parentElement;
    if(list.scrollWidth > list.clientWidth) list.scrollTo({left: t.offsetLeft - 16, behavior: reduce ? 'auto' : 'smooth'});
    if(window.ScrollTrigger) ScrollTrigger.refresh();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(t));
    t.addEventListener('keydown', e => {
      const d = {ArrowDown:1, ArrowRight:1, ArrowUp:-1, ArrowLeft:-1}[e.key];
      if(d){ e.preventDefault(); show(tabs[(i + d + tabs.length) % tabs.length], true); }
    });
  });
});

/* Filtros (Pós-Técnico) */
const filters = document.querySelector('.filters');
if(filters){
  filters.addEventListener('click', e => {
    const b = e.target.closest('button'); if(!b) return;
    filters.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    const f = b.dataset.f;
    document.querySelectorAll('.esp').forEach(c => { c.hidden = !(f === 'all' || c.dataset.area === f); });
    if(window.ScrollTrigger) ScrollTrigger.refresh();
  });
}

/* Hero: fita em espiral azul (canvas) */
(function coil(){
  const cv = $('coil'); if(!cv) return;
  const ctx = cv.getContext('2d');
  let w = 0, h = 0, dpr = 1, mx = 0, my = 0, tx = 0, ty = 0, run = true, raf = 0;
  const N = 280;
  const [cr, cg, cb] = (getComputedStyle(document.documentElement).getPropertyValue('--coil') || '91,157,255').split(',').map(n => +n);
  const tint = (c, d) => Math.round(c + (255 - c) * d * .45);
  function size(){ dpr = Math.min(2, devicePixelRatio || 1); const r = cv.getBoundingClientRect(); w = r.width; h = r.height; cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
  function draw(ms){
    const t = ms * .001; mx += (tx - mx) * .04; my += (ty - my) * .04;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
    const mobile = w < 960;
    const S = mobile ? Math.min(w * .36, h * .42) : Math.min(w, h) * .40;
    const cx = mobile ? w * .5 : w * .72, cy = mobile ? h * .52 : h * .46;
    const ay = t * .22 + mx * .7, ax = 1.05 + my * .35, persp = 3.6;
    const cay = Math.cos(ay), say = Math.sin(ay), cax = Math.cos(ax), sax = Math.sin(ax);
    ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round';
    for(let i = 0; i < N; i++){
      const u = i / N * Math.PI * 2;
      const R = 1 + .12 * Math.sin(2 * u - t * .5), px = Math.cos(u) * R, pz = Math.sin(u) * R, py = .18 * Math.sin(3 * u + t * .9);
      const phi = 2 * u + t * .7, dx = Math.cos(u) * Math.cos(phi), dy = Math.sin(phi), dz = Math.sin(u) * Math.cos(phi);
      const hw = .3 + .06 * Math.sin(5 * u + t);
      const pts = [[px - dx * hw, py - dy * hw, pz - dz * hw], [px + dx * hw, py + dy * hw, pz + dz * hw]].map(([x, y, z]) => {
        const x1 = x * cay + z * say, z1 = -x * say + z * cay, y2 = y * cax - z1 * sax, z2 = y * sax + z1 * cax, f = persp / (persp - z2);
        return [cx + x1 * S * f, cy + y2 * S * f, z2, f];
      });
      const depth = Math.max(0, Math.min(1, ((pts[0][2] + pts[1][2]) / 2 + 1.4) / 2.8));
      ctx.strokeStyle = `rgba(${tint(cr, depth)},${tint(cg, depth)},${tint(cb, depth)},${.05 + depth * depth * .75})`;
      ctx.lineWidth = (.6 + depth * 1.4) * pts[0][3];
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); ctx.lineTo(pts[1][0], pts[1][1]); ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
  }
  function loop(ms){ if(!run) return; draw(ms); raf = requestAnimationFrame(loop); }
  size(); draw(4000);
  addEventListener('resize', () => { size(); draw(performance.now()); });
  if(reduce) return;
  addEventListener('pointermove', e => { tx = e.clientX / innerWidth - .5; ty = e.clientY / innerHeight - .5; }, {passive:true});
  new IntersectionObserver(([e]) => { const v = e.isIntersecting && !document.hidden; if(v && !run){ run = true; raf = requestAnimationFrame(loop); } else if(!v){ run = false; cancelAnimationFrame(raf); } }).observe(cv);
  raf = requestAnimationFrame(loop);
})();

/* Manifesto palavra a palavra */
const mf = $('manifesto');
if(mf){
  [...mf.childNodes].forEach(n => {
    if(n.nodeType === 3){ const fr = document.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach(p => { if(!p) return; if(/^\s+$/.test(p)) fr.appendChild(document.createTextNode(p)); else { const s = document.createElement('span'); s.className = 'mw'; s.textContent = p; fr.appendChild(s); } }); n.replaceWith(fr); }
    else if(n.nodeType === 1) n.classList.add('mw');
  });
}

if(!window.gsap || !window.ScrollTrigger || reduce){
  document.querySelectorAll('.step').forEach(s => s.classList.add('on'));
  document.querySelectorAll('[data-count]').forEach(n => n.textContent = n.dataset.count);
  return;
}
gsap.registerPlugin(ScrollTrigger);

/* Títulos palavra a palavra */
document.querySelectorAll('[data-split]').forEach(el => {
  const words = [];
  const walk = node => [...node.childNodes].forEach(n => {
    if(n.nodeType === 3){
      const fr = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(p => { if(!p) return; if(/^\s+$/.test(p)){ fr.appendChild(document.createTextNode(' ')); return; }
        const o = document.createElement('span'); o.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.2em;margin-bottom:-.2em';
        const i = document.createElement('span'); i.style.display = 'inline-block'; i.textContent = p; o.appendChild(i); fr.appendChild(o); words.push(i); });
      n.replaceWith(fr);
    } else if(n.nodeType === 1 && n.tagName !== 'BR' && n.tagName.toLowerCase() !== 'svg') walk(n);
  });
  walk(el);
  const top = el.getBoundingClientRect().top < innerHeight;
  gsap.from(words, {yPercent:110, rotate:3, duration:1, ease:'power4.out', stagger:.04, delay: top ? .1 : 0, scrollTrigger: top ? null : {trigger: el, start:'top 92%', once:true}});
});

/* Blocos que sobem ao entrar na tela */
gsap.utils.toArray('[data-rv]').forEach(el => {
  if(el.getBoundingClientRect().top < innerHeight * .9){ gsap.from(el, {y:24, opacity:.2, duration:.9, ease:'power3.out', delay:.25}); return; }
  gsap.from(el, {y:30, opacity:.15, duration:.9, ease:'power3.out', scrollTrigger:{trigger: el, start:'top 92%', once:true}});
});
/* Ícones que se desenham */
gsap.utils.toArray('.pc .ibox .ic, .c-list .ic, .portal .ibox .ic, .flow .n .ic').forEach(s => {
  gsap.fromTo(s.querySelectorAll('*'), {strokeDashoffset:1}, {strokeDashoffset:0, duration:1.2, ease:'power2.inOut', stagger:.07, scrollTrigger:{trigger: s, start:'top 94%', once:true}});
});
/* Galeria: fotos entram em cascata */
gsap.utils.toArray('.gal figure').forEach((f, i) => gsap.from(f, {y:40, opacity:0, scale:.96, duration:.9, delay:(i % 4) * .08, ease:'power3.out', scrollTrigger:{trigger: f, start:'top 94%', once:true}}));
/* Banner: entra com leve zoom e acompanha a rolagem com um parallax sutil */
const bn = document.querySelector('.banner img');
if(bn){
  gsap.from(bn, {scale:1.08, opacity:0, duration:1.4, ease:'power3.out'});
  gsap.to(bn, {yPercent:8, ease:'none', scrollTrigger:{trigger:'.banner', start:'top top', end:'bottom top', scrub:true}});
}
if($('coil')){ gsap.from('#coil', {opacity:0, scale:.9, duration:1.8, ease:'power2.out'}); gsap.from('.hero-tag .tag', {y:-8, opacity:0, duration:.7, stagger:.1, delay:.2}); }
if(mf) gsap.fromTo('#manifesto .mw', {opacity:.14}, {opacity:1, stagger:.1, ease:'none', scrollTrigger:{trigger: mf, start:'top 82%', end:'bottom 50%', scrub:true}});
gsap.utils.toArray('.step').forEach(s => ScrollTrigger.create({trigger: s, start:'top 70%', onEnter: () => s.classList.add('on'), onLeaveBack: () => s.classList.remove('on')}));
gsap.utils.toArray('.flow li').forEach((li, i) => gsap.from(li, {x:-14, opacity:.2, duration:.7, delay: (i % 4) * .08, ease:'power3.out', scrollTrigger:{trigger: li, start:'top 92%', once:true}}));
document.querySelectorAll('[data-count]').forEach(num => {
  const to = +num.dataset.count; num.textContent = '0';
  ScrollTrigger.create({trigger: num, start:'top 92%', once:true, onEnter: () => { const o = {v:0}; gsap.to(o, {v: to, duration:1.3, ease:'power3.out', onUpdate: () => num.textContent = Math.round(o.v).toLocaleString('pt-BR')}); }});
});
if(document.querySelector('.final')) gsap.from('.final .ring', {scale:.6, opacity:0, duration:1.6, ease:'power3.out', scrollTrigger:{trigger:'.final', start:'top 80%', once:true}});
addEventListener('load', () => ScrollTrigger.refresh());
})();
