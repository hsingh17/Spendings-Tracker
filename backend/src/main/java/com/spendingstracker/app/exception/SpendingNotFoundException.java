package com.spendingstracker.app.exception;

/** Exception for when a spending is not found for a particular <code>SPENDING_ID</code> */
public class SpendingNotFoundException extends RuntimeException {
    public SpendingNotFoundException(String message) {
        super(message);
    }
}
