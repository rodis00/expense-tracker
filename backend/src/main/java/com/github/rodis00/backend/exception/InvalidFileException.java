package com.github.rodis00.backend.exception;

public class InvalidFileException extends RuntimeException implements FieldName {
    public InvalidFileException(String message) {
        super(message);
    }

    @Override
    public String getFieldName() {
        return Fields.error.name();
    }
}
