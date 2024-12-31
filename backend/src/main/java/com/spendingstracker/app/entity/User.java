package com.spendingstracker.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

/** An entity class that maps to the table <code>APP.USER</code> */
@Getter
@Setter
@NoArgsConstructor
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

    @Column(name = "IS_ACTIVE")
    private boolean isActive;

    @Column(name = "HAS_MFA")
    private boolean hasMfa;

    @Column(name = "PASSWORD")
    @JsonIgnore // Don't want to send password (even if it's encrypted)
    private String password;

    @OneToOne
    @JoinColumn(name = "PREF_CURRENCY_ID", referencedColumnName = "CURRENCY_ID", nullable = false)
    private Currency prefCurrency;

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            orphanRemoval = true)
    @JsonIgnore
    private List<SpendingUserAggr> spendingUserAggrs = new ArrayList<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserRegistration userRegistration;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserPasswordReset> userPasswordReset;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserMfaString> userMfaStrings;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserRecoveryCode> userRecoveryCodes;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private ExternalUser externalUser;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
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

    /** Simply sets <code>isActive</code> and <code>isVerified</code> to <code>true</code> */
    public void setActiveAndVerified() {
        isActive = true;
        isVerified = true;
    }

    /**
     * Add new MFA to a user by setting the secret string and recovery codes. Note, this does
     * invalidate any previous MFA associated with the user.
     *
     * @see UserMfaString
     * @see UserRecoveryCode
     */
    public void addMfa(UserMfaString mfaString, List<UserRecoveryCode> recoveryCodes) {
        // Invalidate old MFA string and recovery codes
        invalidateMfaStrings();
        invalidateMfaRecoveryCodes();

        // Add new methods AFTER invalidating the previous methods
        userMfaStrings.add(mfaString);
        userRecoveryCodes.addAll(recoveryCodes);
    }

    /**
     * @return the MFA object that is active, if not found, return <code>null</code>
     * @see UserMfaString
     */
    public UserMfaString getActiveUserMfaString() {
        for (UserMfaString mfaString : userMfaStrings) {
            if (mfaString.isActive()) {
                return mfaString;
            }
        }

        return null;
    }

    /**
     * @return all active MFA recovery codes
     * @see UserRecoveryCode
     */
    public List<UserRecoveryCode> getActiveRecoveryCodes() {
        List<UserRecoveryCode> activeRecoveryCodes = new ArrayList<>();
        for (UserRecoveryCode userRecoveryCode : userRecoveryCodes) {
            if (userRecoveryCode.isActive()) {
                activeRecoveryCodes.add(userRecoveryCode);
            }
        }

        return activeRecoveryCodes;
    }

    /** Invalidates any current MFA strings associated with a user */
    private void invalidateMfaStrings() {
        for (UserMfaString mfaString : userMfaStrings) {
            mfaString.setActive(false);
        }
    }

    /** Invalidates any current MFA recovery codes associated with a user */
    private void invalidateMfaRecoveryCodes() {
        for (UserRecoveryCode recoveryCode : userRecoveryCodes) {
            recoveryCode.setActive(false);
        }
    }
}
