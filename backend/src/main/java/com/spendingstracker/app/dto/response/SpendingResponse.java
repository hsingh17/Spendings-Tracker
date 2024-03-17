package com.spendingstracker.app.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Builder
@Data
public class SpendingResponse {
    private long spendingId;
    private String category;
    private BigDecimal amount;
}
