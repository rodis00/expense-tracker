package com.github.rodis00.backend.exception;

public class ResetTokenNotFoundException extends RuntimeException implements FieldName{
    public ResetTokenNotFoundException(String message) {
        super(message);
    }

    @Override
    public String getFieldName() {
        return Fields.token.name();
    }
}
