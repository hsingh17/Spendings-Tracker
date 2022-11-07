package com.spendingstracker.app.model;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(schema = "APP", name = "SPENDINGS")
public class Spending {
    @Id
    @GeneratedValue
    private Integer id;

    @Column(name = "USER_ID")
    private Integer userId;

    @Column(name = "CATEGORY")
    private String category;

    @Column(name = "AMOUNT")
    private BigDecimal amount;

    @Column(name = "DATE")
    private Date date = new Date();

    public Spending() {
    }

    public Spending(Integer userId, String category, BigDecimal amount) {
        this.userId = userId;
        this.category = category.toUpperCase();
        this.amount = amount;
    }

    public Spending(Integer userId, String category, BigDecimal amount, Date date) {
        this.userId = userId;
        this.category = category.toUpperCase();
        this.amount = amount;
        this.date = date;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
        this.category = category.toUpperCase();
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
}
