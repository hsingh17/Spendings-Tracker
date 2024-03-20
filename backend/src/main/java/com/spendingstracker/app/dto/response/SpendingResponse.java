package com.spendingstracker.app.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

/**
 * Object returned to client with relevant spending information
 */
@Builder
@Data
public class SpendingResponse {
    private long spendingId;
    private String category;
    private BigDecimal amount;
}
