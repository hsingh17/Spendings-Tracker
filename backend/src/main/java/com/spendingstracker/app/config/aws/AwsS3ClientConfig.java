package com.spendingstracker.app.config.aws;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

/** Configures the <code>S3Client</code> */
@Configuration
public class AwsS3ClientConfig {
    /**
     * @return <code>S3Client</code> for S3 operations
     */
    @Bean
    public S3Client s3Client() {
        return S3Client.builder()
                .credentialsProvider(DefaultCredentialsProvider.create())
                .region(Region.US_WEST_1)
                .build();
    }

    @Bean
    public S3Presigner s3Presigner() {
        return S3Presigner.builder()
                .credentialsProvider(DefaultCredentialsProvider.create())
                .region(Region.US_WEST_1)
                .build();
    }
}
