package com.spendingstracker.app.constants;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Constants {
    // ####################################################################
    // DATES
    // ###################################################################
    public static final Date LOW_DATE;
    public static final Date HIGH_DATE;

    static {
        try {
            LOW_DATE = new SimpleDateFormat("yyyy-MM-dd").parse("1000-01-01");
            HIGH_DATE = new SimpleDateFormat("yyyy-MM-dd").parse("9999-12-31");
        } catch (ParseException e) {
            // TODO: something here
            throw new RuntimeException(e);
        }
    }

}
