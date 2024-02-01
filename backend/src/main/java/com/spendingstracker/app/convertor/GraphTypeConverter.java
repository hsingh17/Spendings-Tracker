package com.spendingstracker.app.convertor;

import com.spendingstracker.app.constants.GraphType;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class GraphTypeConverter implements Converter<String, GraphType> {
    @Override
    public GraphType convert(String source) {
        return GraphType.fromCode(source);
    }
}
