package com.spendingstracker.app.converter.web;

import com.spendingstracker.app.constants.ExternalUserType;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * <code>Converter</code> to convert between <code>String</code> and <code>ExternalUserType</code>
 *
 * @see ExternalUserType
 */
@Component
public class ExternalUserTypeConvereter implements Converter<String, ExternalUserType> {

    /**
     * Converts the coded value <code>source</code> to a <code>ExternalUserType</code>
     *
     * @param source coded values of the ExternalUserType
     * @return a <code>ExternalUserType</code> if there exists a <code>ExternalUserType</code> with
     *     coded value <code>source</code>
     * @see ExternalUserType
     */
    @Override
    public ExternalUserType convert(String source) {
        return ExternalUserType.fromCode(source);
    }
}
