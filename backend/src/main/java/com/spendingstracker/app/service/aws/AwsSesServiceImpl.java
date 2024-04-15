package com.spendingstracker.app.service.aws;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spendingstracker.app.entity.Email;
import com.spendingstracker.app.exception.SerializationException;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.services.sesv2.SesV2Client;
import software.amazon.awssdk.services.sesv2.model.*;

import java.util.UUID;

@Service
@Slf4j
public class AwsSesServiceImpl implements AwsSesService {
    private final SesV2Client sesClient;
    private final String fromEmail;
    private final ObjectMapper objectMapper;

    public AwsSesServiceImpl(
            SesV2Client sesClient,
            @Value("${ses.from-email}") String fromEmail,
            ObjectMapper objectMapper) {
        this.sesClient = sesClient;
        this.fromEmail = fromEmail;
        this.objectMapper = objectMapper;
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
                fromEmail,
                toEmail,
                templateName,
                serializeObjToBytes(templateData),
                UUID.fromString(messageId));
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
}
