package com.spendingstracker.app.service.oauth;

import com.spendingstracker.app.constants.ExternalUserType;
import com.spendingstracker.app.dto.oauth.OAuthPayload;

/** Interface that defines a service for third party OAuth client */
public interface OAuthPayloadService {
    /**
     * Extracts a <code>OAuthPayload</code> object from the JWT <code>oAuthCredential</code>
     *
     * @param oAuthCredential JWT obtained from authenticating with the 3rd Party OAuth client
     * @return <code>OAuthPayload</code> object containing data extracted from JWT
     * @see OAuthPayload
     */
    OAuthPayload extractPayload(String oAuthCredential);

    /**
     * @param externalUserType
     * @return if the service can verify/extract payloads for external user type of <code>
     *     externalUserType</code>
     * @see ExternalUserType
     */
    boolean handles(ExternalUserType externalUserType);
}
