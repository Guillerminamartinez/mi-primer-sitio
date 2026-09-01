// ---------- Pestañas ----------
const tabs = Array.from(document.querySelectorAll('.tab'));
const panels = Array.from(document.querySelectorAll('.panel'));

function activateTab(tab) {
  tabs.forEach(t => {
    const selected = t === tab;
    t.setAttribute('aria-selected', selected);
    t.tabIndex = selected ? 0 : -1;
  });

  panels.forEach(panel => {
    panel.hidden = panel.id !== tab.dataset.target;
  });

  tab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));

  tab.addEventListener('keydown', (event) => {
    let newIndex = null;
    if (event.key === 'ArrowRight') newIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') newIndex = (index - 1 + tabs.length) % tabs.length;
    if (newIndex !== null) {
      event.preventDefault();
      activateTab(tabs[newIndex]);
    }
  });
});

// ---------- Acordeón ----------
const accordionTrigger = document.querySelector('.accordion__trigger');

if (accordionTrigger) {
  accordionTrigger.addEventListener('click', () => {
    const expanded = accordionTrigger.getAttribute('aria-expanded') === 'true';
    const panelId = accordionTrigger.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);

    accordionTrigger.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
  });
}

// ---------- Botones de la sección "Buscar apoyo" ----------
const btnConsejos = document.getElementById('btn-consejos');
const revealConsejos = document.getElementById('reveal-consejos');

if (btnConsejos) {
  btnConsejos.addEventListener('click', () => {
    const isHidden = revealConsejos.hidden;
    revealConsejos.hidden = !isHidden;
    btnConsejos.textContent = isHidden
      ? 'Ocultar consejos'
      : 'Ver consejos para empezar la conversación';
  });
}

const btnVolver = document.getElementById('btn-volver');

if (btnVolver) {
  btnVolver.addEventListener('click', () => {
    const firstTab = document.getElementById('tab-que-es');
    activateTab(firstTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
