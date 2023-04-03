package com.spendingstracker.app.constants;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Constants {
    // ####################################################################
    // DATES
    // ####################################################################
    public static final String DATE_PATTERN = "yyyy-MM-dd";
    public static final Date LOW_DATE;
    public static final Date HIGH_DATE;

    static {
        try {
            LOW_DATE = new SimpleDateFormat(DATE_PATTERN).parse("1000-01-01");
            HIGH_DATE = new SimpleDateFormat(DATE_PATTERN).parse("9999-12-31");
        } catch (ParseException e) {
            // TODO: something here
            throw new RuntimeException(e);
        }
    }

    // ####################################################################
    // Defaults
    // ####################################################################
    public static final int DEFAULT_LIMIT = 25;
    public static final int DEFAULT_PAGE = 0;
}
