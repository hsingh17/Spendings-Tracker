package com.spendingstracker.app.proxy.aws;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;

import java.time.Duration;

@Service
@Slf4j
public class AwsS3ProxyServiceImpl implements AwsS3ProxyService {
    private final int presignedUrlExpirationMinutes;

    public AwsS3ProxyServiceImpl(
            @Value("${s3.presigned-url-expiration-minutes}") int presignedUrlExpirationMinutes) {
        this.presignedUrlExpirationMinutes = presignedUrlExpirationMinutes;
    }

    @Override
    public String createPresignedUrl(String bucketName, String keyName) {
        try (S3Presigner s3Presigner = S3Presigner.create()) {
            log.info("Generating presigned URL for key {} in bucket {}", keyName, bucketName);

            GetObjectRequest request =
                    GetObjectRequest.builder().bucket(bucketName).key(keyName).build();

            GetObjectPresignRequest presignRequest =
                    GetObjectPresignRequest.builder()
                            .signatureDuration(Duration.ofMinutes(presignedUrlExpirationMinutes))
                            .getObjectRequest(request)
                            .build();

            PresignedGetObjectRequest presignedRequest =
                    s3Presigner.presignGetObject(presignRequest);

            return presignedRequest.url().toExternalForm();
        }
    }
}
