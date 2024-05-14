package com.spendingstracker.app.constants;

import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;

/** Enum to coded values for external users */
public enum ExternalUserType {
    GOOGLE("GGL");

    private final String code;

    ExternalUserType(String code) {
        this.code = code;
    }

    /**
     * @return <code>code</code> value for the <code>ExternalUserType</code>
     */
    @JsonValue
    public String getCode() {
        return code;
    }

    /**
     * @param code <code>String</code> value of code to lookup
     * @return <code>ExternalUserType</code> that has a coded value equal to <code>code</code>
     */
    public static ExternalUserType fromCode(String code) {
        return Arrays.stream(ExternalUserType.values())
                .filter(externalUserType -> externalUserType.code.equals(code))
                .findFirst()
                .orElseThrow(
                        () ->
                                new IllegalArgumentException(
                                        "No such ExternalUserType enum for code " + code));
    }
}
