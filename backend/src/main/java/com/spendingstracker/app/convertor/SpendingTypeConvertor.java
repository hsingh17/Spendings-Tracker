package com.spendingstracker.app.convertor;

import com.spendingstracker.app.constants.SpendingType;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class SpendingTypeConvertor implements Converter<String, SpendingType> {
    @Override
    public SpendingType convert(String source) {
        return SpendingType.fromCode(source);
    }
}