package com.spendingstracker.app.dto.requests;

import com.spendingstracker.app.constants.SpendingCategoryEnum;

import java.math.BigDecimal;
import java.math.BigInteger;

/** DTO for requests on performing CRUD operations on spendings */
public record SpendingRequest(
        BigInteger spendingId,
        SpendingCategoryEnum category,
        BigDecimal amount,
        String memo,
        boolean delete) {}
