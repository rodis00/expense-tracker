package com.github.rodis00.backend.exception;

public class IncomeNotFoundException extends RuntimeException implements FieldName{
    public IncomeNotFoundException(String message) {
        super(message);
    }

    @Override
    public String getFieldName() {
        return Fields.error.name();
    }
}
