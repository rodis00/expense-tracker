package com.github.rodis00.backend.exception;

public class EntityNotFoundException extends RuntimeException implements FieldName{
    public EntityNotFoundException(String message) {
        super(message);
    }

    @Override
    public String getFieldName() {
        return Fields.error.name();
    }
}
