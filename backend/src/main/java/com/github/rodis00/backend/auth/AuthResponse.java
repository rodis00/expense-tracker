package com.github.rodis00.backend.auth;

import jakarta.servlet.http.Cookie;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponse {

    private String token;

    private Cookie cookie;
}
