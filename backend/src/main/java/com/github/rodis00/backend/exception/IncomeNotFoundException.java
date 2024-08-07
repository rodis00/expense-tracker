package com.github.rodis00.backend.exception;

public class EarningNotFoundException extends RuntimeException implements FieldName{
    public EarningNotFoundException(String message) {
        super(message);
    }

    @Override
    public String getFieldName() {
        return Fields.error.name();
    }
}
