package com.spendingstracker.app.config;

import com.spendingstracker.app.convertor.GraphTypeConverter;
import com.spendingstracker.app.convertor.GroupByConvertor;

import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    private final GroupByConvertor groupByConvertor;

    private final GraphTypeConverter graphTypeConverter;

    public WebMvcConfig(GroupByConvertor groupByConvertor, GraphTypeConverter graphTypeConverter) {
        this.groupByConvertor = groupByConvertor;
        this.graphTypeConverter = graphTypeConverter;
    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        WebMvcConfigurer.super.addFormatters(registry);
        registry.addConverter(groupByConvertor);
        registry.addConverter(graphTypeConverter);
    }
}
