package com.spendingstracker.app.dto.response;

/**
 * Response object for setting up MFA
 *
 * @param qrCodeDataUri QR code image as a base64 encoded URI
 * @param secretString secret string that user can optionally use to setup MFA
 */
public record SetupMfaResponse(String qrCodeDataUri, String secretString) {}
