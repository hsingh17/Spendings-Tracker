package com.spendingstracker.app.dto.response;

import com.spendingstracker.app.projection.SpendingProjection;

import java.math.BigDecimal;
import java.math.BigInteger;

/** Object returned to client with relevant spending information */
public record SpendingResponse(
        BigInteger spendingId, String category, BigDecimal amount, String memo) {
    public SpendingResponse(SpendingProjection spendingProj) {
        this(
                spendingProj.getSpendingId(),
                spendingProj.getCategory(),
                spendingProj.getAmount(),
                spendingProj.getMemo());
    }
}
;
