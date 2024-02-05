package com.spendingstracker.app.constants;

import java.util.Arrays;

public enum Granularity {
    DAY("Day"),
    WEEK("Week"),

    MONTH("Month"),
    YEAR("Year");

    private final String code;

    Granularity(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public static Granularity fromCode(String code) {
        return Arrays.stream(Granularity.values())
                .filter(groupBy -> groupBy.code.equals(code))
                .findFirst()
                .orElseThrow(
                        () ->
                                new IllegalArgumentException(
                                        "No such GROUP_BY enum for code " + code));
    }
}
