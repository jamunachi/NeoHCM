import frappe

DEFAULT_USER_RIGHTS = dict(read=1, print=1, email=1)
DEFAULT_MANAGER_RIGHTS = dict(read=1, write=1, create=1, delete=1, print=1, email=1, share=1)

def _ensure_role(role_name: str):
    if not frappe.db.exists("Role", role_name):
        r = frappe.new_doc("Role")
        r.role_name = role_name
        r.desk_access = 1
        r.insert(ignore_permissions=True)

def _add_perm(dt, role, rights: dict):
    from frappe.permissions import add_permission, update_permission_property
    add_permission(dt, role, permlevel=0)
    for key, val in rights.items():
        update_permission_property(dt, role, 0, key, int(bool(val)))

def sync_permissions():
    """Apply sensible default permissions for all doctypes belonging to module 'Neo HCM'
    that do not already define explicit standard permissions.
    - For Single doctypes: Users get read; Managers + System Manager get full.
    - For Table/child doctypes: skip (managed by parent).
    - For normal doctypes: Users get read/print/email; Managers + System Manager get full.
    """
    _ensure_role("Neo HCM User")
    _ensure_role("Neo HCM Manager")

    dts = frappe.get_all("DocType", filters={"module": "Neo HCM"}, fields=["name","issingle","istable"])
    for dt in dts:
        name = dt.name
        # Fetch standard permissions defined on the doctype
        std_perms = frappe.get_all("DocPerm", filters={"parent": name, "parenttype": "DocType"}, limit=1)
        if std_perms:
            continue  # already defined in JSON; do not override

        if dt.istable:
            continue  # child tables use parent's perms

        if dt.issingle:
            for role in ("Neo HCM User",):
                _add_perm(name, role, dict(read=1))
            for role in ("Neo HCM Manager", "System Manager"):
                _add_perm(name, role, DEFAULT_MANAGER_RIGHTS)
        else:
            _add_perm(name, "Neo HCM User", DEFAULT_USER_RIGHTS)
            for role in ("Neo HCM Manager", "System Manager"):
                _add_perm(name, role, DEFAULT_MANAGER_RIGHTS)

    frappe.db.commit()
    return {"ok": True, "updated": [d.name for d in dts]}
