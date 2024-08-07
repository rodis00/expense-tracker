package com.github.rodis00.backend.auth;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("expense-tracker/api/v1/auth")
@Tag(name = "Auth")
public class AuthenticateController {

    private final AuthenticateService authService;

    public AuthenticateController(AuthenticateService authService) {
        this.authService = authService;
    }

    @Operation(
            summary = "Register user and get jwt token"
    )
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid RegisterRequest request) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(authService.register(request));
    }

    @Operation(
            summary = "Authenticate user and get jwt token"
    )
    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody @Valid AuthRequest request) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(authService.authenticate(request));
    }
}
