package com.spendingstracker.app.projection;

import java.math.BigDecimal;
import java.math.BigInteger;

/** Projection class to store query results from queries to <code>APP.SPENDING</code> */
public interface SpendingProjection {
    BigInteger getSpendingId();

    String getCategory();

    BigDecimal getAmount();
}
