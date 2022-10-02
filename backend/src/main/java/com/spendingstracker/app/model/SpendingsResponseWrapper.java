package com.spendingstracker.app.model;

import java.util.Date;
import java.util.List;

public class SpendingsResponseWrapper {
    private List<Spending> spendings;
    private Date startDate;
    private Date endDate;
    private Double totalSpent;

    public SpendingsResponseWrapper(List<Spending> spendings, Date startDate, Date endDate, Double totalSpent) {
        this.spendings = spendings;
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalSpent = totalSpent;
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

    public Double getTotalSpent() {
        return totalSpent;
    }

    public void setTotalSpent(Double totalSpent) {
        this.totalSpent = totalSpent;
    }
}
