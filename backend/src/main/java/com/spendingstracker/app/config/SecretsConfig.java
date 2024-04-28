package com.spendingstracker.app.config;

import lombok.extern.slf4j.Slf4j;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Configuration class to get secrets used by the backend
 *
 * @see com.spendingstracker.app.util.JwtUtil
 */
@Configuration
@Slf4j
public class SecretsConfig {
    /**
     * Function that loads the secret key and injects as a <code>String</code> bean with name <code>
     * secretKey</code>.
     *
     * @param jwtSecretKeyResource <code>Resource</code> object that is located at the classpath
     *     location <code>/keys/secret-key.key</code>
     * @return string of the secret key in plaintext
     */
    @Bean
    @Qualifier("secretKey")
    public String getJwtSecretKey(@Value("${jwt.secret-key-path}") Resource jwtSecretKeyResource) {
        if (jwtSecretKeyResource == null || !jwtSecretKeyResource.exists()) {
            String errMsg = "JWT Secret Key not found!";
            log.error(errMsg);
            throw new ResourceNotFoundException(errMsg);
        }

        try {
            File jwtFile = jwtSecretKeyResource.getFile();
            Path jwtFilePath = jwtFile.toPath();
            Stream<String> lines = Files.lines(jwtFilePath);
            return lines.collect(Collectors.joining(""));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
