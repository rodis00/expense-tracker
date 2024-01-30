package com.github.rodis00.backend.controller;

import com.github.rodis00.backend.dto.AuthDto;
import com.github.rodis00.backend.dto.RequestDto;
import com.github.rodis00.backend.dto.UserDto;
import com.github.rodis00.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("expense-tracker/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody @Valid RequestDto requestDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(authService.register(requestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody @Valid AuthDto authDto) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(authService.login(authDto));
    }
}
