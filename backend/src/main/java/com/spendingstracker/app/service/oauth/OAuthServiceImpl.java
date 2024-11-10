package com.spendingstracker.app.service.oauth;

import com.spendingstracker.app.constants.ExternalUserType;
import com.spendingstracker.app.dto.oauth.OAuthPayload;
import com.spendingstracker.app.exception.NoOAuthServiceCanHandle;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class OAuthServiceImpl implements OAuthService {
    private final List<OAuthPayloadService> oAuthPayloadServices;

    @Override
    public OAuthPayload extractPayload(String oAuthCredential, ExternalUserType externalUserType) {
        for (OAuthPayloadService oAuthPayloadService : oAuthPayloadServices) {
            if (oAuthPayloadService.handles(externalUserType)) {
                return oAuthPayloadService.extractPayload(oAuthCredential);
            }
        }

        String errMsg =
                "No OAuthPayloadService found that can handle external user of type "
                        + externalUserType;
        log.error(errMsg);
        throw new NoOAuthServiceCanHandle(errMsg);
    }
}
