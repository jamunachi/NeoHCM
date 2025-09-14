frappe.pages['neo-hcm-onboarding'].on_page_load = function(wrapper) {
  var page = frappe.ui.make_app_page({
    parent: wrapper,
    title: 'Neo HCM Onboarding',
    single_column: true
  });

  const makeRow = (key, label, action) => {
    const row = $('<div class="frappe-card" style="padding:12px;margin-bottom:8px;"></div>').appendTo(page.body);
    const chk = $(`<input type="checkbox" id="chk-${key}" style="margin-right:8px;">`);
    const span = $(`<span style="font-weight:600;">${label}</span>`);
    const btn = $(`<button class="btn btn-sm" style="margin-left:8px;">${action}</button>`);
    row.append(chk).append(span).append(btn);
    btn.on('click', () => {
      frappe.call({
        method: "neohcm.api.onboarding.set_onboarding_flag",
        args: { flag: key, value: 1 },
        callback: () => {
          $(`#chk-${key}`).prop('checked', true);
          frappe.show_alert({message: __("Marked as done"), indicator: "green"});
        }
      });
    });
    return row;
  };

  const rows = [
    ["welcome_completed", __("Welcome Completed"), __("Mark Done")],
    ["settings_completed", __("Open Settings"), __("Mark Done")],
    ["branding_completed", __("Applied Branding"), __("Mark Done")],
    ["guide_read", __("Read Setup Guide"), __("Mark Done")],
    ["manual_read", __("Read User Manual"), __("Mark Done")]
  ];

  rows.forEach(([k, lbl, act]) => makeRow(k, lbl, act));

  frappe.call({
    method: "neohcm.api.onboarding.get_onboarding",
    callback: (r) => {
      const d = r.message || {};
      ["welcome_completed","settings_completed","branding_completed","guide_read","manual_read"].forEach(k => {
        if (d[k]) $(`#chk-${k}`).prop('checked', !!d[k]);
      });
    }
  });

  // helper links
  const links = $(`
    <div style="margin-top:12px">
      <a class="btn btn-default btn-sm" href="#Form/NeoHCM Settings">${__("Open Settings")}</a>
      <a class="btn btn-default btn-sm" href="#workspace/Neo HCM">${__("Open Workspace")}</a>
      <a class="btn btn-default btn-sm" href="/app/neo-brand-setup">${__("Brand Setup Page")}</a>
      <a class="btn btn-default btn-sm" href="/app/neohcm-setup-guide">${__("Setup Guide Page")}</a>
      <a class="btn btn-default btn-sm" href="/app/neohcm-user-manual">${__("User Manual Page")}</a>
    </div>`);
  page.body.append(links);
}


// Add a simple wizard runner
(function() {
  const bar = document.createElement('div');
  bar.style.marginTop = '12px';
  bar.innerHTML = `
    <div class="frappe-card" style="padding:12px;">
      <strong>Quick Start Wizard</strong>
      <div style="margin-top:8px">
        <button class="btn btn-primary btn-sm" id="neo-wizard-start">Start Wizard</button>
      </div>
      <div id="neo-wizard-log" style="margin-top:8px;font-size:12px;color:#666;"></div>
    </div>
  `;
  document.querySelector('.page-body .layout-main-section')?.appendChild(bar);

  const log = (t) => {
    const el = document.getElementById('neo-wizard-log');
    if (el) el.innerHTML += `<div>• ${t}</div>`;
  };

  document.getElementById('neo-wizard-start')?.addEventListener('click', async () => {
    log(__('Opening Settings...'));
    window.location.hash = "#Form/NeoHCM Settings";
    setTimeout(() => {
      frappe.show_alert({message: __("Now fill out settings, then return to Onboarding."), indicator: "blue"});
    }, 500);
  });
})();
