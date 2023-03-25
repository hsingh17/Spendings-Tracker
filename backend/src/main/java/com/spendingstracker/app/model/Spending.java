package com.spendingstracker.app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(schema = "APP", name = "SPENDINGS")
public class Spending {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SPENDING_ID")
    private Integer spendingId;

    @Column(name = "USER_ID")
    private Integer userId;

    @Column(name = "SPENDING_CATEGORY")
    private String category;

    @Column(name = "SPENDING_AMOUNT")
    private BigDecimal amount;

    @Column(name = "SPENDING_DATE")
    private Date date = new Date();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", insertable = false, updatable = false)
    @JsonIgnore // We don't want to show the User object in response
    private User user;

    public Spending() {
    }

    public Integer getSpendingId() {
        return spendingId;
    }

    public void setSpendingId(Integer spendingId) {
        this.spendingId = spendingId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
