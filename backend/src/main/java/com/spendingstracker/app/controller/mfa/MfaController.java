package com.spendingstracker.app.controller.mfa;

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

    @GetMapping("/mfa/setup")
    public ResponseEntity<SetupMfaResponse> setupMfa(@RequestParam("username") String username) {
        return null;
    }

    @GetMapping("/mfa/recovery-codes")
    public ResponseEntity<Void> getRecoveryCodes() {
        return null;
    }

    @PostMapping("/mfa/verify")
    public ResponseEntity<Void> verifyMfa() {
        return null;
    }
}
