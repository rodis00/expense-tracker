package com.github.rodis00.backend.user;

import com.github.rodis00.backend.utils.customValidator.Password;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRequest {

    @Size(min = 3, max = 20, message = "Username should be between 3 or 20 characters.")
    private String username;

    @Email(message = "Invalid email address.")
    private String email;

    @Password
    private String password;
}
