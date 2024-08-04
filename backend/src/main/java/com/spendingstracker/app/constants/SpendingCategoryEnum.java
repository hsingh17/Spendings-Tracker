package com.spendingstracker.app.constants;

import com.fasterxml.jackson.annotation.JsonValue;

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

    private final String stringDecode;

    /**
     * Initialize <code>SpendingCategoryEnum</code> from a <code>stringDecode</code>
     *
     * @param stringDecode coded value of the <code>enum</code>
     */
    SpendingCategoryEnum(String stringDecode) {
        this.stringDecode = stringDecode;
    }

    /**
     * @return <code>stringDecode</code>, the coded value of the enum
     */
    @JsonValue
    public String getStringDecode() {
        return stringDecode;
    }

    /**
     * <code>static</code> method to get a <code>SpendingCategoryEnum</code> from its coded value
     * (e.g: Line, Pie, Bar).
     *
     * @param code coded value of the enum
     * @return <code>SpendingCategoryEnum</code> that maps to the <code>stringDecode</code>
     * @throws IllegalArgumentException when there is no <code>enum</code> that maps to the <code>
     *     code</code>
     */
    public static SpendingCategoryEnum fromCode(String code) {
        return Arrays.stream(SpendingCategoryEnum.values())
                .filter(spendingType -> spendingType.stringDecode.equals(code))
                .findFirst()
                .orElseThrow(
                        () ->
                                new IllegalArgumentException(
                                        "No such SpendingCategoryEnum for code " + code));
    }
}
