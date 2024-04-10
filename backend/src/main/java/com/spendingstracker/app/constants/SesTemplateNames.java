package com.spendingstracker.app.constants;

import org.springframework.beans.factory.annotation.Value;

public class SesTemplateNames {
    public static String REGISTRATION_EMAIL_TEMPLATE;

    @Value("${ses.template.name.registration-email}")
    public void setRegistrationEmailTemplate(String registrationEmailTemplate) {
        REGISTRATION_EMAIL_TEMPLATE = registrationEmailTemplate;
    }
}
