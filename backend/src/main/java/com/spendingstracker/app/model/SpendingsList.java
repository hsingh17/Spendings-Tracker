package com.spendingstracker.app.model;

import java.util.List;

public class SpendingsList {
    private Integer id;
    private String date;
    private List<String> categories;
    private List<Float> amounts;
    private Float total;

    public SpendingsList() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    public List<Float> getAmounts() {
        return amounts;
    }

    public void setAmounts(List<Float> amounts) {
        this.amounts = amounts;
    }

    public Float getTotal() {
        return total;
    }

    public void setTotal(Float total) {
        this.total = total;
    }
}
