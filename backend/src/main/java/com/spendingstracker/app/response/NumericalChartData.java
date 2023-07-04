package com.spendingstracker.app.response;

import java.math.BigDecimal;
import java.util.Date;

public class NumericalChartData {
    private Date date;
    private BigDecimal amount;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
