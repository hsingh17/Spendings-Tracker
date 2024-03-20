package com.spendingstracker.app.dto.requests;

import lombok.Data;

import java.math.BigDecimal;

/** DTO for requests on performing CRUD operations on spendings */
@Data
public class SpendingRequest {
    private long spendingId;
    private String category;
    private BigDecimal amount;
    private boolean delete;

    /**
     * @param amount <code>BigDecimal</code> object that contains the amount to add to <code>
     *     this.amount</code>
     */
    public void addAmount(BigDecimal amount) {
        this.amount = this.amount.add(amount);
    }

    /**
     * Sums the amounts of <code>l</code> and <code>r</code> together. Used for merging <code>
     * SpendingRequest</code> objects that have the same <code>category</code>
     *
     * @param l <code>SpendingRequest</code> object
     * @param r <code>SpendingRequest</code> object
     * @return <code>SpendingRequest</code> whose sum is <code>l.amount + r.amount</code>
     */
    public static SpendingRequest merge(SpendingRequest l, SpendingRequest r) {
        l.addAmount(r.getAmount());
        return l;
    }
}
