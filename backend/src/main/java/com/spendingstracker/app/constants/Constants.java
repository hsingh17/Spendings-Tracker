package com.spendingstracker.app.constants;

import java.time.LocalDate;

/** Class that contains <code>public static final</code> values used throughout the application */
public class Constants {
    public static final String MFA_TOKEN_KEY = "mfa-token";
    public static final String API_TOKEN_KEY = "api-token";
    public static final LocalDate LOW_DATE = LocalDate.of(1000, 1, 1);
    public static final LocalDate HIGH_DATE = LocalDate.of(9999, 12, 31);
}
