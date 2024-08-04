package com.spendingstracker.app.converter.jpa;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

/**
 * Converter for JPA to convert <code>boolean</code> to <code>String</code> because <code>true
 * </code> is mapped to <code>Y</code> and <code>false</code> to <code>N</code>
 */
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
