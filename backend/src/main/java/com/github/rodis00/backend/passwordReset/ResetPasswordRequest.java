package com.github.rodis00.backend.passwordReset;

import com.github.rodis00.backend.utils.customValidator.Password;
import jakarta.validation.constraints.NotBlank;

public record ResetPasswordRequest(
        String resetToken,
        @NotBlank(message = "Password shouldn't be empty.")
        @Password
        String newPassword
) {
}
