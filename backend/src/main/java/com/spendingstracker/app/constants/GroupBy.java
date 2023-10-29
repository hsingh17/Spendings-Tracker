package com.spendingstracker.app.constants;

import java.util.Arrays;

public enum GroupBy {
    DAY("D"),
    WEEK("W"),

    MONTH("M"),
    YEAR("Y");

    private final String code;

    GroupBy(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public static GroupBy fromCode(String code) {
        return Arrays.stream(GroupBy.values())
                .filter(groupBy -> groupBy.code.equals(code))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No such GROUP_BY enum for code " + code));
    }
}
