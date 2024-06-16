package com.spendingstracker.app.converter.jpa;

import com.spendingstracker.app.constants.ExternalUserType;

import com.spendingstracker.app.constants.SpendingCategoryEnum;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

/**
 * Converter for JPA to convert <code>ExternalUserType</code> to <code>String</code> value of the
 * enum
 *
 * @see ExternalUserType
 */
@Converter(autoApply = true)
public class ExternalUserTypeConverter implements AttributeConverter<ExternalUserType, String> {
    @Override
    public String convertToDatabaseColumn(ExternalUserType externalUserType) {
        return externalUserType.getCode();
    }

    @Override
    public ExternalUserType convertToEntityAttribute(String s) {
        return ExternalUserType.fromCode(s);
    }
}
