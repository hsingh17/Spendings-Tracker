package com.spendingstracker.app.proxy.aws;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spendingstracker.app.entity.Email;
import com.spendingstracker.app.exception.DeserializationException;
import com.spendingstracker.app.exception.SerializationException;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.services.sesv2.SesV2Client;
import software.amazon.awssdk.services.sesv2.model.*;

import java.io.IOException;

@Service
@Slf4j
public class AwsSesProxyServiceImpl implements AwsSesProxyService {
    private final SesV2Client sesClient;
    private final String fromEmail;
    private final ObjectMapper objectMapper;

    public AwsSesProxyServiceImpl(
            SesV2Client sesClient,
            @Value("${ses.from-email}") String fromEmail,
            ObjectMapper objectMapper) {
        this.sesClient = sesClient;
        this.fromEmail = fromEmail;
        this.objectMapper = objectMapper;
    }

    @Override
    public <T> Email sendTemplatedEmail(
            String templateName, String toEmail, byte[] templateData, Class<T> clazz) {
        return sendTemplatedEmail(
                templateName, toEmail, deserializeBytesToObj(templateData, clazz));
    }

    @Override
    public Email sendTemplatedEmail(String templateName, String toEmail, Object templateData) {
        Destination destination = Destination.builder().toAddresses(toEmail).build();
        Template template =
                Template.builder()
                        .templateName(templateName)
                        .templateData(serializeObjToString(templateData))
                        .build();

        EmailContent emailContent = EmailContent.builder().template(template).build();
        SendEmailRequest sendEmailRequest =
                SendEmailRequest.builder()
                        .destination(destination)
                        .content(emailContent)
                        .fromEmailAddress(fromEmail)
                        .build();

        log.info(
                "Sending templated email. TEMPLATE NAME {}. TO EMAIL {}. FROM EMAIL {}",
                templateName,
                toEmail,
                fromEmail);
        SendEmailResponse response = sesClient.sendEmail(sendEmailRequest);
        String messageId = response.messageId();
        log.info("Sent templated email to {}. Message ID: {} ", toEmail, messageId);

        return new Email(
                fromEmail, toEmail, templateName, serializeObjToBytes(templateData), messageId);
    }

    /**
     * @param templateData
     * @return Serialization of <code>templateData</code> into a <code>String</code>
     * @throws SerializationException when <code>templateData</code> can't be serialized.
     * @see SerializationException
     */
    private String serializeObjToString(Object templateData) {
        try {
            return objectMapper.writeValueAsString(templateData);
        } catch (JsonProcessingException e) {
            String errMsg =
                    "Could not serialize object to String. Received exception message: "
                            + e.getMessage();
            log.error(errMsg);
            throw new SerializationException(errMsg);
        }
    }

    /**
     * @param templateData
     * @return Serialization of <code>templateData</code> into <code>byte[]</code>
     * @throws SerializationException when <code>templateData</code> can't be serialized.
     * @see SerializationException
     */
    private byte[] serializeObjToBytes(Object templateData) {
        try {
            return objectMapper.writeValueAsBytes(templateData);
        } catch (JsonProcessingException e) {
            String errMsg =
                    "Could not serialize object to byte[]. Received exception message: "
                            + e.getMessage();
            log.error(errMsg);
            throw new SerializationException(errMsg);
        }
    }

    private <T> T deserializeBytesToObj(byte[] templateData, Class<T> clazz) {
        try {
            return objectMapper.readValue(templateData, clazz);
        } catch (IOException e) {
            String errMsg =
                    "Could not deserialize object to "
                            + clazz.getName()
                            + ". Received exception message: "
                            + e.getMessage();
            log.error(errMsg);
            throw new DeserializationException(errMsg);
        }
    }
}
