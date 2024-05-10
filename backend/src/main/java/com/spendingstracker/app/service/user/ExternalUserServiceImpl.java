package com.spendingstracker.app.service.user;

import com.spendingstracker.app.constants.ExternalUserType;
import com.spendingstracker.app.dto.oauth.OAuthPayload;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ExternalUserServiceImpl implements ExternalUserService {


    @Override
    public boolean existsUser(OAuthPayload oAuthPayload) {
        return false;
    }

    @Override
    public void createUser(OAuthPayload oAuthPayload, ExternalUserType externalUserType) {}
}
