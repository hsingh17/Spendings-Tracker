package com.spendingstracker.app.util;

import java.util.Comparator;
import java.util.Date;

public class CustomMapComparator implements Comparator<Date> {
    @Override
    public int compare(Date o1, Date o2) {
        return -1 * o1.compareTo(o2);
    }
}
