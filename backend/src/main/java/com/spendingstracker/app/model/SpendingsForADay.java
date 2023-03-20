package com.spendingstracker.app.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class SpendingsForADay {
    private Date date;
    private int count;
    private BigDecimal total;
    private List<Spending> spendings;

    public SpendingsForADay(Date date, int count, BigDecimal total, List<Spending> spendings) {
        this.date = date;
        this.count = count;
        this.total = total;
        this.spendings = spendings;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public List<Spending> getSpendings() {
        return spendings;
    }

    public void setSpendings(List<Spending> spendings) {
        this.spendings = spendings;
    }
}
