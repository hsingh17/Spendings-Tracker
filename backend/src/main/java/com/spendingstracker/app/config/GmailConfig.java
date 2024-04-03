package com.spendingstracker.app.config;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.GmailScopes;

import lombok.extern.slf4j.Slf4j;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.util.List;

/**
 * Configuration to create a <code>Gmail</code> object that can be used to interact with the Gmail
 * API
 *
 * @see Gmail
 */
@Configuration
@Slf4j
public class GmailConfig {
    public static final List<String> SCOPES =
            List.of(GmailScopes.GMAIL_SEND, GmailScopes.GMAIL_COMPOSE);

    /**
     * @param gmailCredentials <code>Resource</code> object that contains the <code>credentials.json
     *     </code> file containing Gmail API credentials
     * @param port port the server runs on
     * @return <code>Gmail</code> object to interact with the Gmail API
     * @throws IOException
     * @throws GeneralSecurityException
     */
    @Bean
    public Gmail getGmailServiceClient(
            @Value("${gmail.credentials-path}") Resource gmailCredentials,
            @Value("${gmail.tokens-directory}") String tokensPath,
            @Value("${server.port}") Integer port)
            throws IOException, GeneralSecurityException {
        if (gmailCredentials == null || !gmailCredentials.exists()) {
            String errMsg = "Gmail credentials not found!";
            log.error(errMsg);
            throw new ResourceNotFoundException(errMsg);
        }

        JsonFactory jsonFactory = GsonFactory.getDefaultInstance();
        GoogleClientSecrets clientSecrets =
                GoogleClientSecrets.load(
                        jsonFactory, new InputStreamReader(gmailCredentials.getInputStream()));

        GoogleAuthorizationCodeFlow flow =
                new GoogleAuthorizationCodeFlow.Builder(
                                GoogleNetHttpTransport.newTrustedTransport(),
                                jsonFactory,
                                clientSecrets,
                                SCOPES)
                        .setDataStoreFactory(new FileDataStoreFactory(new File(tokensPath)))
                        .setAccessType("offline")
                        .build();

        LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(port).build();
        Credential credential = new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
        return new Gmail.Builder(
                        GoogleNetHttpTransport.newTrustedTransport(), jsonFactory, credential)
                .build();
    }
}