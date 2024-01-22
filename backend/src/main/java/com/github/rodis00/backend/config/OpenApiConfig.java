package com.github.rodis00.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                title = "Expense Tracker API",
                version = "1.0"
        ),
        servers = {
                @Server(
                        description = "Local env",
                        url = "http://localhost:8080"
                )
        }
)
public class OpenApiConfig {
}
