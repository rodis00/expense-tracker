package com.github.rodis00.backend.exception;

public class UserAlreadyExistsException extends RuntimeException implements FieldName{
    public UserAlreadyExistsException(String message) {
        super(message);
    }

    @Override
    public String getFieldName() {
        return Fields.email.name();
    }
}
