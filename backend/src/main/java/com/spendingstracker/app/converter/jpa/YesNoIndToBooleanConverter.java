package com.spendingstracker.app.converter.jpa;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class YesNoIndToBooleanConverter implements AttributeConverter<Boolean, String> {
    @Override
    public String convertToDatabaseColumn(Boolean value) {
        return value ? "Y" : "N";
    }

    @Override
    public Boolean convertToEntityAttribute(String s) {
        return s.equals("Y");
    }
}
