frappe.ready(() => {
  const cfg = (frappe.boot && frappe.boot.neo_hcm) || {};
  const root = document.documentElement;
  if (cfg.primary_color)   root.style.setProperty('--neo-primary', cfg.primary_color);
  if (cfg.secondary_color) root.style.setProperty('--neo-secondary', cfg.secondary_color);
  if (cfg.theme) document.body.dataset.neoTheme = cfg.theme;
  if (cfg.footer_text) {
    const el = document.querySelector('#page-desktop .page-content');
    if (el && !document.querySelector('#neo-footer')) {
      const note = document.createElement('div');
      note.id = 'neo-footer';
      note.style.marginTop = '8px';
      note.style.fontSize = '11px';
      note.textContent = cfg.footer_text;
      el.appendChild(note);
    }
  }
});
