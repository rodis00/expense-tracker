package com.github.rodis00.backend.exception;

public class ExpenseNotFoundException extends RuntimeException {
    public ExpenseNotFoundException(String message) {
        super(message);
    }
}
