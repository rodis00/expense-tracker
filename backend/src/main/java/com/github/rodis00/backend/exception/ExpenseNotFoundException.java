package com.github.rodis00.backend.exception;

public class ExpenseNotFoundException extends RuntimeException implements FieldName{
    public ExpenseNotFoundException(String message) {
        super(message);
    }

    @Override
    public String getFieldName() {
        return Fields.error.name();
    }
}
