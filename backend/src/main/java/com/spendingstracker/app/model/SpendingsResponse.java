package com.spendingstracker.app.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class SpendingsResponse {
    private long count;
    private String next;
    private String previous;
    private Map<Date, List<Spending>> spendings;
    private Date startDate;
    private Date endDate;
    private BigDecimal totalSpent;

    public SpendingsResponse(Map<Date, List<Spending>> spendings, Date startDate, Date endDate, BigDecimal totalSpent, long count, String next, String previous) {
        this.spendings = spendings;
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalSpent = totalSpent;
        this.count = count;
        this.next = next;
        this.previous = previous;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public String getNext() {
        return next;
    }

    public void setNext(String next) {
        this.next = next;
    }

    public String getPrevious() {
        return previous;
    }

    public void setPrevious(String previous) {
        this.previous = previous;
    }

    public Map<Date, List<Spending>> getSpendings() {
        return spendings;
    }

    public void setSpendings(Map<Date, List<Spending>> spendings) {
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
}
