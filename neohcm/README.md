# Neo HCM (for Frappe)

A lightweight Human Capital Management layer with quick branding controls.

## Features
- Single DocType: **NeoHCM Settings** (company name, colors, theme, footer).
- Workspace: **Neo HCM** with shortcuts to Settings, Brand Setup, Setup Guide, User Manual.
- Pages: Neo Brand Setup, NeoHCM Setup Guide, NeoHCM User Manual.
- Branding applied at login via `boot_session`.

## Install (Frappe Cloud)
1. Deploy the app in Apps.
2. Go to Sites → your site → Install App → select **neohcm**.
3. Reload the desk.

## Structure
- `neohcm/neo_hcm/doctype/neohcm_settings`: Single DocType config and controller.
- `neohcm/neo_hcm/page/*`: Module pages.
- `neohcm/neo_hcm/workspace/neo-hcm`: Workspace.
- `neohcm/startup/desk.js`: Applies theme from settings.
- `neohcm/public/neohcm.css`: CSS variables for theme.


### Extras
- Arabic UI translations included (`translations/ar.csv`).
- Workspace with shortcuts ships by default.

- Ships with Roles (User/Manager) and Role Profiles.
- Includes a Form Tour for NeoHCM Settings.
- Adds Workspaces for Brand Setup, Setup Guide, and User Manual.


### Onboarding
- New page: **Neo HCM Onboarding** with a simple checklist and quick links.
- Progress is stored in Single DocType **NeoHCM Onboarding**.
- Defaults permissions are synced on install/migrate (User: read; Manager: full).


### Sample HCM DocTypes
- **NeoHCM Employee** with child table **NeoHCM Employment History**.
- CSV import templates: `neohcm/data/*.csv` (use Data Import Tool).

### E2E Tests (Playwright)
- `cd e2e && npm install && npm run install:browsers && npm test`
- Configure CI secrets `E2E_BASE_URL`, `E2E_USER`, `E2E_PASS` to run e2e in GitHub Actions.

### Quick-start Wizard
- Open **Neo HCM Onboarding** and click **Start Wizard** to jump to required forms.
