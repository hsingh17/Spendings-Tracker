package com.spendingstracker.app.service.aws;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spendingstracker.app.exception.SerializationException;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.services.sesv2.SesV2Client;
import software.amazon.awssdk.services.sesv2.model.*;

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
    public String sendTemplatedEmail(String templateName, String toEmail, Object templateData) {
        Destination destination = Destination.builder().toAddresses(toEmail).build();
        Template template =
                Template.builder()
                        .templateName(templateName)
                        .templateData(serializeObj(templateData))
                        .build();

        EmailContent emailContent = EmailContent.builder().template(template).build();
        SendEmailRequest sendEmailRequest =
                SendEmailRequest.builder()
                        .destination(destination)
                        .content(emailContent)
                        .fromEmailAddress(fromEmail)
                        .build();

        SendEmailResponse response = sesClient.sendEmail(sendEmailRequest);
        return response.messageId();
    }

    /**
     * @param templateData
     * @return Serialization of <code>templateData</code> into a <code>String</code>
     * @throws SerializationException when <code>templateData</code> can't be serialized.
     * @see SerializationException
     */
    private String serializeObj(Object templateData) {
        try {
            return objectMapper.writeValueAsString(templateData);
        } catch (JsonProcessingException e) {
            String errMsg =
                    "Could not serialize object. Received exception message: " + e.getMessage();
            log.error(errMsg);
            throw new SerializationException(errMsg);
        }
    }
}
