frappe.pages['neo-brand-setup'].on_page_load = function(wrapper) {
  const page = frappe.ui.make_app_page({ parent: wrapper, title: 'NeoHCM – Brand Setup', single_column: true });
  const $body = $(`<div class="frappe-card" style="padding:1.5rem;max-width:640px">
    <p class="text-muted">Set your logo and brand colors. You can change these anytime in <b>NeoHCM Settings</b>.</p>
    <div class="form-grid">
      <div class="form-group"><label>Company Name</label><input type="text" class="form-control" id="nh-company" placeholder="Neotec"/></div>
      <div class="form-group"><label>Logo (URL or upload)</label><input type="text" class="form-control" id="nh-logo-url" placeholder="/files/logo.png"/>
        <div class="mt-2"><button class="btn btn-default" id="nh-upload">Upload Logo</button> <span class="text-muted" id="nh-uploaded"></span></div>
      </div>
      <div class="form-group"><label>Primary Color</label><input type="color" id="nh-primary" value="#2C63D6"/></div>
      <div class="form-group"><label>Secondary Color</label><input type="color" id="nh-secondary" value="#224DB8"/></div>
      <div class="form-group"><label>Theme</label><select id="nh-theme" class="form-control"><option>light</option><option>dark</option><option>auto</option></select></div>
      <button class="btn btn-primary" id="nh-save">Save & Apply</button>
    </div></div>`);
  $(wrapper).find('.layout-main').empty().append($body);
  $('#nh-upload').on('click', async () => {
    const d = new frappe.ui.FileUploader({ disable_file_browser: 0, restrictions: { allowed_file_types: ['image/*'] }, folder: 'Home' });
    d.on_success = (file) => { $('#nh-logo-url').val(file.file_url || ''); $('#nh-uploaded').text('Uploaded ✓'); };
  });
  $('#nh-save').on('click', async () => {
    const payload = { company_name: $('#nh-company').val(), logo: $('#nh-logo-url').val(),
      primary_color: $('#nh-primary').val(), secondary_color: $('#nh-secondary').val(), theme: $('#nh-theme').val() };
    await frappe.call('neohcm.api.brand.save_brand', { data: payload }); frappe.show_alert({ message: 'Brand saved', indicator: 'green' });
    setTimeout(() => window.location.href = '/app', 600);
  });
};