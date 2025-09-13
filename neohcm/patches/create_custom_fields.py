from frappe.custom.doctype.custom_field.custom_field import create_custom_fields

def execute():
    create_custom_fields({}, ignore_validate=True)
