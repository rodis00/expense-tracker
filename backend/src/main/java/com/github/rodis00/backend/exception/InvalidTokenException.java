package com.github.rodis00.backend.exception;

public class InvalidTokenException extends RuntimeException implements FieldName{
    public InvalidTokenException(String message) {
        super(message);
    }

    @Override
    public String getFieldName() {
        return Fields.token.name();
    }
}
