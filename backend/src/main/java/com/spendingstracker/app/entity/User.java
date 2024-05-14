package com.spendingstracker.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

/** An entity class that maps to the table <code>APP.USER</code> */
@Entity
@Table(schema = "APP", name = "USER")
public class User extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    private BigInteger userId;

    @Column(name = "USERNAME")
    private String username;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "IS_VERIFIED")
    private boolean isVerified;

    @Column(name = "PASSWORD")
    @JsonIgnore // Don't want to send password (even if it's encrypted)
    private String password;

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            orphanRemoval = true)
    @JsonIgnore
    private Set<SpendingUserAggr> spendingUserAggrs = new HashSet<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserRegistration userRegistration;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<UserPasswordReset> userPasswordReset;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private ExternalUser externalUser;

    public User() {}

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public BigInteger getUserId() {
        return userId;
    }

    public void setUserId(BigInteger userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<SpendingUserAggr> getSpendingUserAggrs() {
        return spendingUserAggrs;
    }

    public void setSpendingUserAggrs(Set<SpendingUserAggr> spendingUserAggrs) {
        this.spendingUserAggrs = spendingUserAggrs;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
    }

    public UserRegistration getUserRegistration() {
        return userRegistration;
    }

    public void setUserRegistration(UserRegistration userRegistration) {
        this.userRegistration = userRegistration;
    }

    public Set<UserPasswordReset> getUserPasswordReset() {
        return userPasswordReset;
    }

    public void setUserPasswordReset(Set<UserPasswordReset> userPasswordReset) {
        this.userPasswordReset = userPasswordReset;
    }

    public ExternalUser getExternalUser() {
        return externalUser;
    }

    public void setExternalUser(ExternalUser externalUser) {
        this.externalUser = externalUser;
    }

    public void addSpendingUserAggr(SpendingUserAggr spendingUserAggr) {
        spendingUserAggrs.add(spendingUserAggr);
        spendingUserAggr.setUser(this);
    }

    public void removeSpendingUserAggr(SpendingUserAggr spendingUserAggr) {
        spendingUserAggrs.remove(spendingUserAggr);
        spendingUserAggr.setUser(null);
    }

    public void updateSpendingUserAggr(SpendingUserAggr spendingUserAggr) {
        removeSpendingUserAggr(spendingUserAggr);
        addSpendingUserAggr(spendingUserAggr);
    }

    public Email getRegistrationEmail() {
        return userRegistration == null ? null : userRegistration.getEmail();
    }

    public Email getPasswordResetEmail() {
        UserPasswordReset pwReset = getLatestPasswordReset();
        return pwReset == null ? null : pwReset.getEmail();
    }

    public UserPasswordReset getLatestPasswordReset() {
        if (userPasswordReset == null) {
            return null;
        }

        // Look for the Email object that has value IS_USED = N
        for (UserPasswordReset pwReset : userPasswordReset) {
            if (!pwReset.isUsed()) {
                return pwReset;
            }
        }

        return null;
    }
}
