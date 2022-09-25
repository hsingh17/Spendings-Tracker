package com.spendingstracker.app.model;

import javax.persistence.*;

@Entity
@Table(schema = "APP", name = "SPENDINGS")
public class Spending {
    @Id
    @GeneratedValue
    private Integer id;

    @Column(name = "USER_ID")
    private Integer userId;

    @Column(name = "DATE")
    private String date;

    @Column(name = "CATEGORY")
    private String category;

    @Column(name = "AMOUNT")
    private Float amount;

    public Spending() {
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }
}
