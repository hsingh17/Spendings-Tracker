package com.spendingstracker.app.projection;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;

public interface SpendingsListProjection {
    Long getSpendingUserAggrId();
    String getCategory();
    String getDate();
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    BigDecimal getTotal();
}
