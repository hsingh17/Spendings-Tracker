package com.spendingstracker.app.service.email;

import com.spendingstracker.app.constants.SesTemplateNames;
import com.spendingstracker.app.constants.WebsiteRedirects;
import com.spendingstracker.app.dto.requests.PasswordResetSesTemplateData;
import com.spendingstracker.app.dto.requests.RegistrationEmailSesTemplateData;
import com.spendingstracker.app.entity.Email;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.service.aws.AwsSesService;
import com.spendingstracker.app.service.password.UserPasswordResetService;
import com.spendingstracker.app.service.registration.UserRegistrationService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;
import java.util.UUID;

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
    private final UserPasswordResetService userPasswordResetService;
    private final AwsSesService awsSesService;
    private final WebsiteRedirects websiteRedirects;

    public EmailServiceImpl(
            SesTemplateNames sesTemplateNames,
            UserRegistrationService userRegistrationService,
            UserPasswordResetService userPasswordResetService,
            AwsSesService awsSesService,
            WebsiteRedirects websiteRedirects) {
        this.sesTemplateNames = sesTemplateNames;
        this.userRegistrationService = userRegistrationService;
        this.userPasswordResetService = userPasswordResetService;
        this.awsSesService = awsSesService;
        this.websiteRedirects = websiteRedirects;
    }

    @Override
    public void sendRegistrationEmail(User user) {
        // Check if user was already sent a registration email
        Email userRegEmail = user.getRegistrationEmail();
        if (resendEmail(userRegEmail)) {
            return;
        }

        log.info("First time sending email to user {}", user.getUsername());
        String pin = userRegistrationService.findOrGeneratePin(user);
        String redirectUrl =
                buildUrlString(
                        websiteRedirects.getVerifyAcct(),
                        Map.of("username", List.of(user.getUsername())));

        RegistrationEmailSesTemplateData templateData =
                new RegistrationEmailSesTemplateData(pin, redirectUrl);

        Email email =
                awsSesService.sendTemplatedEmail(
                        sesTemplateNames.getRegistrationEmail(), user.getEmail(), templateData);

        userRegistrationService.saveUserRegistration(user, pin, email);
    }

    @Override
    public void sendPasswordResetEmail(User user) {
        // Check if we can just simply resend a password reset email
        Email passwordResetEmail = user.getPasswordResetEmail();
        if (resendEmail(passwordResetEmail)) {
            return;
        }

        String username = user.getUsername();
        log.info("Sending password reset email to {}", username);

        UUID uuid = UUID.randomUUID();
        String redirectUrl =
                buildUrlString(
                        websiteRedirects.getPasswordReset(),
                        Map.of("username", List.of(username), "uuid", List.of(uuid.toString())));

        PasswordResetSesTemplateData templateData =
                new PasswordResetSesTemplateData(username, redirectUrl);

        Email email =
                awsSesService.sendTemplatedEmail(
                        sesTemplateNames.getPasswordResetEmail(), user.getEmail(), templateData);

        userPasswordResetService.saveUserPasswordResetService(uuid, email, user);
    }

    /**
     * Attempts to resend email to user
     *
     * @param email email to resend
     * @return boolean value indicating if user was successfully <b>resent</b> an email
     */
    private boolean resendEmail(Email email) {
        if (email == null) {
            return false;
        }

        // Use the previously sent email information to resend the registration email
        log.info("Resending email to {}", email.getToEmail());
        awsSesService.sendTemplatedEmail(
                email.getTemplateName(), email.getToEmail(), email.getTemplateData());
        return true;
    }

    /**
     * @param basePath
     * @param queryParams query parameters for the URL
     * @return <code>String</code> that is of form <code>basePath?{queryParams}</code>
     */
    private String buildUrlString(String basePath, Map<String, List<String>> queryParams) {
        MultiValueMap<String, String> mvQueryParams = CollectionUtils.toMultiValueMap(queryParams);

        return UriComponentsBuilder.fromUriString(basePath)
                .queryParams(mvQueryParams)
                .toUriString();
    }
}
