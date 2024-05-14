package com.spendingstracker.app.converter.web;

import com.spendingstracker.app.constants.Granularity;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * <code>Converter</code> to convert between <code>String</code> and <code>Granularity</code>
 *
 * @see Granularity
 */
@Component
public class GranularityConverter implements Converter<String, Granularity> {

    /**
     * Converts the coded value <code>source</code> to a <code>Granularity</code>
     *
     * @param source coded values of the granularity
     * @return a <code>Granularity</code> if there exists a <code>Granularity</code> with coded
     *     value <code>source</code>
     * @see Granularity
     */
    @Override
    public Granularity convert(String source) {
        return Granularity.fromCode(source);
    }
}
