package com.github.rodis00.backend.exception;

public class InvalidEmailException extends RuntimeException implements FieldName {
    public InvalidEmailException(String message) {
        super(message);
    }

    @Override
    public String getFieldName() {
        return Fields.email.name();
    }
}
