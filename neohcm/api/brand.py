import json, frappe
@frappe.whitelist()
def save_brand(data=None):
    if isinstance(data, str):
        import json as _j; data = _j.loads(data)
    s = frappe.get_single("NeoHCM Settings")
    s.company_name    = (data or {}).get("company_name")
    s.logo            = (data or {}).get("logo")
    s.primary_color   = (data or {}).get("primary_color") or "#2C63D6"
    s.secondary_color = (data or {}).get("secondary_color") or "#224DB8"
    s.theme           = (data or {}).get("theme") or "light"
    s.save(ignore_permissions=True); frappe.db.commit(); return {"ok": True}
