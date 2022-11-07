package com.spendingstracker.app.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class SpendingsResponseWrapper {
    private List<Spending> spendings;
    private Date startDate;
    private Date endDate;
    private BigDecimal totalSpent;

    private int totalSpendings;

    public SpendingsResponseWrapper(List<Spending> spendings, Date startDate, Date endDate, BigDecimal totalSpent, int totalSpendings) {
        this.spendings = spendings;
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalSpent = totalSpent;
        this.totalSpendings = totalSpendings;
    }

    public List<Spending> getSpendings() {
        return spendings;
    }

    public void setSpendings(List<Spending> spendings) {
        this.spendings = spendings;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public BigDecimal getTotalSpent() {
        return totalSpent;
    }

    public void setTotalSpent(BigDecimal totalSpent) {
        this.totalSpent = totalSpent;
    }

    public int getTotalSpendings() {
        return totalSpendings;
    }

    public void setTotalSpendings(int totalSpendings) {
        this.totalSpendings = totalSpendings;
    }
}
