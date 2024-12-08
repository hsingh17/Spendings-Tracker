package com.spendingstracker.app.dto.response;

/** Object containing response for sending an email to reset a user's password */
public class SendPasswordResetEmailResponse extends GenericResponse {
    public SendPasswordResetEmailResponse(String message) {
        super(message);
    }
}
