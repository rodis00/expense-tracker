package com.github.rodis00.backend.exception;

public class UsernameIsTakenException extends RuntimeException {
    public UsernameIsTakenException(String message) {
        super(message);
    }

    public String getFieldName() {
        return Fields.username.name();
    }
}
