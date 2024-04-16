package com.spendingstracker.app.entity;

import com.spendingstracker.app.util.YesNoIndToBooleanConverter;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;
import java.util.UUID;

@Entity
@Table(schema = "APP", name = "USER_PASSWORD_RESET")
@Getter
@Setter
@NoArgsConstructor
public class UserPasswordReset extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_PASSWORD_RESET_ID")
    private BigInteger userPasswordResetId;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToOne
    @JoinColumn(name = "EMAIL_ID")
    private Email email;

    @Column(name = "UUID")
    private UUID uuid;

    @Column(name = "IS_USED")
    @Convert(converter = YesNoIndToBooleanConverter.class)
    private boolean isUsed;

    public UserPasswordReset(UUID uuid, Email email, User user) {
        this.uuid = uuid;
        this.email = email;
        this.user = user;
        this.isUsed = false;
    }
}
