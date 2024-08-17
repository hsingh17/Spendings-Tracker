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

@Configuration
@ConfigurationProperties("classpath-resources")
@Slf4j
public class ResourceLoaderConfig {
    private final List<String> sqlResources;

    public ResourceLoaderConfig(List<String> sqlResources) {
        this.sqlResources = sqlResources;
    }

    public List<String> getSqlResources() {
        return sqlResources;
    }

    @Bean
    @Qualifier("sqlResourcesMap")
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

    private String convertFileNameToKey(ClassPathResource resource) {
        String filePath = resource.getPath();
        String fileName =
                resource.getFilename() != null
                        ? resource.getFilename()
                        : filePath.substring(filePath.lastIndexOf("/") + 1);

        return fileName.substring(0, fileName.indexOf("."));
    }
}
