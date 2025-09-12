frappe.pages['neohcm-user-manual'].on_page_load = function(wrapper) {
  const page = frappe.ui.make_app_page({ parent: wrapper, title: 'NeoHCM – User Manual', single_column: true });
  const md = `# NeoHCM User Manual\n\nWelcome to **NeoHCM** by **Neotec**.\n\n## Getting Started\n- Open /app/neo-brand-setup to set branding.\n- Use ESS/HR Manager workspaces for common tasks.\n\n## Support\nEmail support@eotec.ai`;
  const $body = $('<div class="frappe-card" style="padding:1.5rem"></div>');
  $(wrapper).find('.layout-main').empty().append($body);
  if (frappe.markdown) $body.html(frappe.markdown(md)); else $body.text(md);
};