package com.github.rodis00.backend.auth;

import com.github.rodis00.backend.config.jwt.TokenResponse;
import com.github.rodis00.backend.passwordReset.ForgotPasswordRequest;
import com.github.rodis00.backend.passwordReset.PasswordResetResponse;
import com.github.rodis00.backend.passwordReset.PasswordResetService;
import com.github.rodis00.backend.passwordReset.ResetPasswordRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("expense-tracker/api/v1/auth")
@Tag(name = "Auth")
public class AuthController {

    private final AuthService authService;
    private final PasswordResetService passwordResetService;

    public AuthController(
            AuthService authService,
            PasswordResetService passwordResetService
    ) {
        this.authService = authService;
        this.passwordResetService = passwordResetService;
    }

    @Operation(
            summary = "Create a new user and retrieve JWT Token"
    )
    @PostMapping("/register")
    public ResponseEntity<TokenResponse> register(
            @RequestBody @Valid RegisterRequest request,
            HttpServletResponse response
    ) {
        AuthResponse authResponse = authService.register(request);
        response.addCookie(authResponse.getCookie());

        return ResponseEntity.ok(new TokenResponse(authResponse.getToken()));
    }

    @Operation(
            summary = "Authenticate existing user and retrieve JWT Token"
    )
    @PostMapping("/authenticate")
    public ResponseEntity<TokenResponse> authenticate(
            @RequestBody @Valid AuthRequest request,
            HttpServletResponse response
    ) {
        AuthResponse authResponse = authService.authenticate(request);
        response.addCookie(authResponse.getCookie());

        return ResponseEntity.ok(new TokenResponse(authResponse.getToken()));
    }

    @Operation(
            summary = "Retrieve a new JWT Token"
    )
    @PostMapping("/refresh-token")
    public ResponseEntity<TokenResponse> refreshToken(
            HttpServletRequest request
    ) {
        return ResponseEntity.ok(authService.refreshToken(request));
    }

    @Operation(
            summary = "Retrieve an email with link to reset password"
    )
    @PostMapping("/forgot-password")
    public ResponseEntity<PasswordResetResponse> forgotPassword(
            @RequestBody @Valid ForgotPasswordRequest request
    ) {
        passwordResetService.sendEmailToResetPassword(request.email());
        return ResponseEntity.ok(new PasswordResetResponse("Password reset link sent to email"));
    }

    @Operation(
            summary = "Reset a user password"
    )
    @PostMapping("/reset-password")
    public ResponseEntity<PasswordResetResponse> resetPassword(
            @RequestBody @Valid ResetPasswordRequest request
    ) {
        passwordResetService.resetPassword(request.resetToken(), request.newPassword());
        return ResponseEntity.ok(new PasswordResetResponse("Password has been reset successfully"));
    }
}
