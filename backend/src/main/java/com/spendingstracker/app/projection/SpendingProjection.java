package com.spendingstracker.app.projection;

import java.math.BigDecimal;

public interface SpendingProjection {
    long getSpendingId();

    String getCategory();

    BigDecimal getAmount();
}
