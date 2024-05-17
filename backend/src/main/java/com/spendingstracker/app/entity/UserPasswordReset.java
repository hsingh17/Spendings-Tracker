package com.spendingstracker.app.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;
import java.util.UUID;

/** An entity class for <code>APP.USER_PASSWORD_RESET</code> */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(schema = "APP", name = "USER_PASSWORD_RESET")
public class UserPasswordReset extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_PASSWORD_RESET_ID")
    private BigInteger userPasswordResetId;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "EMAIL_ID")
    private Email email;

    @Column(name = "UUID")
    private UUID uuid;

    @Column(name = "IS_USED")
    private boolean isUsed;

    public UserPasswordReset(UUID uuid, Email email, User user) {
        this.uuid = uuid;
        this.email = email;
        this.user = user;
        this.isUsed = false;
    }
}
