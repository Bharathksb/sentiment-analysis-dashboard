package com.sentiment.dashboard.controller;

import com.sentiment.dashboard.dto.AuthResponse;
import com.sentiment.dashboard.dto.LoginRequest;
import com.sentiment.dashboard.dto.RegisterRequest;
import com.sentiment.dashboard.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins="*")
public class AuthController {
    @Autowired
    private AuthService authService;
    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest request)
    {
        String result = authService.register(request);
        return ResponseEntity.ok(result);
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody LoginRequest request)
    {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
