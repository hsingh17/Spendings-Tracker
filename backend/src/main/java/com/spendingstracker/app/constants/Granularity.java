package com.spendingstracker.app.constants;

import java.util.Arrays;

/**
 * <code>enum</code> that represents the granularity at which spendings should be returned at. For
 * example, a value of <code>WEEK</code> means that the spendings should be returned by a weekly
 * basis.
 */
public enum Granularity {
    DAY("Day"),
    WEEK("Week"),

    MONTH("Month"),
    YEAR("Year");

    private final String code;

    /**
     * Constructor to initialize <code>Granularity</code> by the coded value.
     *
     * @param code coded value of the enum (e.g: Day, Week, Month, Year)
     */
    Granularity(String code) {
        this.code = code;
    }

    /**
     * @return <code>code</code> value of the enum (e.g: Day, Week, Month, Year)
     */
    public String getCode() {
        return code;
    }

    /**
     * <code>static</code> method to get a <code>Granularity</code> from its coded value (e.g: Day,
     * Week, Month, Year).
     *
     * @param code coded value of the enum (e.g: Day, Week, Month, Year)
     * @return <code>Granularity</code> that maps to the <code>code</code>
     * @throws IllegalArgumentException when there is no <code>enum</code> that maps to the <code>
     *     code</code>
     */
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
