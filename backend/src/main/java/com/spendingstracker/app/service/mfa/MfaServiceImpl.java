package com.spendingstracker.app.service.mfa;

import com.spendingstracker.app.dto.response.SetupMfaResponse;
import com.spendingstracker.app.service.user.UserService;

import dev.samstevens.totp.code.CodeVerifier;
import dev.samstevens.totp.qr.QrDataFactory;
import dev.samstevens.totp.qr.QrGenerator;
import dev.samstevens.totp.recovery.RecoveryCodeGenerator;
import dev.samstevens.totp.secret.SecretGenerator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class MfaServiceImpl implements MfaService {
    private final SecretGenerator secretGenerator;
    private final QrDataFactory qrDataFactory;
    private final QrGenerator qrGenerator;
    private final CodeVerifier codeVerifier;
    private final RecoveryCodeGenerator recoveryCodeGenerator;
    private final UserService userService;

    @Override
    public SetupMfaResponse setupMfa(String username) {
        return null;
    }

    @Override
    public void getRecoveryCodes() {}

    @Override
    public void verifyMfa() {}
}
