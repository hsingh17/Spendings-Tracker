package com.spendingstracker.app.constants;

import lombok.Getter;
import lombok.Setter;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@ConfigurationProperties(prefix = "ses.template.name")
@Component
public class SesTemplateNames {
    private String registrationEmail;
}
