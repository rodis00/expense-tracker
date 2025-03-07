package com.github.rodis00.backend.passwordReset;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ForgotPasswordRequest(
        @NotBlank(message = "Email shouldn't be empty.")
        @Email(message = "Invalid email address.")
        String email
) {
}
