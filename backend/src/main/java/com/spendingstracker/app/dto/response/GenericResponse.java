package com.spendingstracker.app.dto.response;

import lombok.Getter;

/** Generic response object so that same response fields are collected in 1 object */
@Getter
public abstract class GenericResponse {
    private final String message;

    protected GenericResponse(String message) {
        this.message = message;
    }
}
