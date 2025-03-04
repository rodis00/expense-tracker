package com.github.rodis00.backend.exception;

public class ResetTokenExpiredException extends RuntimeException implements FieldName{
    public ResetTokenExpiredException(String message) {
        super(message);
    }

    @Override
    public String getFieldName() {
        return Fields.token.name();
    }
}
