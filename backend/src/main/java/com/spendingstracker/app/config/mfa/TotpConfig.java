package com.spendingstracker.app.config.mfa;

import dev.samstevens.totp.spring.autoconfigure.TotpAutoConfiguration;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

/**
 * Autoconfigures <code>TotpAutoConfiguration</code> from the <code>totp-spring-boot-starter</code>
 * library since it's not autoconfigured in Spring Boot 3. See more <a
 * href="https://github.com/samdjstevens/java-totp/issues/53">here</a>
 */
@Configuration
@Import(TotpAutoConfiguration.class)
public class TotpConfig {}
