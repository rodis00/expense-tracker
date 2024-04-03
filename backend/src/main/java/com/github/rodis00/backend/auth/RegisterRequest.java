package com.github.rodis00.backend.auth;

import com.github.rodis00.backend.utils.customValidator.Password;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "Email shouldn't be empty.")
    @Email(message = "Invalid email address.")
    private String email;

    @NotBlank(message = "Username shouldn't be empty.")
    @Size(min = 3, max = 20, message = "Username should be between 3 or 20 characters.")
    private String username;

    @NotBlank(message = "Password shouldn't be empty.")
    @Password
    private String password;
}
