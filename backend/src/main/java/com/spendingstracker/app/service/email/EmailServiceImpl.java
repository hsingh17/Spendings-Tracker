package com.spendingstracker.app.service.email;

import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.entity.UserRegistration;
import com.spendingstracker.app.repository.UserRegistrationRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import software.amazon.awssdk.services.sesv2.SesV2Client;

@Service
@Slf4j
@Transactional
public class EmailServiceImpl implements EmailService {
    private final SesV2Client sesClient;
    private final UserRegistrationRepository userRegistrationRepository;

    public EmailServiceImpl(
            SesV2Client sesClient, UserRegistrationRepository userRegistrationRepository) {
        this.sesClient = sesClient;
        this.userRegistrationRepository = userRegistrationRepository;
    }

    @Override
    // TODO: This could be an asynchronous thread.
    public void sendEmail(User user) {
        String pin = generateRandomPin();
        String gmailMessageId = sendRegistrationEmail(user.getEmail(), pin);
        saveUserRegistration(user, pin, gmailMessageId);
    }

    private String generateRandomPin() {
        return String.valueOf(Math.floor((Math.random() * (99999 - 10000))) + 10000);
    }

    private String sendRegistrationEmail(String emailAddr, String pin) {}

    private void saveUserRegistration(User user, String pin, String gmailMessageId) {
        UserRegistration userRegistration = new UserRegistration(user, pin, gmailMessageId);
        userRegistrationRepository.save(userRegistration);
    }
}
