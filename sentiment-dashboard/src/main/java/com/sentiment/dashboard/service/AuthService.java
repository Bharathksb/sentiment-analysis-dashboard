package com.sentiment.dashboard.service;

import com.sentiment.dashboard.dto.AuthResponse;
import com.sentiment.dashboard.dto.LoginRequest;
import com.sentiment.dashboard.dto.RegisterRequest;
import com.sentiment.dashboard.model.User;
import com.sentiment.dashboard.repository.UserRepository;
import com.sentiment.dashboard.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    public String register(RegisterRequest request) {
        if (userRepository.existsByUsername(
                request.getUsername())) {
            return "Username already taken!";
        }
        if (userRepository.existsByEmail(
                request.getEmail())) {
            return "Email already registered!";
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(
                request.getPassword()));
        userRepository.save(user);
        return "User registered successfully!";
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()));
        String token = jwtUtils.generateToken(
                request.getUsername());
        User user = userRepository
                .findByUsername(request.getUsername())
                .orElseThrow();
        return new AuthResponse(
                token,
                user.getUsername(),
                user.getEmail());
    }
}
