package com.spendingstracker.app.dto.requests;

public record ChangePasswordRequest(String oldPassword, String newPassword) {}
