from . import __version__ as app_version

app_name = "neohcm"
app_title = "NeoHCM"
app_publisher = "Neotec"
app_description = "Human Capital Management for Frappe with delightful UI & easy branding"
app_email = "support@eotec.ai"
app_license = "GPL-3.0-or-later"

app_include_css = ["neohcm/public/neohcm.css"]
app_include_js  = [
    "neohcm/public/neohcm.js",
    "neohcm/startup/desk.js",
    "neohcm/neo_brand_setup/neo_brand_setup.js",
    "neohcm/user_manual/user_manual.js",
    "neohcm/setup_guide/setup_guide.js"
]

on_session_creation = "neohcm.boot.boot_session"

after_migrate = ["neohcm.patches.create_custom_fields.execute"]
