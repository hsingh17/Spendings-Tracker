package com.spendingstracker.app.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;

/** An entity class for <code>APP.USER_MFA_STRING</code> */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(schema = "APP", name = "USER_MFA_STRING")
public class UserMfaString extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_MFA_STRING_ID")
    private BigInteger userMfaStringId;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @Column(name = "SECRET_STRING")
    private String secretString;

    @Column(name = "IS_ACTIVE")
    private boolean isActive = true;

    public UserMfaString(User user, String secretString) {
        this.user = user;
        this.secretString = secretString;
    }
}
