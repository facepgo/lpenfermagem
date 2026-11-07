// Monta o bloco de abas (lista à esquerda, painel à direita) a partir de [{t:'Título', h:'<html>'}].
const chev = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path pathLength="1" d="M9 6l6 6-6 6"/></svg>';
module.exports = function tabs(id, items, label) {
  const btns = items.map((it, i) => `<button type="button" role="tab" id="${id}-t${i}" aria-controls="${id}-p${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${it.t}${chev}</button>`).join('\n        ');
  const panels = items.map((it, i) => `<div class="tab-panel" role="tabpanel" id="${id}-p${i}" aria-labelledby="${id}-t${i}"${i ? ' hidden' : ''}>\n          <h3>${it.t}</h3>\n          ${it.h}\n        </div>`).join('\n        ');
  return `<div class="tabs" data-tabs data-rv>
      <div class="tab-list" role="tablist" aria-label="${label}">
        ${btns}
      </div>
      <div>
        ${panels}
      </div>
    </div>`;
};
