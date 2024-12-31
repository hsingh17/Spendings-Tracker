package com.spendingstracker.app.dto.response;

/**
 * Response object for setting up MFA
 *
 * @param qrCodeDataUri QR code image as a base64 encoded URI
 */
public record SetupMfaResponse(String qrCodeDataUri) {}
