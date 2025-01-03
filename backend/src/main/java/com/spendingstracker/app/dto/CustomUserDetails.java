package com.spendingstracker.app.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

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
@Getter
@Setter
public class CustomUserDetails extends User {
    private BigInteger userId;

    public CustomUserDetails(
            String username,
            String password,
            boolean isActive,
            Collection<? extends GrantedAuthority> authorities,
            BigInteger userId) {
        super(username, password, isActive, isActive, isActive, isActive, authorities);
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

    @Override
    @JsonIgnore
    public String getPassword() {
        return super.getPassword();
    }
}
