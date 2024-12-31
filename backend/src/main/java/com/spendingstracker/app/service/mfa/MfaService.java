package com.spendingstracker.app.service.mfa;

import com.spendingstracker.app.dto.response.SetupMfaResponse;

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
    SetupMfaResponse setupMfa(String username);

    /** Return's a user recovery codes */
    void getRecoveryCodes();

    void verifyMfa();
}
