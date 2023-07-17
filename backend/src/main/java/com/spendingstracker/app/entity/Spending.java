package com.spendingstracker.app.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.math.BigDecimal;
import java.math.RoundingMode;

@Entity
@Table(schema = "APP", name = "SPENDING")
public class Spending {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SPENDING_ID")
    private long spendingId;

    @JoinColumn(name = "SPENDING_USER_AGGR_ID")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private SpendingUserAggr spendingUserAggr;

    @Column(name = "CATEGORY")
    private String category;

    @Column(name = "AMOUNT")
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private BigDecimal amount;

    @Transient
    private boolean delete = false;

    public Spending() {
    }

    public long getSpendingId() {
        return spendingId;
    }

    public void setSpendingId(long spendingId) {
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

    public boolean isDelete() {
        return delete;
    }

    public void setDelete(boolean delete) {
        this.delete = delete;
    }
}
