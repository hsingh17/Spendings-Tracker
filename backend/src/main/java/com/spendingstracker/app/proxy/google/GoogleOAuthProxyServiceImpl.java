package com.spendingstracker.app.proxy.google;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.spendingstracker.app.dto.GoogleOAuthPayload;
import com.spendingstracker.app.exception.InvalidGoogleOAuthToken;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
@Slf4j
public class GoogleOAuthProxyServiceImpl implements GoogleOAuthProxyService {
    private final GoogleIdTokenVerifier tokenVerifier;

    public GoogleOAuthProxyServiceImpl(@Value("${google.client-id}") String clientId) {
        tokenVerifier =
                new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                        .setAudience(Collections.singleton(clientId))
                        .build();
    }

    @Override
    public GoogleOAuthPayload extractPayload(String googleCredential) {
        GoogleIdToken token = verifyToken(googleCredential);
        GoogleIdToken.Payload payload = token.getPayload();
        String email = payload.getEmail();
        return new GoogleOAuthPayload(extractUsernameFromEmail(email), email, payload.getSubject());
    }

    /**
     * Extracts username from Google user's <code>email</code>. For Google external users, their
     * username is defaulted to the part of their email before the "@gmail.com" domain.
     *
     * @param email
     * @return username extracted from the email
     */
    private String extractUsernameFromEmail(String email) {
        if (!email.contains("@")) {
            return email;
        }

        return email.substring(0, email.indexOf("@"));
    }

    /**
     * Verifies that <code>googleCredential</code> is a valid Google JWT.
     *
     * @param googleCredential Google JWT
     * @return <code>GoogleIdToken</code> object for a valid Google JWT
     * @throws InvalidGoogleOAuthToken if an invalid Google JWT was provided.
     */
    private GoogleIdToken verifyToken(String googleCredential) {
        GoogleIdToken token;
        try {
            token = tokenVerifier.verify(googleCredential);
        } catch (GeneralSecurityException e) {
            String errMsg = "Security exception occurred while verifying Google credentials";
            log.error(errMsg);
            throw new InvalidGoogleOAuthToken(errMsg);
        } catch (IOException e) {
            log.error("IO Exception while verifying Google credentials");
            throw new RuntimeException(e);
        }

        if (token == null) {
            String errMsg = "Invalid Google JWT token provided!";
            log.error(errMsg);
            throw new InvalidGoogleOAuthToken(errMsg);
        }

        return token;
    }
}
