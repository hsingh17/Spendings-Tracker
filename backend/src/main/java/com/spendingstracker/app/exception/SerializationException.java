package com.spendingstracker.app.exception;

/** Exception for when an object can not be serialized by <code>ObjectMapper</code> */
public class SerializationException extends RuntimeException {
    public SerializationException(String message) {
        super(message);
    }
}
