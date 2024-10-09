package com.spendingstracker.app.dto.requests;

import jakarta.validation.constraints.Email;

public record RegisterAcctRequest(String username, String password, @Email String email) {}
