package com.spendingstracker.app.dto.response;

/** Response object for when user wants to resend registration email. */
public class ResendRegistrationEmailResponse extends GenericResponse {
    public ResendRegistrationEmailResponse(String message) {
        super(message);
    }
}
