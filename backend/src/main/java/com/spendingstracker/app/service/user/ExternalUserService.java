package com.spendingstracker.app.service.user;

import com.spendingstracker.app.constants.ExternalUserType;
import com.spendingstracker.app.dto.oauth.OAuthPayload;

import org.springframework.transaction.annotation.Transactional;

/**
 * Interface to define a service that performs operations on the <code>USER</code> table
 *
 * @see UserServiceImpl
 */
@Transactional
public interface ExternalUserService {
    /**
     * @param oAuthPayload object containing data after extracting fields from the OAuth JWT
     * @param externalUserType the type of external user
     * @return if an external user already exists or not
     * @see ExternalUserType
     * @see OAuthPayload
     */
    @Transactional(readOnly = true)
    boolean exists(OAuthPayload oAuthPayload, ExternalUserType externalUserType);

    /**
     * @param oAuthPayload object containing data after extracting fields from the OAuth JWT
     * @param externalUserType the type of external user
     * @see ExternalUserType
     * @see OAuthPayload
     */
    void createUser(OAuthPayload oAuthPayload, ExternalUserType externalUserType);
}
