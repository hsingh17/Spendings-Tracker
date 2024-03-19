package com.spendingstracker.app.dto.requests;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class SpendingRequest {
    private long spendingId;
    private String category;
    private BigDecimal amount;
    private boolean delete;

    public void addAmount(BigDecimal amount) {
        this.amount = this.amount.add(amount);
    }

    public static SpendingRequest merge(SpendingRequest l, SpendingRequest r) {
        l.addAmount(r.getAmount());
        return l;
    }
}
