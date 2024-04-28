package com.spendingstracker.app.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/** Configuration class to configure the ObjectMapper class */
@Configuration
public class ObjectMapperConfig {

    /**
     * Creates and returns an instance of an <code>ObjectMapper</code> class. Register the <code>
     * JavaTimeModule</code> to allow serialization java.time classes with Jackson. Turn off <code>
     * WRITE_DATES_AS_TIMESTAMPS</code> so dates are returned as an ISO string
     *
     * @return instance of an ObjectMapper that can be injected throughout the application as a
     *     Spring Bean
     * @see ObjectMapper
     * @see JavaTimeModule
     * @see <a
     *     href="https://fasterxml.github.io/jackson-modules-java8/javadoc/datetime/2.9/com/fasterxml/jackson/datatype/jsr310/JavaTimeModule.html">JavaTimeModule
     *     docs</a>
     */
    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        return objectMapper;
    }
}
