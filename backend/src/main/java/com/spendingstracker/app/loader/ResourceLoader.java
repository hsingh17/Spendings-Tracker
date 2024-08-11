package com.spendingstracker.app.loader;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.Charset;

@Component
@Slf4j
public class ResourceLoader {
    @Bean
    public String findSpendingsCategoricalSql() {
        ClassPathResource resource = new ClassPathResource("sql/findSpendingsCategorical.sql");
        try {
            return StreamUtils.copyToString(resource.getInputStream(), Charset.defaultCharset());
        } catch (IOException e) {
            log.error("Could not load");
            throw new RuntimeException(e);
        }
    }
}
