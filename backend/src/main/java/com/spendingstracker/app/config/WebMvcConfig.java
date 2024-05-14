package com.spendingstracker.app.config;

import com.spendingstracker.app.converter.web.ExternalUserTypeConvereter;
import com.spendingstracker.app.converter.web.GranularityConverter;
import com.spendingstracker.app.converter.web.GraphTypeConverter;

import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuration class that implements <code>WebMvcConfigurer</code>
 *
 * @see WebMvcConfigurer
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    private final GranularityConverter granularityConverter;
    private final GraphTypeConverter graphTypeConverter;
    private final ExternalUserTypeConvereter externalUserTypeConvereter;

    /**
     * Constructor to initialize class variables
     *
     * @param granularityConverter
     * @param graphTypeConverter
     * @param externalUserTypeConvereter
     * @see GranularityConverter
     * @see GraphTypeConverter
     * @see ExternalUserTypeConvereter
     */
    public WebMvcConfig(
            GranularityConverter granularityConverter,
            GraphTypeConverter graphTypeConverter,
            ExternalUserTypeConvereter externalUserTypeConvereter) {
        this.granularityConverter = granularityConverter;
        this.graphTypeConverter = graphTypeConverter;
        this.externalUserTypeConvereter = externalUserTypeConvereter;
    }

    /**
     * Overridden function to add the custom formatters <code>groupByConvertor</code> and <code>
     * graphTypeConvertor</code> to the <code>FormatterRegistry</code>
     *
     * @param registry <code>FormatterRegistry</code> object that contains formatters to
     *     convert/format between types.
     * @see FormatterRegistry
     */
    @Override
    public void addFormatters(FormatterRegistry registry) {
        WebMvcConfigurer.super.addFormatters(registry);
        registry.addConverter(externalUserTypeConvereter);
        registry.addConverter(granularityConverter);
        registry.addConverter(graphTypeConverter);
    }
}
