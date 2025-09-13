import frappe

def boot_session(bootinfo):
    try:
        doc = frappe.get_single("NeoHCM Settings")
        bootinfo.neo_hcm = {
            "primary_color": doc.primary_color or "#2C63D6",
            "secondary_color": doc.secondary_color or "#224DB8",
            "theme": (doc.theme or "light").lower(),
            "footer_text": doc.footer_text or "",
        }
    except Exception:
        # settings may not exist on fresh install yet
        bootinfo.neo_hcm = {}
