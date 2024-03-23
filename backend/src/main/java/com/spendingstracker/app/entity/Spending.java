package com.spendingstracker.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDateTime;

/** An entity class that maps to the table <code>APP.SPENDING</code> */
@Entity
@Table(schema = "APP", name = "SPENDING")
public class Spending {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SPENDING_ID")
    private BigInteger spendingId;

    @JoinColumn(name = "SPENDING_USER_AGGR_ID")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private SpendingUserAggr spendingUserAggr;

    @Column(name = "CATEGORY")
    private String category;

    @Column(name = "AMOUNT")
    private BigDecimal amount;

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

    public BigInteger getSpendingId() {
        return spendingId;
    }

    public void setSpendingId(BigInteger spendingId) {
        this.spendingId = spendingId;
    }

    public SpendingUserAggr getSpendingUserAggr() {
        return spendingUserAggr;
    }

    public void setSpendingUserAggr(SpendingUserAggr spendingUserAggr) {
        this.spendingUserAggr = spendingUserAggr;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public void addAmount(BigDecimal amount) {
        this.amount = this.amount.add(amount);
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

    public static Spending merge(Spending l, Spending r) {
        l.addAmount(r.getAmount());
        return l;
    }
}
