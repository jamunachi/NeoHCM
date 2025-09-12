frappe.ready(() => {
  const brand = frappe.boot?.neohcm_brand || {};
  const is_admin = frappe.user?.has_role?.('System Manager');
  if (!is_admin) return;
  if (!brand.brand || brand.brand.toUpperCase() === '#2C63D6') {
    frappe.msgprint({
      title: __('Welcome to NeoHCM'),
      message: __('Make it yours in 1 minute: <a href="/app/neo-brand-setup">Open Brand Setup</a>'),
      indicator: 'blue'
    });
  }
});