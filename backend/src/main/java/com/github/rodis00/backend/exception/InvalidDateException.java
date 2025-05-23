package com.github.rodis00.backend.exception;

public class InvalidDateException extends RuntimeException implements FieldName{
    public InvalidDateException(String message) {
        super(message);
    }

    @Override
    public String getFieldName() {
        return Fields.error.name();
    }
}
