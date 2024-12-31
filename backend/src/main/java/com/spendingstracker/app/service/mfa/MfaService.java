package com.spendingstracker.app.service.mfa;

import com.spendingstracker.app.dto.response.SetupMfaResponse;

/** Service for setting up and verifying MFA */
public interface MfaService {
    /**
     * Set's up MFA for a user by providing
     *
     * @param username user to setup MFA for
     * @return
     */
    SetupMfaResponse setupMfa(String username);

    void getRecoveryCodes();

    void verifyMfa();
}
