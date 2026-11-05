/* FACEP institucional — interações e animações (GSAP + ScrollTrigger, com fallback sem animação). */
(function(){
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
const $ = id => document.getElementById(id);

/* Teste A/B: a versão vem do endereço (/institucional-a, /institucional-b) ou de ?tema=a|b.
   O <head> já marcou <html data-tema>; aqui os links internos passam a manter a versão. */
const tema = document.documentElement.dataset.tema;
if(tema){
  document.querySelectorAll('a[href^="/institucional"], a[href^="/pos-tecnico-enfermagem"]').forEach(a => {
    if(a.getAttribute('href').startsWith('/institucional/assets')) return;
    a.setAttribute('href', a.getAttribute('href').replace(/^\/(institucional|pos-tecnico-enfermagem)\/?/, `/$1-${tema}`));
  });
  const nomes = {a:'Versão A · cores da LP de Enfermagem', b:'Versão B · vermelho e azul'};
  const outro = tema === 'a' ? 'b' : 'a';
  const base = location.pathname.replace(/-(a|b)\/?$/, '').replace(/\/$/, '') || '/institucional';
  const v = document.createElement('div'); v.className = 'ver';
  v.innerHTML = `<i></i><span><b>${nomes[tema]}</b> · <a href="${base}-${outro}">ver ${outro.toUpperCase()}</a></span>`;
  document.body.appendChild(v);
}

/* WhatsApp oficial (mesmo número da landing de Técnico em Enfermagem) */
const WA = '5562982871553';
document.querySelectorAll('[data-wa]').forEach(a => {
  a.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(a.dataset.wa || 'Olá, FACEP! Vim pelo site.');
  a.target = '_blank'; a.rel = 'noopener';
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

/* Nav e menu */
const nav = $('nav'), menu = $('menu'), menuBtn = $('menuBtn'), fab = $('waFab');
let lastY = scrollY;
addEventListener('scroll', () => {
  const y = scrollY;
  if(nav && !document.body.classList.contains('lock')) nav.classList.toggle('hide', y > lastY && y > 520);
  if(fab) fab.classList.toggle('show', y > 420);
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

/* Trilho de cursos */
document.querySelectorAll('[data-rail]').forEach(wrap => {
  const rail = wrap.querySelector('.rail'), bar = wrap.querySelector('.rail-bar i');
  if(!rail) return;
  const step = () => { const c = rail.querySelector('.pc'); return c ? c.getBoundingClientRect().width + 12 : 300; };
  wrap.querySelector('.prev')?.addEventListener('click', () => rail.scrollBy({left:-step(), behavior: reduce ? 'auto' : 'smooth'}));
  wrap.querySelector('.next')?.addEventListener('click', () => rail.scrollBy({left: step(), behavior: reduce ? 'auto' : 'smooth'}));
  const upd = () => { if(!bar) return; const max = rail.scrollWidth - rail.clientWidth; const vis = rail.clientWidth / rail.scrollWidth; bar.style.width = (vis * 100) + '%'; bar.style.transform = `translateX(${max > 0 ? (rail.scrollLeft / max) * ((1 - vis) / vis) * 100 : 0}%)`; };
  rail.addEventListener('scroll', upd, {passive:true}); addEventListener('resize', upd); upd();
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
  ScrollTrigger.create({trigger: num, start:'top 92%', once:true, onEnter: () => { const o = {v:0}; gsap.to(o, {v: to, duration:1.3, ease:'power3.out', onUpdate: () => num.textContent = Math.round(o.v)}); }});
});
if(document.querySelector('.final')) gsap.from('.final .ring', {scale:.6, opacity:0, duration:1.6, ease:'power3.out', scrollTrigger:{trigger:'.final', start:'top 80%', once:true}});
addEventListener('load', () => ScrollTrigger.refresh());
})();
