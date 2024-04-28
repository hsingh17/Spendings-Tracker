import json

TEMPLATE = {
    "TemplateName": "PasswordResetEmail",
    "TemplateContent": {
        "Subject": "Spendings Tracker: Reset Your Password",
        "Text": "Someone recently requested a password reset for your account {{username}}."
        "If that was you, please visit the following URL to complete the password reset process: {{websiteURL}}"
        "If that was not you, please ignore this email",
        "Html": "",
    },
}

with open("password_reset_email_template.html") as f:
    TEMPLATE["TemplateContent"]["Html"] = "".join(f.readlines()).replace("\n", "")

with open("password_reset_email_template_input.json", "w") as f:
    f.write(json.dumps(TEMPLATE))
