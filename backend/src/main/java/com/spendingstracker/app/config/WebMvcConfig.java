package com.spendingstracker.app.config;

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

    /**
     * Constructor to initialize class variables
     *
     * @param granularityConverter see <code>GroupByConvertor</code> for more info
     * @param graphTypeConverter see <code>GraphTypeConverter</code> for more info
     * @see GranularityConverter
     * @see GraphTypeConverter
     */
    public WebMvcConfig(
            GranularityConverter granularityConverter, GraphTypeConverter graphTypeConverter) {
        this.granularityConverter = granularityConverter;
        this.graphTypeConverter = graphTypeConverter;
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
        registry.addConverter(granularityConverter);
        registry.addConverter(graphTypeConverter);
    }
}
