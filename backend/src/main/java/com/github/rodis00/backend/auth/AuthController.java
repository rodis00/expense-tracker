package com.github.rodis00.backend.auth;

import com.github.rodis00.backend.config.jwt.RefreshTokenRequest;
import com.github.rodis00.backend.config.jwt.RefreshTokenResponse;
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
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Operation(
            summary = "Create a new user and retrieve JWT Token"
    )
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @RequestBody @Valid RegisterRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(authService.register(request));
    }

    @Operation(
            summary = "Authenticate existing user and retrieve JWT Token"
    )
    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticate(
            @RequestBody @Valid AuthRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(authService.authenticate(request));
    }

    @Operation(
            summary = "Retrieve a new JWT Token"
    )
    @PostMapping("/refresh-token")
    public ResponseEntity<RefreshTokenResponse> refreshToken(
            @RequestBody RefreshTokenRequest refreshTokenRequest
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(authService.refreshToken(refreshTokenRequest));
    }
}
