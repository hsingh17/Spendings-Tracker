package com.spendingstracker.app.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;

/** An entity class that maps to the table <code>APP.SPENDING_USER_AGGR</code> */
@Entity
@Table(schema = "APP", name = "USER_REGISTRATION")
@Getter
@Setter
@NoArgsConstructor
public class UserRegistration extends AuditableEntity {
    @Id
    @Column(name = "USER_REGISTRATION_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger userRegistrationId;

    @OneToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "EMAIL_ID")
    private Email email;

    @Column(name = "PIN")
    private String pin;

    public UserRegistration(User user, String pin, Email email) {
        this.user = user;
        this.pin = pin;
        this.email = email;
    }
}
