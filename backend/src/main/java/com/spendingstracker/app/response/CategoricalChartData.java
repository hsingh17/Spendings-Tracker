package com.spendingstracker.app.response;

import java.math.BigDecimal;
import java.util.Date;

public class CategoricalChartData {
    private String category;
    private BigDecimal amount;

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
}
