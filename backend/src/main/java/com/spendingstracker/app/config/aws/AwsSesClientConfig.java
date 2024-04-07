package com.spendingstracker.app.config.aws;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.sesv2.SesV2Client;

/** Configures the <code>SesV2Client</code> for sending emails with AWS SES */
@Configuration
public class AwsSesClientConfig {
    /**
     * @return <code>SesV2Client</code> for sending emails with AWS SES
     */
    @Bean
    public SesV2Client sesV2Client() {
        return SesV2Client.builder()
                .credentialsProvider(DefaultCredentialsProvider.create())
                .region(Region.US_WEST_1)
                .build();
    }
}
