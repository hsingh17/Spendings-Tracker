package com.spendingstracker.app.projection;

import java.math.BigDecimal;
import java.sql.Date;

public interface SpendingsListProjection {
    long getSpendingUserAggrId();
    Date getDate();
    BigDecimal getTotal();
}
