package com.spendingstracker.app.service.mfa;

import com.spendingstracker.app.dto.requests.VerifyMfaRequest;
import com.spendingstracker.app.dto.response.RecoveryCodesResponse;
import com.spendingstracker.app.dto.response.SetupMfaResponse;

import jakarta.servlet.http.HttpServletResponse;

/**
 * Service for setting up and verifying MFA
 *
 * @see MfaServiceImpl
 */
public interface MfaService {
    /**
     * Sets up MFA for a user by providing the secret string and QR code to scan. Note, this
     * function will wipe any existing MFA that is associated with a user.
     *
     * @see SetupMfaResponse
     */
    SetupMfaResponse setupMfa();

    /**
     * Returns a user recovery codes
     *
     * @see RecoveryCodesResponse
     */
    RecoveryCodesResponse getRecoveryCodes();

    /**
     * Verifies if the totp code or recovery code provided is valid
     *
     * @see VerifyMfaRequest
     * @param response response object for setting cookie after successful verification
     */
    void verifyMfa(HttpServletResponse response, VerifyMfaRequest verifyMfaRequest);
}
