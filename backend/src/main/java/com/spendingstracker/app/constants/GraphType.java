package com.spendingstracker.app.constants;

import java.util.Arrays;

/** <code>enum</code> that represents the 3 available graph types */
public enum GraphType {
    LINE("Line"),
    PIE("Pie"),
    BAR("Bar");

    private final String code;

    /**
     * Initialize <code>GraphType</code> from a <code>code</code>
     *
     * @param code coded value of the <code>enum</code>
     */
    GraphType(String code) {
        this.code = code;
    }

    /**
     * @return <code>code</code>, the coded value of the enum
     */
    public String getCode() {
        return code;
    }

    /**
     * <code>static</code> method to get a <code>GraphType</code> from its coded value (e.g: Line,
     * Pie, Bar).
     *
     * @param code coded value of the enum
     * @return <code>GraphType</code> that maps to the <code>code</code>
     * @throws IllegalArgumentException when there is no <code>enum</code> that maps to the <code>
     *     code</code>
     */
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
