package com.spendingstracker.app.controller;

import com.spendingstracker.app.model.SpendingsRequestWrapper;
import com.spendingstracker.app.model.SpendingsResponseWrapper;
import com.spendingstracker.app.service.SpendingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api")
public class ApiRestController {
    @Autowired
    private SpendingService spendingService;
    private final String datePattern = "yyyy-MM-dd";

    @GetMapping("/spending/get-spending/{user-id}")
    public ResponseEntity<SpendingsResponseWrapper> getSpendings(@PathVariable("user-id") Integer userId,
                                                 @RequestParam(name = "start-date", required = false) @DateTimeFormat(pattern = datePattern) Date startDate,
                                                 @RequestParam(name = "end-date", required = false) @DateTimeFormat(pattern = datePattern) Date endDate)
    throws Exception {
        return new ResponseEntity<>(spendingService.getSpendings(userId, startDate, endDate), HttpStatus.OK);
    }

    @PostMapping("/spending/create-spending/{user-id}")
    public ResponseEntity<String> createSpending(@PathVariable("user-id") Integer userId,
                                                 @RequestBody SpendingsRequestWrapper spendingsRequestWrapper) throws Exception {
        spendingService.createSpending(userId, spendingsRequestWrapper);
        return new ResponseEntity<>("Spending Created", HttpStatus.CREATED);
    }

    @PostMapping("/spending/update-spending/{user-id}/{date}")
    public ResponseEntity<String> updateSpending(@PathVariable("user-id") Integer userId,
                                                 @PathVariable("date") @DateTimeFormat(pattern = datePattern) Date date,
                                                 @RequestBody SpendingsRequestWrapper spendingsRequestWrapper) throws Exception {
        spendingService.updateSpending(userId, date, spendingsRequestWrapper);
        return new ResponseEntity<>("Spending updated", HttpStatus.OK);
    }

}
