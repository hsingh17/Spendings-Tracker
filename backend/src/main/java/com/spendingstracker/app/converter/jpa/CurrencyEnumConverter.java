package com.spendingstracker.app.converter.jpa;

import com.spendingstracker.app.constants.CurrencyEnum;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

/**
 * Converter for JPA to convert <code>SpendingCategoryEnum</code> to <code>String</code> value of
 * the enum
 *
 * @see CurrencyEnum
 */
@Converter(autoApply = true)
public class CurrencyEnumConverter implements AttributeConverter<CurrencyEnum, String> {
    @Override
    public String convertToDatabaseColumn(CurrencyEnum currencyEnum) {
        return currencyEnum.name();
    }

    @Override
    public CurrencyEnum convertToEntityAttribute(String s) {
        return CurrencyEnum.valueOf(s);
    }
}
