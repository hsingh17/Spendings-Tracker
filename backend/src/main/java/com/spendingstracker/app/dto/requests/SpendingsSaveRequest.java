package com.spendingstracker.app.dto.requests;

import java.util.Set;

public record SpendingsSaveRequest(Set<SpendingRequest> spendingRequests) {}
