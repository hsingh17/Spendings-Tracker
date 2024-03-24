package com.spendingstracker.app.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.math.BigInteger;
import java.util.Collection;

/**
 * An extension of the Spring <code>User</code> class the only reason for this is to add the <code>
 * userId</code> member.
 *
 * @see User
 */
public class CustomUserDetails extends User {
    private BigInteger userId;

    public CustomUserDetails(
            String username,
            String password,
            Collection<? extends GrantedAuthority> authorities,
            BigInteger userId) {
        super(username, password, authorities);
        this.userId = userId;
    }

    public CustomUserDetails(
            String username,
            String password,
            boolean enabled,
            boolean accountNonExpired,
            boolean credentialsNonExpired,
            boolean accountNonLocked,
            Collection<? extends GrantedAuthority> authorities,
            BigInteger userId) {
        super(
                username,
                password,
                enabled,
                accountNonExpired,
                credentialsNonExpired,
                accountNonLocked,
                authorities);
        this.userId = userId;
    }

    public BigInteger getUserId() {
        return userId;
    }

    public void setUserId(BigInteger userId) {
        this.userId = userId;
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return super.getPassword();
    }
}
