package com.spendingstracker.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.math.BigInteger;

/** An entity class that maps to the table <code>APP.SPENDING</code> */
@Entity
@Table(schema = "APP", name = "SPENDING")
public class Spending extends AuditableEntity {
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

    public Spending() {}

    public Spending(String category, BigDecimal amount) {
        this.category = category;
        this.amount = amount;
    }

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

    public static Spending merge(Spending l, Spending r) {
        l.addAmount(r.getAmount());
        return l;
    }
}
