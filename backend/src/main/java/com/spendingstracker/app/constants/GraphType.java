package com.spendingstracker.app.constants;

import java.util.Arrays;

public enum GraphType {
    LINE("Line"),
    PIE("Pie"),
    BAR("Bar");

    private final String code;

    GraphType(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public static GraphType fromCode(String code) {
        return Arrays.stream(GraphType.values())
                .filter(spendingType -> spendingType.code.equals(code))
                .findFirst()
                .orElseThrow(
                        () ->
                                new IllegalArgumentException(
                                        "No such GROUP_BY enum for code " + code));
    }
}
