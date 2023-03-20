package com.spendingstracker.app.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class SpendingsResponse {
    private long count;
    private long total;
    private String next;
    private String previous;
    private Date startDate;
    private Date endDate;
    private BigDecimal totalSpent;
    private List<SpendingsForADay> spendingsForADayList;

    public SpendingsResponse(long count, long total, String next, String previous, Date startDate, Date endDate, BigDecimal totalSpent, List<SpendingsForADay> spendingsForADayList) {
        this.count = count;
        this.total = total;
        this.next = next;
        this.previous = previous;
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalSpent = totalSpent;
        this.spendingsForADayList = spendingsForADayList;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
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

    public List<SpendingsForADay> getSpendingsForADayList() {
        return spendingsForADayList;
    }

    public void setSpendingsForADayList(List<SpendingsForADay> spendingsForADayList) {
        this.spendingsForADayList = spendingsForADayList;
    }
}

