package com.spendingstracker.app.converter.web;

import com.spendingstracker.app.constants.SpendingCategoryEnum;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * <code>Converter</code> to convert between <code>String</code> and <code>SpendingCategoryEnum
 * </code>
 *
 * @see SpendingCategoryEnum
 */
@Component
public class SpendingCategoryEnumConverter implements Converter<String, SpendingCategoryEnum> {

    /**
     * Converts the coded value <code>source</code> to a <code>SpendingCategoryEnum</code>
     *
     * @param source coded values of the graph type
     * @return a <code>SpendingCategoryEnum</code> if there exists a <code>SpendingCategoryEnum
     *     </code> with coded value <code>source</code>
     * @see SpendingCategoryEnum
     */
    @Override
    public SpendingCategoryEnum convert(String source) {
        return SpendingCategoryEnum.fromCode(source);
    }
}
