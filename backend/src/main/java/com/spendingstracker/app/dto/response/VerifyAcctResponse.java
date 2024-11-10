package com.spendingstracker.app.dto.response;

import lombok.Getter;

@Getter
public class VerifyAcctResponse extends GenericResponse {
    private final String username;

    public VerifyAcctResponse(String username, String message) {
        super(message);
        this.username = username;
    }
}
