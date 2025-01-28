package com.spendingstracker.app.service.mfa;

import static com.spendingstracker.app.constants.Constants.API_TOKEN_KEY;

import static dev.samstevens.totp.util.Utils.getDataUriForImage;

import com.spendingstracker.app.dto.requests.VerifyMfaRequest;
import com.spendingstracker.app.dto.response.RecoveryCodesResponse;
import com.spendingstracker.app.dto.response.SetupMfaResponse;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.entity.UserMfaString;
import com.spendingstracker.app.entity.UserRecoveryCode;
import com.spendingstracker.app.exception.MfaNotValidatedException;
import com.spendingstracker.app.service.auth.AuthService;
import com.spendingstracker.app.service.auth.CurrentUserService;
import com.spendingstracker.app.service.user.UserService;

import dev.samstevens.totp.code.CodeVerifier;
import dev.samstevens.totp.exceptions.QrGenerationException;
import dev.samstevens.totp.qr.QrData;
import dev.samstevens.totp.qr.QrDataFactory;
import dev.samstevens.totp.qr.QrGenerator;
import dev.samstevens.totp.recovery.RecoveryCodeGenerator;
import dev.samstevens.totp.secret.SecretGenerator;

import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthService authService;

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
    public void verifyMfa(HttpServletResponse response, VerifyMfaRequest verifyMfaRequest) {
        User user = currentUserService.getUserJpaEntity();
        if (verifyMfaRequest.totpCode() != null) {
            verifyTotpCode(user, verifyMfaRequest.totpCode());
        } else if (verifyMfaRequest.recoveryCode() != null) {
            verifyRecoveryCode(user, verifyMfaRequest.recoveryCode());
        } else {
            throw new MfaNotValidatedException("No recovery code or TOTP code provided");
        }

        userService.setHasMfa(user);
        authService.setAuthenticatedCookie(
                response, API_TOKEN_KEY, currentUserService.getCurrentUserDetails(), "/v1/", 3600L);
    }

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

    /** Verifies if <code>totpCode</code> is valid for the current user */
    private void verifyTotpCode(User user, String totpCode) {
        UserMfaString userMfaString = user.getActiveUserMfaString();
        if (!codeVerifier.isValidCode(userMfaString.getSecretString(), totpCode)) {
            throw new MfaNotValidatedException("Invalid TOTP code provided");
        }
    }

    /** Verifies if <code>recoveryCode</code> is valid for the current user */
    private void verifyRecoveryCode(User user, String recoveryCode) {
        List<UserRecoveryCode> userRecoveryCodes = user.getActiveRecoveryCodes();

        for (UserRecoveryCode userRecoveryCode : userRecoveryCodes) {
            // Found recovery code, can exit function
            if (bCryptPasswordEncoder.matches(recoveryCode, userRecoveryCode.getRecoveryCode())) {
                return;
            }
        }

        // Recovery code not found
        throw new MfaNotValidatedException("Invalid recovery code provided");
    }
}
