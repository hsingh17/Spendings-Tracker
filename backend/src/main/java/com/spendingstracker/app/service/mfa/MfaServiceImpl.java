package com.spendingstracker.app.service.mfa;

import static dev.samstevens.totp.util.Utils.getDataUriForImage;

import com.spendingstracker.app.dto.response.RecoveryCodesResponse;
import com.spendingstracker.app.dto.response.SetupMfaResponse;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.entity.UserRecoveryCode;
import com.spendingstracker.app.service.auth.CurrentUserService;
import com.spendingstracker.app.service.user.UserService;

import dev.samstevens.totp.code.CodeVerifier;
import dev.samstevens.totp.exceptions.QrGenerationException;
import dev.samstevens.totp.qr.QrData;
import dev.samstevens.totp.qr.QrDataFactory;
import dev.samstevens.totp.qr.QrGenerator;
import dev.samstevens.totp.recovery.RecoveryCodeGenerator;
import dev.samstevens.totp.secret.SecretGenerator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class MfaServiceImpl implements MfaService {
    private final SecretGenerator secretGenerator;
    private final QrDataFactory qrDataFactory;
    private final QrGenerator qrGenerator;
    private final CodeVerifier codeVerifier;
    private final RecoveryCodeGenerator recoveryCodeGenerator;
    private final CurrentUserService currentUserService;
    private final UserService userService;

    @Override
    public SetupMfaResponse setupMfa() {
        User user = currentUserService.getUserJpaEntity();
        String username = user.getUsername();
        String secret = secretGenerator.generate();
        List<String> recoveryCodes = generateRecoveryCodes();

        userService.addMfa(user, secret, recoveryCodes); // Store secret associated with user

        return new SetupMfaResponse(generateQrCodeImg(username, secret), secret);
    }

    @Override
    public RecoveryCodesResponse getRecoveryCodes() {
        User user = currentUserService.getUserJpaEntity();
        List<String> userRecoveryCodes =
                user.getActiveRecoveryCodes().stream()
                        .map(UserRecoveryCode::getRecoveryCode)
                        .toList();

        return new RecoveryCodesResponse(userRecoveryCodes);
    }

    @Override
    public void verifyMfa() {}

    /**
     * @return QR code as a data image URI. If unable to generate one, just return null
     */
    private String generateQrCodeImg(String username, String secret) {
        QrData data =
                qrDataFactory
                        .newBuilder()
                        .label(username)
                        .secret(secret)
                        .issuer("SpendingsTracker")
                        .build();

        try {
            return getDataUriForImage(qrGenerator.generate(data), qrGenerator.getImageMimeType());
        } catch (QrGenerationException e) {
            log.error("Could not generate MFA QR code for {}", username);
            return null;
        }
    }

    private List<String> generateRecoveryCodes() {
        return Arrays.stream(recoveryCodeGenerator.generateCodes(8)).toList();
    }
}
;
