package com.github.rodis00.backend.exception;

public class InvalidPasswordException extends RuntimeException implements FieldName{
    public InvalidPasswordException(String message) {
        super(message);
    }

    @Override
    public String getFieldName() {
        return Fields.password.name();
    }
}
