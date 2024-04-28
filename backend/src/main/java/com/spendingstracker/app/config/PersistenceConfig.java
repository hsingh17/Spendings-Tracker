package com.spendingstracker.app.config;

import com.spendingstracker.app.util.SecurityAuditorAware;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.math.BigInteger;

/** Configuration class related to configuring Spring Data Jpa */
@Configuration
@EnableJpaAuditing(auditorAwareRef = "securityAuditorAware")
public class PersistenceConfig {
    /**
     * Instantiate a bean of <code>SecurityAuditorAware</code> object
     *
     * @return <code>SecurityAuditorAware</code> object
     * @see SecurityAuditorAware
     */
    @Bean
    public AuditorAware<BigInteger> securityAuditorAware() {
        return new SecurityAuditorAware();
    }
}
