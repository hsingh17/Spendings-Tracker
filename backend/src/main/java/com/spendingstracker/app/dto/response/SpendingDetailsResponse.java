package com.spendingstracker.app.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class SpendingDetailsResponse {
    private final List<SpendingResponse> spendings;
}
