# NeoHCM (Frappe App) — Neotec

**NeoHCM** by **Neotec**: a delightful HCM layer for the Frappe framework with
a polished UI, quick branding (logo & colors), and curated workspaces.

**Support:** support@eotec.ai

## Install (bench)
```bash
cd ~/frappe-bench/apps
unzip NeoHCM_neotec.zip
mv neohcm ~/frappe-bench/apps/neohcm

cd ~/frappe-bench
bench --site yoursite.local install-app neohcm
bench build && bench clear-cache
```

### First run
- Log in as **System Manager** and open **/app/neo-brand-setup** (Brand Setup Wizard).
- Set your **logo** and **brand colors** → **Save & Apply**.
- Open **/app/neohcm-user-manual** anytime for help.
