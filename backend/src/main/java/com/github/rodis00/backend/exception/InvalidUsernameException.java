package com.github.rodis00.backend.exception;

public class InvalidUsernameException extends RuntimeException implements FieldName{
    public InvalidUsernameException(String message) {
        super(message);
    }

    @Override
    public String getFieldName() {
        return Fields.username.name();
    }
}
