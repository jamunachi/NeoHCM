import frappe

def boot_session(bootinfo):
    cached = frappe.cache().hgetall("neohcm:brand") or {}
    if not cached:
        try:
            s = frappe.get_single("NeoHCM Settings")
            cached = {
                "primary": s.primary_color or "#2C63D6",
                "secondary": s.secondary_color or "#224DB8",
                "theme": s.theme or "light",
                "logo": s.logo or ""
            }
        except Exception:
            cached = {"primary":"#2C63D6","secondary":"#224DB8","theme":"light","logo":""}

    bootinfo.neohcm_brand = {
        "brand": cached.get("primary", "#2C63D6"),
        "brand_600": cached.get("secondary", "#224DB8"),
        "brand_50": "#EEF3FF",
    }
    bootinfo.neohcm_theme = cached.get("theme", "light")
    bootinfo.neohcm_logo = cached.get("logo", "")
