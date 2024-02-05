package com.spendingstracker.app.convertor;

import com.spendingstracker.app.constants.Granularity;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class GroupByConvertor implements Converter<String, Granularity> {
    @Override
    public Granularity convert(String source) {
        return Granularity.fromCode(source);
    }
}
