package com.spendingstracker.app.config;

import com.spendingstracker.app.convertor.GroupByConvertor;
import com.spendingstracker.app.convertor.SpendingTypeConvertor;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebMvcConfig implements WebMvcConfigurer {
    private final GroupByConvertor groupByConvertor;

    private final SpendingTypeConvertor spendingTypeConvertor;

    public WebMvcConfig(
            GroupByConvertor groupByConvertor,
            SpendingTypeConvertor spendingTypeConvertor) {
        this.groupByConvertor = groupByConvertor;
        this.spendingTypeConvertor = spendingTypeConvertor;
    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        WebMvcConfigurer.super.addFormatters(registry);
        registry.addConverter(groupByConvertor);
        registry.addConverter(spendingTypeConvertor);
    }
}
