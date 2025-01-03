package com.spendingstracker.app.dto.requests;

/**
 * Request object for verifying MFA login. If one param is null, the other should be non-null
 *
 * @param totpCode totp code from auth app
 * @param recoveryCode recovery code that was given to user upon setting up MFA
 */
public record VerifyMfaRequest(String totpCode, String recoveryCode) {}
