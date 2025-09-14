import frappe
from frappe import _

@frappe.whitelist()
def set_onboarding_flag(flag: str, value: int = 1):
    """Set a flag on the Single doctype "NeoHCM Onboarding"."""
    flag = (flag or '').strip()
    if flag not in {"welcome_completed","settings_completed","branding_completed","guide_read","manual_read"}:
        frappe.throw(_("Invalid onboarding flag"))
    value = 1 if int(value) else 0
    doc = frappe.get_single("NeoHCM Onboarding")
    doc.set(flag, value)
    doc.save(ignore_permissions=True)
    return {"ok": True, "flag": flag, "value": value}

@frappe.whitelist()
def get_onboarding():
    try:
        doc = frappe.get_single("NeoHCM Onboarding")
        return doc.as_dict()
    except Exception:
        return {}
