package com.spendingstracker.app.config;

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

@Configuration
public class SecretKeyConfig {
    @Bean
    @Qualifier("secretKey")
    public String getJwtSecretKey(
            @Value("${jwt.secret-key-path}") Resource jwtSecretKeyResource) {
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
