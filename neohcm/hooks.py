app_name = "neohcm"
app_title = "NeoHCM"
app_publisher = "Neotec"
app_description = "Human Capital Management for Frappe with delightful UI & easy branding"
app_email = "support@eotec.ai"
app_license = "GPL-3.0-or-later"
app_version = "0.1.5"

# Assets
app_include_css = ["neohcm/public/neohcm.css"]
app_include_js = ["neohcm/public/neohcm.js", "neohcm/startup/desk.js"]

# Session boot
on_session_creation = ["neohcm.boot.boot_session"]

# Lifecycle hooks
after_install = ["neohcm.permissions.sync_permissions"]
after_migrate = [
    "neohcm.patches.create_custom_fields.execute",
    "neohcm.permissions.sync_permissions",
]
before_uninstall = ["neohcm.uninstall.before_uninstall"]

# Fixtures
fixtures = [
    {"dt": "Role", "filters": [["role_name", "in", ["Neo HCM User", "Neo HCM Manager"]]]},
    {"dt": "Role Profile", "filters": [["role_profile", "in", ["Neo HCM User Profile", "Neo HCM Manager Profile"]]]},
    {"dt": "Form Tour", "filters": [["reference_doctype", "=", "NeoHCM Settings"]]},
]
