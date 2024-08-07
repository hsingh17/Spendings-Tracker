package com.spendingstracker.app.proxy.aws;

/** Interface that defines a service for performing operations on S3 */
public interface AwsS3ProxyService {
    String createPresignedUrl(String bucketName, String uri);
}
