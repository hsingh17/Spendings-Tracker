package com.spendingstracker.app.util;

import com.spendingstracker.app.dto.CustomUserDetails;

import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.math.BigInteger;
import java.util.Optional;

/**
 * This is an implementation of the <code>AuditorAware</code> interface so that the <code>@CreatedBy
 * </code> and <code>@LastModifiedBy</code> annotations work. Reference <a
 * href="https://stackoverflow.com/questions/29472931/how-does-createdby-work-in-spring-data-jpa">here</a>
 *
 * @see AuditorAware
 */
@Slf4j
public class SecurityAuditorAware implements AuditorAware<BigInteger> {

    /**
     * Set the current auditor to be the currently authenticated user.
     *
     * @return <code>{@literal Optional<BigInteger>}</code> possibly containing currently
     *     authenticated user's ID.
     */
    @Override
    public Optional<BigInteger> getCurrentAuditor() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return Optional.of(BigInteger.ONE);
        }

        try {
            CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
            return Optional.of(userDetails.getUserId());
        } catch (ClassCastException e) {
            log.warn("Could not cast principal to CustomUserDetails object. Defaulting to 1");
            return Optional.of(BigInteger.ONE);
        }
    }
}
