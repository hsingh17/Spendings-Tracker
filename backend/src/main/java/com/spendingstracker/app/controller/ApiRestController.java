package com.spendingstracker.app.controller;

import com.spendingstracker.app.model.Spending;
import com.spendingstracker.app.model.SpendingsRequestWrapper;
import com.spendingstracker.app.model.SpendingsResponseWrapper;
import com.spendingstracker.app.service.SpendingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ApiRestController {
    @Autowired
    private SpendingService spendingService;
    private final String datePattern = "yyyy-MM-dd";

    @GetMapping("/spending/get-spending/{user-id}")
    public SpendingsResponseWrapper getSpendings(@PathVariable("user-id") Integer userId,
                                                 @RequestParam(name = "start-date", required = false) @DateTimeFormat(pattern = datePattern) Date startDate,
                                                 @RequestParam(name = "end-date", required = false) @DateTimeFormat(pattern = datePattern) Date endDate) {
        return spendingService.getSpendings(userId, startDate, endDate);
    }
    @PostMapping("/spending/create-spending/{user-id}")
    public String createSpending(@PathVariable("user-id") Integer userId,
                                 @RequestBody SpendingsRequestWrapper spendingsRequestWrapper) {
        spendingService.createSpending(userId, spendingsRequestWrapper);
        return "SPENDING(S) CREATED"; // TODO: Figure out what to return
    }

}
