package com.spendingstracker.app.dto.requests;

import java.util.UUID;

/**
 * Request object for resetting password
 *
 * @param password new password
 * @param uuid UUID for the password request, the valid UUID is only accessible to the user with the
 *     email
 */
public record ResetPasswordRequest(String password, UUID uuid) {}
