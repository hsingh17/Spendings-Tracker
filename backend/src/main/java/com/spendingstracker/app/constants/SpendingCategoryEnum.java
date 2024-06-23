package com.spendingstracker.app.constants;

import java.util.Arrays;

/** <code>enum</code> that represents spending categoryToS3UrlMap */
public enum SpendingCategoryEnum {
    TRANSPORATION("Transporation"),
    CLOTHING("Clothing"),
    VEHICLE("Vehicle"),
    TRAVEL("Travel"),
    HEALTH("Health"),
    FOOD("Food"),
    PET("Pet"),
    ENTERTAINMENT("Entertainment"),
    UTILITY("Utility"),
    SUBSCRIPTION("Subscription"),
    SAVINGS("Savings"),
    OTHER("Other");

    private final String code;

    /**
     * Initialize <code>SpendingCategoryEnum</code> from a <code>code</code>
     *
     * @param code coded value of the <code>enum</code>
     */
    SpendingCategoryEnum(String code) {
        this.code = code;
    }

    /**
     * @return <code>code</code>, the coded value of the enum
     */
    public String getCode() {
        return code;
    }

    /**
     * <code>static</code> method to get a <code>SpendingCategoryEnum</code> from its coded value
     * (e.g: Line, Pie, Bar).
     *
     * @param code coded value of the enum
     * @return <code>SpendingCategoryEnum</code> that maps to the <code>code</code>
     * @throws IllegalArgumentException when there is no <code>enum</code> that maps to the <code>
     *     code</code>
     */
    public static SpendingCategoryEnum fromCode(String code) {
        return Arrays.stream(SpendingCategoryEnum.values())
                .filter(spendingType -> spendingType.code.equals(code))
                .findFirst()
                .orElseThrow(
                        () ->
                                new IllegalArgumentException(
                                        "No such SpendingCategoryEnum for code " + code));
    }
}
