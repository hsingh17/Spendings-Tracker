package com.spendingstracker.app.service.email;

import com.spendingstracker.app.constants.SesTemplateNames;
import com.spendingstracker.app.constants.WebsiteRedirects;
import com.spendingstracker.app.dto.requests.PasswordResetSesTemplateData;
import com.spendingstracker.app.dto.requests.RegistrationEmailSesTemplateData;
import com.spendingstracker.app.entity.Email;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.proxy.aws.AwsSesProxyService;
import com.spendingstracker.app.service.password.UserPasswordResetService;
import com.spendingstracker.app.service.registration.UserRegistrationService;

import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final SesTemplateNames sesTemplateNames;
    private final UserRegistrationService userRegistrationService;
    private final UserPasswordResetService userPasswordResetService;
    private final AwsSesProxyService awsSesProxyService;
    private final WebsiteRedirects websiteRedirects;

    @Override
    public void sendRegistrationEmail(User user) {
        // Check if user was already sent a registration email
        Email userRegEmail = user.getRegistrationEmail();
        if (resendEmail(userRegEmail, RegistrationEmailSesTemplateData.class)) {
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
                awsSesProxyService.sendTemplatedEmail(
                        sesTemplateNames.getRegistrationEmail(), user.getEmail(), templateData);

        userRegistrationService.saveUserRegistration(user, pin, email);
    }

    @Override
    public void sendPasswordResetEmail(User user) {
        // Check if we can just simply resend a password reset email
        Email passwordResetEmail = user.getPasswordResetEmail();
        if (resendEmail(passwordResetEmail, PasswordResetSesTemplateData.class)) {
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
                awsSesProxyService.sendTemplatedEmail(
                        sesTemplateNames.getPasswordResetEmail(), user.getEmail(), templateData);

        userPasswordResetService.saveUserPasswordResetService(uuid, email, user);
    }

    /**
     * Attempts to resend email to user
     *
     * @param email email to resend
     * @return boolean value indicating if user was successfully <b>resent</b> an email
     */
    private <T> boolean resendEmail(Email email, Class<T> clazz) {
        if (email == null) {
            return false;
        }

        // Use the previously sent email information to resend the registration email
        log.info("Resending email to {}", email.getToEmail());

        awsSesProxyService.sendTemplatedEmail(
                email.getTemplateName(), email.getToEmail(), email.getTemplateData(), clazz);
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
