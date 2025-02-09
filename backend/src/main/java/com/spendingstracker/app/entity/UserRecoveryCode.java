package com.spendingstracker.app.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;

/** An entity class for <code>APP.USER_PASSWORD_RESET</code> */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(schema = "APP", name = "USER_RECOVERY_CODE")
public class UserRecoveryCode extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_RECOVERY_CODE_ID")
    private BigInteger userRecoveryCodeId;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @Column(name = "RECOVERY_CODE")
    private String recoveryCode;

    @Column(name = "IS_ACTIVE")
    private boolean isActive = true;

    public UserRecoveryCode(User user, String recoveryCode) {
        this.user = user;
        this.recoveryCode = recoveryCode;
    }
}
