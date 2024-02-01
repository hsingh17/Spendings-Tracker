package com.spendingstracker.app.convertor;

import com.spendingstracker.app.constants.GroupBy;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class GroupByConvertor implements Converter<String, GroupBy> {
    @Override
    public GroupBy convert(String source) {
        return GroupBy.fromCode(source);
    }
}
