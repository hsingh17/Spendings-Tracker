package com.spendingstracker.app.proxy.google;

import com.spendingstracker.app.dto.GoogleOAuthPayload;

/**
 * Interface that defines a proxy service for interacting with the Google OAuth API Client Library
 */
public interface GoogleOAuthProxyService {
    /**
     * Extracts a <code>GoogleOAuthPayload</code> object from the JWT <code>googleCredential</code>
     *
     * @param googleCredential JWT obtained from authenticating with Google
     * @return <code>GoogleOAuthPayload</code> object containing data extracted from JWT
     * @see GoogleOAuthPayload
     */
    GoogleOAuthPayload extractPayload(String googleCredential);
}
