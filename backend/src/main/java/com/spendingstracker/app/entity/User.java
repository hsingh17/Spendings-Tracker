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

    @Column(name = "PASSWORD")
    @JsonIgnore // Don't want to send password (even if it's encrypted)
    private String password;

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
}
