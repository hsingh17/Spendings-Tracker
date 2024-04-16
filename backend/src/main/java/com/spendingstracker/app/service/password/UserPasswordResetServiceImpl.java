package com.spendingstracker.app.service.password;

import com.spendingstracker.app.entity.Email;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.entity.UserPasswordReset;
import com.spendingstracker.app.repository.UserPasswordResetRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
public class UserPasswordResetServiceImpl implements UserPasswordResetService {
    private final UserPasswordResetRepository userPasswordResetRepository;

    public UserPasswordResetServiceImpl(UserPasswordResetRepository userPasswordResetRepository) {
        this.userPasswordResetRepository = userPasswordResetRepository;
    }

    @Override
    public void saveUserPasswordResetService(UUID uuid, Email email, User user) {
        userPasswordResetRepository.save(new UserPasswordReset(uuid, email, user));
    }
}
