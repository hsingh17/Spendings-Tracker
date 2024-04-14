package com.spendingstracker.app.dto.requests;

/**
 * Request object for resetting password
 *
 * @param username username of user who wants to reset password
 * @param password new password
 * @param uuid UUID for the password request, the valid UUID is only accessible to the user with the
 *     email
 */
public record ResetPasswordRequest(String username, String password, String uuid) {}
