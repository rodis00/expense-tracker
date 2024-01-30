package com.github.rodis00.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthDto {
    @NotBlank(message = "Email shouldn't be empty.")
    private String email;

    @NotBlank(message = "Password shouldn't be empty.")
    private String password;
}
