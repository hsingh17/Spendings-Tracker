package com.spendingstracker.app.service;

import com.spendingstracker.app.repository.SpendingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SpendingService {
    @Autowired
    SpendingRepository spendingRepository;
}
