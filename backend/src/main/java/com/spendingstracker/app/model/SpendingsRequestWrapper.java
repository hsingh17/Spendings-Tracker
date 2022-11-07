package com.spendingstracker.app.model;

import java.math.BigDecimal;
import java.util.List;

public class SpendingsRequestWrapper {
    private List<String> categories;
    private List<BigDecimal> amounts;

    public SpendingsRequestWrapper() {
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    public List<BigDecimal> getAmounts() {
        return amounts;
    }

    public void setAmounts(List<BigDecimal> amounts) {
        this.amounts = amounts;
    }

}
