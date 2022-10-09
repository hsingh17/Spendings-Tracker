package com.spendingstracker.app.model;

import javax.persistence.*;
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
    private Double amount;

    @Column(name = "DATE")
    private Date date = new Date();

    public Spending() {
    }

    public Spending(Integer userId, String category, Double amount) {
        this.userId = userId;
        this.category = category.toUpperCase();
        this.amount = amount;
    }

    public Spending(Integer userId, String category, Double amount, Date date) {
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

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
