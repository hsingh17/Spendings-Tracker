package com.spendingstracker.app.constants;

import java.util.Arrays;

public enum SpendingType {
    NUMERICAL("N"),
    CATEGORICAL("C");

    private final String code;

    SpendingType(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public static SpendingType fromCode(String code) {
        return Arrays.stream(SpendingType.values())
                .filter(spendingType -> spendingType.code.equals(code))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No such GROUP_BY enum for code " + code));
    }
}
