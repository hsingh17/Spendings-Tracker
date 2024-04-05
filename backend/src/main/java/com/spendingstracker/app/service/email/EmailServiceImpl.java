package com.spendingstracker.app.service.email;

import static jakarta.mail.Message.RecipientType.TO;

import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.entity.UserRegistration;
import com.spendingstracker.app.repository.UserRegistrationRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.Properties;

@Service
@Slf4j
@Transactional
public class EmailServiceImpl implements EmailService {
    private final UserRegistrationRepository userRegistrationRepository;
    private final Gmail gmailClient;
    private final String fromEmail;
    private final Session session = Session.getDefaultInstance(new Properties());

    public EmailServiceImpl(
            UserRegistrationRepository userRegistrationRepository,
            Gmail gmailClient,
            @Value("${gmail.from}") String fromEmail) {
        this.userRegistrationRepository = userRegistrationRepository;
        this.gmailClient = gmailClient;
        this.fromEmail = fromEmail;
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

    private String sendRegistrationEmail(String emailAddr, String pin) {
        String subject = "TEST";
        MimeMessage email = new MimeMessage(session);
        log.info("Composing mail for {}", emailAddr);
        try {
            email.setFrom(fromEmail);
            email.addRecipient(TO, new InternetAddress(emailAddr));
            email.setSubject(subject);
            email.setText(pin);

            ByteArrayOutputStream buffer = new ByteArrayOutputStream();
            email.writeTo(buffer);
            byte[] rawMessageBytes = buffer.toByteArray();
            String encodedEmail = Base64.getUrlEncoder().encodeToString(rawMessageBytes);
            Message message = new Message();
            message.setRaw(encodedEmail);

            log.info("Sending mail to {}", emailAddr);
            message = gmailClient.users().messages().send("me", message).execute();
            log.info("Message id: " + message.getId());
            log.info(message.toPrettyString());
            return message.getId();
        } catch (MessagingException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    private void saveUserRegistration(User user, String pin, String gmailMessageId) {
        UserRegistration userRegistration = new UserRegistration(user, pin, gmailMessageId);
        userRegistrationRepository.save(userRegistration);
    }
}
