package com.spendingstracker.app.service.aws;

import com.spendingstracker.app.entity.Email;

/** Interface that defines a service for sending emails with SES. */
public interface AwsSesService {
    /**
     * Sends a templated email with AWS SES where the <code>templateData</code> is a <code>byte[]
     * </code>.
     *
     * @param templateName name of the template to use
     * @param toEmail      who the email is going to
     * @param templateData data that goes in the template
     * @param clazz
     * @return <code>Email</code> entity containing SES templated email information
     * @see Email
     */
    <T> Email sendTemplatedEmail(
            String templateName, String toEmail, byte[] templateData, Class<T> clazz);

    /**
     * Sends a templated email with AWS SES.
     *
     * @param templateName name of the template to use
     * @param toEmail who the email is going to
     * @param templateData data that goes in the template
     * @return <code>Email</code> entity containing SES templated email information
     * @see Email
     */
    Email sendTemplatedEmail(String templateName, String toEmail, Object templateData);
}
