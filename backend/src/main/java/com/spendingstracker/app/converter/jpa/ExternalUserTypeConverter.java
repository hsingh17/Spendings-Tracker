package com.spendingstracker.app.converter.jpa;

import com.spendingstracker.app.constants.ExternalUserType;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

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
