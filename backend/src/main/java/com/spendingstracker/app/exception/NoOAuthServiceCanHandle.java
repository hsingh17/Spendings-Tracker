package com.spendingstracker.app.exception;

/**
 * Exception for when there is no OAuthPayloadService that can handle the external user type
 *
 * @see com.spendingstracker.app.service.oauth.OAuthPayloadService
 */
public class NoOAuthServiceCanHandle extends RuntimeException {
    public NoOAuthServiceCanHandle(String message) {
        super(message);
    }
}
