package com.spendingstracker.app.entity;

import com.spendingstracker.app.constants.ExternalUserType;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;

/** An entity class that maps to the table <code>APP.EXTERNAL_USER</code> */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(schema = "APP", name = "EXTERNAL_USER")
public class ExternalUser extends AuditableEntity {
    @Id
    @Column(name = "EXTERNAL_USER_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger userRegistrationId;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "USER_ID")
    private User user;

    @Column(name = "EXTERNAL_USER_TYPE")
    private ExternalUserType externalUserType;

    @Column(name = "EXTERNAL_IDENTIF")
    private String externalIdentif;

    public ExternalUser(User user, ExternalUserType externalUserType, String externalIdentif) {
        this.user = user;
        this.externalUserType = externalUserType;
        this.externalIdentif = externalIdentif;
    }
}
