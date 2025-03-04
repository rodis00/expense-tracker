package com.github.rodis00.backend.passwordReset;

public record ResetPasswordRequest(
        String resetToken,
        String newPassword
) {
}
