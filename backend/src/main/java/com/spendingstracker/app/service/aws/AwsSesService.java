package com.spendingstracker.app.service.aws;

/** Interface that defines a service for sending emails with SES. */
public interface AwsSesService {
    /**
     * Sends a templated email with AWS SES.
     *
     * @param templateName name of the template to use
     * @param toEmail who the email is going to
     * @param templateData data that goes in the template
     * @return SES message ID
     */
    String sendTemplatedEmail(String templateName, String toEmail, Object templateData);
}
