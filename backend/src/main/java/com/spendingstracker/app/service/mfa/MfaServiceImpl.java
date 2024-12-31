package com.spendingstracker.app.service.mfa;

import static dev.samstevens.totp.util.Utils.getDataUriForImage;

import com.spendingstracker.app.dto.response.SetupMfaResponse;
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
    private final UserService userService;

    @Override
    public SetupMfaResponse setupMfa(String username) {
        String secret = secretGenerator.generate();
        List<String> recoveryCodes = generateRecoveryCodes();

        userService.addMfa(username, secret, recoveryCodes); // Store secret associated with user

        return new SetupMfaResponse(generateQrCodeImg(username, secret), secret);
    }

    @Override
    public void getRecoveryCodes() {
        userService.findUserByUsername("");
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
