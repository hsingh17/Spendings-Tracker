package com.spendingstracker.app.controller;

import com.spendingstracker.app.model.CustomUserDetails;
import com.spendingstracker.app.model.Spending;
import com.spendingstracker.app.model.SpendingsResponse;
import com.spendingstracker.app.service.SpendingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ApiRestController {
    @Autowired
    private SpendingService spendingService;
    private final String datePattern = "MM-dd-yyyy";

    @GetMapping("/me")
    public ResponseEntity<UserDetails> getMe() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        return ResponseEntity.ok(userDetails);
    }

    @GetMapping("/spending/get-spending")
    public ResponseEntity<SpendingsResponse> getSpendings(
            @RequestParam(name = "start-date", required = false) @DateTimeFormat(pattern = datePattern) Optional<Date> startDate,
            @RequestParam(name = "end-date", required = false) @DateTimeFormat(pattern = datePattern) Optional<Date> endDate,
            @RequestParam(name = "page") Optional<Integer> page,
            @RequestParam(name = "limit") Optional<Integer> limit,
            HttpServletRequest request)
    throws Exception {
        return new ResponseEntity<>(spendingService.getSpendings(getUserId(), request.getRequestURL() + "?" + request.getQueryString(), startDate, endDate, page, limit), HttpStatus.OK);
    }

    @PostMapping("/spending/create-spending")
    public ResponseEntity<String> createSpending(@RequestBody List<Spending> spendings) throws Exception {
        spendingService.createSpending(spendings);
        return new ResponseEntity<>("Spendings Created", HttpStatus.CREATED);
    }

    @PostMapping("/spending/update-spending")
    public ResponseEntity<String> updateSpending(@RequestBody List<Spending> spendings) throws Exception {
        spendingService.updateSpending(spendings);
        return new ResponseEntity<>("Spendings updated", HttpStatus.OK);
    }

    private Integer getUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        return userDetails.getUserId();
    }
}
