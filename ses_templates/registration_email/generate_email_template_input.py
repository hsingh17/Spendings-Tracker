import json

TEMPLATE = {
    "TemplateName": "RegistrationEmail",
    "TemplateContent": {
        "Subject": "Spendings Tracker: Registration Code {{pin}}",
        "Text": "Thank you for signing up for Spendings Tracker. Your registration code: {{pin}}",
        "Html": "",
    },
}

with open("registration_email_template.html") as f:
    TEMPLATE["TemplateContent"]["Html"] = "".join(f.readlines()).replace("\n", "")

with open("registration_email_template_input.json", "w") as f:
    f.write(json.dumps(TEMPLATE))
