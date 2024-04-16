package com.spendingstracker.app.constants;

import lombok.Getter;
import lombok.Setter;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@ConfigurationProperties(prefix = "redirects")
@Component
public class WebsiteRedirects {
    private String verifyAcct;
    private String passwordReset;
}
