package com.spendingstracker.app.service.email;

import com.google.api.services.gmail.Gmail;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.entity.UserRegistration;
import com.spendingstracker.app.repository.UserRegistrationRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
public class EmailServiceImpl implements EmailService {
    private final UserRegistrationRepository userRegistrationRepository;

    private final Gmail gmailClient;

    public EmailServiceImpl(
            UserRegistrationRepository userRegistrationRepository, Gmail gmailClient) {
        this.userRegistrationRepository = userRegistrationRepository;
        this.gmailClient = gmailClient;
    }

    @Override
    // TODO: This could be an asynchronous thread.
    public void sendEmail(User user) {
        String pin = generateRandomPin();
        String gmailMessageId = sendRegistrationEmail(user.getEmail(), pin);
        saveUserRegistration(user, pin, gmailMessageId);
    }

    private String generateRandomPin() {
        return "TODO";
    }

    private String sendRegistrationEmail(String email, String pin) {
        log.info("Sending registration email to {}", email);
        return "TODO";
    }

    private void saveUserRegistration(User user, String pin, String gmailMessageId) {
        UserRegistration userRegistration = new UserRegistration(user, pin, gmailMessageId);
        userRegistrationRepository.save(userRegistration);
    }
}
