package com.github.rodis00.backend.dto;

import com.github.rodis00.backend.utils.customValidator.Password;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RequestDto {
    @Email(message = "Invalid email address.")
    @NotBlank(message = "Email shouldn't be null.")
    private String email;

    @NotBlank(message = "Password shouldn't be empty.")
    @Password
    private String password;

    @Size(min = 3, max = 20, message = "Username should be between 3 or 20 characters.")
    private String username;
}
