package com.spendingstracker.app.service.email;

import com.spendingstracker.app.dto.requests.RegistrationEmailSesTemplateData;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.entity.UserRegistration;
import com.spendingstracker.app.repository.UserRegistrationRepository;
import com.spendingstracker.app.service.aws.AwsSesService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Implementation of the <code>EmailService</code>
 *
 * @see EmailService
 */
@Service
@Slf4j
@Transactional
public class EmailServiceImpl implements EmailService {
    private final UserRegistrationRepository userRegistrationRepository;
    private final AwsSesService awsSesService;
    private final String websiteURL;

    public EmailServiceImpl(
            UserRegistrationRepository userRegistrationRepository,
            AwsSesService awsSesService,
            @Value("${ses.website-url}") String websiteURL) {
        this.userRegistrationRepository = userRegistrationRepository;
        this.awsSesService = awsSesService;
        this.websiteURL = websiteURL;
    }

    @Override
    public void sendRegistrationEmail(User user) {
        String pin = generateRandomPin();
        RegistrationEmailSesTemplateData templateData =
                new RegistrationEmailSesTemplateData(pin, createUserRegisterRedirectUrl(user));

        String messageId = awsSesService.sendTemplatedEmail("", user.getEmail(), templateData);

        saveUserRegistration(user, pin, messageId);
    }

    /**
     * Creates the user's personal redirect URL to the console so that they can get to the verify
     * code screen.
     *
     * @param user
     * @return user's personal redirect URL
     */
    private String createUserRegisterRedirectUrl(User user) {
        return websiteURL + "username=" + user.getUsername();
    }

    /**
     * Save a <code>UserRegistration</code> object to the database.
     *
     * @param user
     * @param pin
     * @param messageId
     * @see UserRegistration
     */
    private void saveUserRegistration(User user, String pin, String messageId) {
        UserRegistration userRegistration = new UserRegistration(user, pin, messageId);
        userRegistrationRepository.save(userRegistration);
    }

    /**
     * @return 5 digit random pin for registration
     */
    private String generateRandomPin() {
        return String.valueOf(Math.floor((Math.random() * (99999 - 10000))) + 10000);
    }
}
