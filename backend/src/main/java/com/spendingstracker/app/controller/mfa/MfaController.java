package com.spendingstracker.app.controller.mfa;

import static com.spendingstracker.app.dto.response.ApiResponse.okResponse;

import com.spendingstracker.app.dto.requests.VerifyMfaRequest;
import com.spendingstracker.app.dto.response.ApiResponse;
import com.spendingstracker.app.dto.response.RecoveryCodesResponse;
import com.spendingstracker.app.dto.response.SetupMfaResponse;
import com.spendingstracker.app.service.mfa.MfaService;

import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/** Controller class that contains route related to MFA setup and verification */
@RestController
@RequestMapping("/v1/mfa")
@Slf4j
@RequiredArgsConstructor
public class MfaController {
    private final MfaService mfaService;

    /**
     * Endpoint to setup MFA
     *
     * @see SetupMfaResponse
     * @see ApiResponse
     */
    @GetMapping("/setup")
    public ResponseEntity<ApiResponse<SetupMfaResponse>> setupMfa() {
        log.info("GET /setup");
        SetupMfaResponse setupMfaResponse = mfaService.setupMfa();

        ApiResponse<SetupMfaResponse> apiResponse = okResponse(setupMfaResponse, null, null);

        return ResponseEntity.ok(apiResponse);
    }

    /**
     * Endpoint to retrieve a user's MFA recovery codes
     *
     * @see RecoveryCodesResponse
     * @see ApiResponse
     */
    @GetMapping("/recovery-codes")
    public ResponseEntity<ApiResponse<RecoveryCodesResponse>> getRecoveryCodes() {
        RecoveryCodesResponse recoveryCodesResponse = mfaService.getRecoveryCodes();
        ApiResponse<RecoveryCodesResponse> apiResponse =
                okResponse(recoveryCodesResponse, null, null);

        return ResponseEntity.ok(apiResponse);
    }

    /**
     * Endpoint for verifying MFA totp code or recovery code
     *
     * @see ApiResponse
     */
    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<Void>> verifyMfa(
            HttpServletResponse response, @RequestBody VerifyMfaRequest verifyMfaRequest) {
        log.info("POST /verify");

        mfaService.verifyMfa(response, verifyMfaRequest);
        ApiResponse<Void> apiResponse = okResponse(null, null, "Validated MFA");

        return ResponseEntity.ok(apiResponse);
    }
}
