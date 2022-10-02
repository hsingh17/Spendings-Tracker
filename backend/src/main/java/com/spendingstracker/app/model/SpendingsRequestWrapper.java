package com.spendingstracker.app.model;

import java.util.List;

public class SpendingsRequestWrapper {
    private List<String> categories;
    private List<Double> amounts;

    public SpendingsRequestWrapper() {
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    public List<Double> getAmounts() {
        return amounts;
    }

    public void setAmounts(List<Double> amounts) {
        this.amounts = amounts;
    }

}
