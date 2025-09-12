frappe.pages['neohcm-setup-guide'].on_page_load = function(wrapper) {
  const page = frappe.ui.make_app_page({ parent: wrapper, title: 'NeoHCM – Setup Guide', single_column: true });
  const md = `# NeoHCM Setup Guide\n\n## Install\n\n\
bench --site yoursite.local install-app neohcm\nbench build && bench clear-cache\n\n## Brand Setup\nOpen /app/neo-brand-setup.`;
  const $body = $('<div class="frappe-card" style="padding:1.5rem"></div>');
  $(wrapper).find('.layout-main').empty().append($body);
  if (frappe.markdown) $body.html(frappe.markdown(md)); else $body.text(md);
};