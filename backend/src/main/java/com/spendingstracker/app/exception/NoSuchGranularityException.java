package com.spendingstracker.app.exception;

/**
 * Exception for when an invalid <code>Granularity</code> is passed.
 *
 * @see com.spendingstracker.app.constants.Granularity
 */
public class NoSuchGranularityException extends RuntimeException {
    public NoSuchGranularityException(String message) {
        super(message);
    }
}
