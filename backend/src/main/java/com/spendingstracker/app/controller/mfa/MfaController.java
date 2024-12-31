package com.spendingstracker.app.controller.mfa;

import static com.spendingstracker.app.dto.response.ApiResponse.okResponse;

import com.spendingstracker.app.dto.response.ApiResponse;
import com.spendingstracker.app.dto.response.SetupMfaResponse;
import com.spendingstracker.app.service.mfa.MfaService;

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
    public ResponseEntity<ApiResponse<SetupMfaResponse>> setupMfa(
            @RequestParam("username") String username) {
        log.info("GET /setup?username={}", username);
        SetupMfaResponse setupMfaResponse = mfaService.setupMfa(username);

        ApiResponse<SetupMfaResponse> apiResponse =
                okResponse(setupMfaResponse, null, "Initiated MFA setup for " + username);

        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/recovery-codes")
    public ResponseEntity<Void> getRecoveryCodes(@RequestParam("username") String username) {
        log.info("GET /recovery-codes?username={}", username);

        return null;
    }

    @PostMapping("/verify")
    public ResponseEntity<Void> verifyMfa() {
        // Must consider both recovery code and totp code
        return null;
    }
}
