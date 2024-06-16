package com.spendingstracker.app.converter.jpa;

import com.spendingstracker.app.constants.SpendingCategoryEnum;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

/**
 * Converter for JPA to convert <code>SpendingCategoryEnum</code> to <code>String</code> value of
 * the enum
 *
 * @see SpendingCategoryEnum
 */
@Converter(autoApply = true)
public class SpendingCategoryEnumConverter
        implements AttributeConverter<SpendingCategoryEnum, String> {
    @Override
    public String convertToDatabaseColumn(SpendingCategoryEnum SpendingCategoryEnum) {
        return SpendingCategoryEnum.getCode();
    }

    @Override
    public SpendingCategoryEnum convertToEntityAttribute(String s) {
        return SpendingCategoryEnum.fromCode(s);
    }
}
