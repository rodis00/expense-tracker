package com.github.rodis00.backend.api;

import lombok.*;
import org.springframework.http.HttpStatus;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiResponse {
    private HttpStatus status;
    private int code;
    private Map<String, String> message;
}
