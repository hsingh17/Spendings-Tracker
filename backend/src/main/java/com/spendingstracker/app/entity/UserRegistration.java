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

    @Column(name = "PIN")
    private String pin;

    @Column(name = "GMAIL_MESSAGE_ID")
    private String gmailMessageId;

    public UserRegistration(User user, String pin, String gmailMessageId) {
        this.user = user;
        this.pin = pin;
        this.gmailMessageId = gmailMessageId;
    }
}
