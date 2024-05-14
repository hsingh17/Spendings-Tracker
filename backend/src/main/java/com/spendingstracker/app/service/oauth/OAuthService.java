package com.spendingstracker.app.service.oauth;

import com.spendingstracker.app.constants.ExternalUserType;
import com.spendingstracker.app.dto.oauth.OAuthPayload;

public interface OAuthService {
    /**
     * Extracts a <code>OAuthPayload</code> object from the JWT <code>oAuthCredential</code>
     *
     * @param oAuthCredential JWT obtained from authenticating with the 3rd Party OAuth client
     * @param externalUserType the type of the external user
     * @return <code>OAuthPayload</code> object containing data extracted from JWT
     * @see OAuthPayload
     * @see ExternalUserType
     */
    OAuthPayload extractPayload(String oAuthCredential, ExternalUserType externalUserType);
}
