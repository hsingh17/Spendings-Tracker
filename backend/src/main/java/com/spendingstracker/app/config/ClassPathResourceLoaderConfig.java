package com.spendingstracker.app.config;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.*;

/** Config class for loading <code>ClassPathResource</code>s */
@Configuration
@ConfigurationProperties("classpath-resources")
@Slf4j
public class ClassPathResourceLoaderConfig {
    private final List<String> sqlResources;

    public ClassPathResourceLoaderConfig(List<String> sqlResources) {
        this.sqlResources = sqlResources;
    }

    public List<String> getSqlResources() {
        return sqlResources;
    }

    @Bean
    @Qualifier("sqlResourcesMap")
    /**
     * Loads SQL files located in the classpath under <code>resources/sql</code>
     *
     * @return a <code>Map</code> containing the SQL file name as a key and the corresponding SQL as
     *     value
     * @see com.spendingstracker.app.repository.SpendingUserJdbcRepository
     */
    public Map<String, String> sqlResourcesMap() {
        Map<String, String> m = new HashMap<>();

        for (String sqlResourceClassPath : sqlResources) {
            ClassPathResource resource = new ClassPathResource(sqlResourceClassPath);
            try {
                String key = convertFileNameToKey(resource);
                String fileContent =
                        StreamUtils.copyToString(
                                resource.getInputStream(), Charset.defaultCharset());

                log.info("Loaded class path resource {}", sqlResourceClassPath);
                m.put(key, fileContent);
            } catch (IOException e) {
                log.error("Could not load class path resource {}", sqlResourceClassPath);
                throw new RuntimeException(e);
            }
        }

        log.debug("{}", m);
        return Collections.unmodifiableMap(m);
    }

    /** Convert's the file name of a <code>ClassPathResource</code> to a key */
    private String convertFileNameToKey(ClassPathResource resource) {
        String filePath = resource.getPath();
        String fileName =
                resource.getFilename() != null
                        ? resource.getFilename()
                        : filePath.substring(filePath.lastIndexOf("/") + 1);

        return fileName.substring(0, fileName.indexOf("."));
    }
}
