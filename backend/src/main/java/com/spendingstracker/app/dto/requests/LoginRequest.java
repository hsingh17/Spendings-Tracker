package com.spendingstracker.app.dto.requests;

/** Object to store the RequestBody for login requests */
public record LoginRequest(String username, String password) {}
