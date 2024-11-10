package com.spendingstracker.app.dto.response;

import lombok.Getter;

@Getter
public class RegisterAcctResponse extends GenericResponse {
    private final String username;
    private final String email;

    public RegisterAcctResponse(String username, String email, String message) {
        super(message);
        this.username = username;
        this.email = email;
    }
}
