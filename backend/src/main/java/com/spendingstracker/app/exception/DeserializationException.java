package com.spendingstracker.app.exception;

/** Exception for when an object can not be deserialized by <code>ObjectMapper</code> */
public class DeserializationException extends RuntimeException {
    public DeserializationException(String message) {
        super(message);
    }
}
