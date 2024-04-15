package com.spendingstracker.app.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;
import java.util.UUID;

@Entity
@Table(schema = "APP", name = "EMAIL")
@Getter
@Setter
@NoArgsConstructor
public class Email extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EMAIL_ID")
    private BigInteger emailId;

    @Column(name = "FROM_EMAIL")
    private String fromEmail;

    @Column(name = "TO_EMAIL")
    private String toEmail;

    @Column(name = "TEMPLATE_NAME")
    private String templateName;

    @Lob
    @Column(name = "TEMPLATE_DATA")
    private byte[] templateData;

    @Column(name = "SES_MESSAGE_ID")
    private UUID sesMessageId;

    public Email(
            String fromEmail,
            String toEmail,
            String templateName,
            byte[] templateData,
            UUID sesMessageId) {
        this.fromEmail = fromEmail;
        this.toEmail = toEmail;
        this.templateName = templateName;
        this.templateData = templateData;
        this.sesMessageId = sesMessageId;
    }
}
