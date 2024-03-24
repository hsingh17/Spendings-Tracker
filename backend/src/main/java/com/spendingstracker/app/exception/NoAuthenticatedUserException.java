package com.spendingstracker.app.exception;

/**
 * Exception for when an invalid <code>GraphType</code> is passed.
 *
 * @see com.spendingstracker.app.constants.GraphType
 */
public class NoAuthenticatedUserException extends RuntimeException {
    public NoAuthenticatedUserException(String message) {
        super(message);
    }
}
