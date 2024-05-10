package com.spendingstracker.app.service.oauth;

import com.spendingstracker.app.constants.ExternalUserType;
import com.spendingstracker.app.dto.oauth.OAuthPayload;
import com.spendingstracker.app.exception.NoOAuthServiceCanHandle;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class OAuthServiceImpl implements OAuthService {
    private final List<OAuthPayloadService> oAuthPayloadServices;

    public OAuthServiceImpl(List<OAuthPayloadService> oAuthPayloadServices) {
        this.oAuthPayloadServices = oAuthPayloadServices;
    }

    @Override
    public OAuthPayload extractPayload(String oAuthCredential, ExternalUserType externalUserType) {
        for (OAuthPayloadService oAuthPayloadService : oAuthPayloadServices) {
            if (oAuthPayloadService.handles(externalUserType)) {
                oAuthPayloadService.extractPayload(oAuthCredential);
            }
        }

        String errMsg =
                "No OAuthPayloadService found that can handle external user of type "
                        + externalUserType;
        log.error(errMsg);
        throw new NoOAuthServiceCanHandle(errMsg);
    }
}
