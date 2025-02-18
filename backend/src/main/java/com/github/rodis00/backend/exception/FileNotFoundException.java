package com.github.rodis00.backend.exception;

public class FileNotFoundException extends RuntimeException implements FieldName{
    public FileNotFoundException(String message) {
        super(message);
    }

    @Override
    public String getFieldName() {
        return Fields.error.name();
    }
}
