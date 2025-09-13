import frappe

def before_uninstall():
    # Remove workspace if it exists
    try:
        ws = frappe.get_doc("Workspace", "Neo HCM")
        ws.delete()
    except Exception:
        pass

def _safe_delete(doctype, name):
    try:
        doc = frappe.get_doc(doctype, name)
        doc.delete()
    except Exception:
        pass

def after_uninstall():
    # Clean roles / role profiles created by the app
    for rp in ("Neo HCM User Profile", "Neo HCM Manager Profile"):
        _safe_delete("Role Profile", rp)
    for r in ("Neo HCM User", "Neo HCM Manager"):
        _safe_delete("Role", r)
