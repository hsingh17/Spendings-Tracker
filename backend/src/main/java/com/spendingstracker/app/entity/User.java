package com.spendingstracker.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(schema = "APP", name = "USER")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    private long userId;

    @Column(name = "USERNAME")
    private String username;

    @Column(name = "PASSWORD")
    @JsonIgnore // Don't want to send password (even if it's encrypted)
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnore
    private Set<SpendingUserAggr> spendingUserAggrs = new HashSet<>();

    public User() {
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
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
