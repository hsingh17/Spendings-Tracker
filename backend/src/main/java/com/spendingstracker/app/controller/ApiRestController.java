package com.spendingstracker.app.controller;

import com.spendingstracker.app.service.SpendingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiRestController {
    @Autowired
    SpendingService spendingService;

    @GetMapping("/hello-world")
    public String test() {
        return "Hello World!";
    }
}
