package com.spendingstracker.app.projection;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface SpendingsListProjection {
    Long getSpendingUserAggrId();

    String getCategory();

    LocalDate getDate();

    BigDecimal getTotal();
}
