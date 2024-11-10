package com.spendingstracker.app.service.registration;

import com.spendingstracker.app.entity.Email;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.entity.UserRegistration;
import com.spendingstracker.app.repository.UserRegistrationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserRegistrationServiceImpl implements UserRegistrationService {
    private final UserRegistrationRepository userRegistrationRepository;

    @Override
    public String findOrGeneratePin(User user) {
        String username = user.getUsername();
        UserRegistration userRegistration = user.getUserRegistration();

        if (userRegistration != null) {
            log.info("User {} has a pin already.", username);
            return userRegistration.getPin();
        }

        log.info("Generating random pin for user {}", username);
        return generateRandomPin();
    }

    @Override
    public void saveUserRegistration(User user, String pin, Email email) {
        String username = user.getUsername();
        UserRegistration userRegistration = user.getUserRegistration();

        if (userRegistration != null) {
            log.info("User {} has already attempted registration", username);
            return;
        }

        userRegistration = new UserRegistration(user, pin, email);
        userRegistrationRepository.save(userRegistration);
    }

    /**
     * @return 5 digit random pin for registration
     */
    private String generateRandomPin() {
        return String.valueOf((int) (Math.floor((Math.random() * (99999 - 10000))) + 10000));
    }
}
