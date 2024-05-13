package com.github.rodis00.backend.exception;

public class UserNotFoundException extends RuntimeException implements FieldName{
    public UserNotFoundException(String message) {
        super(message);
    }

    @Override
    public String getFieldName() {
        return Fields.error.name();
    }
}
