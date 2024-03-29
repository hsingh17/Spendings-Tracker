package com.spendingstracker.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spendingstracker.app.util.YesNoIndToBooleanConverter;

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
    @Convert(converter = YesNoIndToBooleanConverter.class)
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
}
