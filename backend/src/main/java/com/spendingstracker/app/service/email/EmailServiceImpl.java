package com.spendingstracker.app.service.email;

import com.spendingstracker.app.constants.SesTemplateNames;
import com.spendingstracker.app.dto.requests.RegistrationEmailSesTemplateData;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.service.aws.AwsSesService;
import com.spendingstracker.app.service.registration.UserRegistrationService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * Implementation of the <code>EmailService</code>
 *
 * @see EmailService
 */
@Service
@Slf4j
public class EmailServiceImpl implements EmailService {
    private final SesTemplateNames sesTemplateNames;
    private final UserRegistrationService userRegistrationService;
    private final AwsSesService awsSesService;
    private final String websiteURL;

    public EmailServiceImpl(
            SesTemplateNames sesTemplateNames,
            UserRegistrationService userRegistrationService,
            AwsSesService awsSesService,
            @Value("${ses.website-url}") String websiteURL) {
        this.sesTemplateNames = sesTemplateNames;
        this.userRegistrationService = userRegistrationService;
        this.awsSesService = awsSesService;
        this.websiteURL = websiteURL;
    }

    @Override
    public void sendRegistrationEmail(User user) {
        String pin = userRegistrationService.findOrGeneratePin(user);
        RegistrationEmailSesTemplateData templateData =
                new RegistrationEmailSesTemplateData(pin, createUserRegisterRedirectUrl(user));

        String messageId =
                awsSesService.sendTemplatedEmail(
                        sesTemplateNames.getRegistrationEmail(), user.getEmail(), templateData);

        userRegistrationService.attemptSaveUserRegistration(user, pin, messageId);
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
}
