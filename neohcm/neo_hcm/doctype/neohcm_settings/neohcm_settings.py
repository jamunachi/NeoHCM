import frappe
from frappe.model.document import Document

class NeoHCMSettings(Document):
    def on_update(self):
        if self.logo:
            try:
                ws = frappe.get_single("Website Settings")
                ws.brand_html = f"<img src='{self.logo}' style='height:28px' alt='{self.company_name or 'NeoHCM'}'/>"
                ws.save(ignore_permissions=True)
            except Exception:
                pass

        frappe.cache().hset("neohcm:brand",
            mapping={
                "primary": self.primary_color or "#2C63D6",
                "secondary": self.secondary_color or "#224DB8",
                "theme": self.theme or "light",
                "logo": self.logo or ""
            }
        )
