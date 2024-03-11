package com.spendingstracker.app.dto.request;

/** Object to store the RequestBody for login requests */
public record LoginRequest(String username, String password) {}
