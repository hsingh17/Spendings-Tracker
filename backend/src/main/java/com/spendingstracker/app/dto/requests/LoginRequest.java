package com.spendingstracker.app.dto.requests;

/**
 * Object to store the RequestBody for login requests. Notes:
 *
 * <ul>
 *   <li>If user is signing through built-in flow, <code>username</code> and <code>password</code>
 *       will be populated.
 *   <li>If user is signing in with Google, <code>oAuthCredential</code> will be populated.
 * </ul>
 */
public record LoginRequest(String username, String password, String oAuthCredential) {}
