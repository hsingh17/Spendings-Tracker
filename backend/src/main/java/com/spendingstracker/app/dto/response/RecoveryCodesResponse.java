package com.spendingstracker.app.dto.response;

import java.util.List;

/** Response object for request to retrieve a user's recovery codes */
public record RecoveryCodesResponse(List<String> recoveryCodes) {}
