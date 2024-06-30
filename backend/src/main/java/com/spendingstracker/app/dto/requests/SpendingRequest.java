package com.spendingstracker.app.dto.requests;

import com.spendingstracker.app.constants.SpendingCategoryEnum;

import lombok.Data;

import java.math.BigDecimal;
import java.math.BigInteger;

/** DTO for requests on performing CRUD operations on spendings */
@Data
public class SpendingRequest {
    private BigInteger spendingId;
    private SpendingCategoryEnum category;
    private BigDecimal amount;
    private boolean delete;

    /**
     * @param amount <code>BigDecimal</code> object that contains the amount to add to <code>
     *     this.amount</code>
     */
    public void addAmount(BigDecimal amount) {
        this.amount = this.amount.add(amount);
    }
}
