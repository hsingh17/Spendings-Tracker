package com.spendingstracker.app.service.user;

import com.spendingstracker.app.constants.ExternalUserType;
import com.spendingstracker.app.dto.oauth.OAuthPayload;
import com.spendingstracker.app.entity.ExternalUser;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.repository.ExternalUserRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ExternalUserServiceImpl implements ExternalUserService {
    private final UserService userService;
    private final ExternalUserRepository externalUserRepository;

    public ExternalUserServiceImpl(
            UserService userService, ExternalUserRepository externalUserRepository) {
        this.userService = userService;
        this.externalUserRepository = externalUserRepository;
    }

    @Override
    public boolean exists(OAuthPayload oAuthPayload, ExternalUserType externalUserType) {
        return externalUserRepository.existsExternalUser(
                        oAuthPayload.username(),
                        oAuthPayload.email(),
                        oAuthPayload.externalIdentif(),
                        externalUserType)
                >= 1;
    }

    @Override
    public void createUser(OAuthPayload oAuthPayload, ExternalUserType externalUserType) {
        // External users don't have a password
        User user = userService.createUser(oAuthPayload.username(), oAuthPayload.email(), "");
        user.setVerified(true); // Set as verified by default
        ExternalUser externalUser =
                new ExternalUser(user, externalUserType, oAuthPayload.externalIdentif());
        externalUserRepository.save(externalUser);
    }
}
