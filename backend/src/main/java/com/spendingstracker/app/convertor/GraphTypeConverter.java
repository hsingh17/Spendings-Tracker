package com.spendingstracker.app.convertor;

import com.spendingstracker.app.constants.GraphType;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * <code>Converter</code> to convert between <code>String</code> and <code>GraphType</code>
 *
 * @see GraphType
 */
@Component
public class GraphTypeConverter implements Converter<String, GraphType> {

    /**
     * Converts the coded value <code>source</code> to a <code>GraphType</code>
     *
     * @param source coded values of the graph type
     * @return a <code>GraphType</code> if there exists a <code>GraphType</code> with coded value
     *     <code>source</code>
     * @see GraphType
     */
    @Override
    public GraphType convert(String source) {
        return GraphType.fromCode(source);
    }
}
