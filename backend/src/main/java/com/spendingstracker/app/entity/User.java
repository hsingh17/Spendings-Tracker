package com.spendingstracker.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/** An entity class that maps to the table <code>APP.USER</code> */
@Entity
@Table(schema = "APP", name = "USER")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    private BigInteger userId;

    @Column(name = "USERNAME")
    private String username;

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

    @CreatedBy
    @Column(name = "CREATED_BY")
    private BigInteger createdBy;

    @CreatedDate
    @Column(name = "CREATED_ON")
    private LocalDateTime createdOn;

    @LastModifiedBy
    @Column(name = "LAST_MODIFIED_BY")
    private BigInteger lastModifiedBy;

    @LastModifiedDate
    @Column(name = "LAST_MODIFIED_ON")
    private LocalDateTime lastModifiedOn;

    @Version
    @Column(name = "OPTIMISTIC_LOCK")
    private Long optimisticLock;

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

    public BigInteger getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(BigInteger createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDateTime createdOn) {
        this.createdOn = createdOn;
    }

    public BigInteger getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(BigInteger lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public LocalDateTime getLastModifiedOn() {
        return lastModifiedOn;
    }

    public void setLastModifiedOn(LocalDateTime lastModifiedOn) {
        this.lastModifiedOn = lastModifiedOn;
    }

    public Long getOptimisticLock() {
        return optimisticLock;
    }

    public void setOptimisticLock(Long optimisticLock) {
        this.optimisticLock = optimisticLock;
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
