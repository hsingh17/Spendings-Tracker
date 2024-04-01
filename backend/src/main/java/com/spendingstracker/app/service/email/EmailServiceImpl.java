package com.spendingstracker.app.service.email;

import com.google.api.services.gmail.Gmail;
import com.spendingstracker.app.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailServiceImpl implements EmailService {
    private final Gmail gmailClient;

    public EmailServiceImpl(Gmail gmailClient) {
        this.gmailClient = gmailClient;
    }

    @Override
    // This could be an asynchronous thread.
    public void sendEmail(User user) {


    }
}
