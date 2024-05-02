package com.github.rodis00.backend.exception;

import com.github.rodis00.backend.api.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(EarningNotFoundException.class)
    public ApiResponse handleEarningNotFoundException(EarningNotFoundException e) {
        return new ApiResponse(
                HttpStatus.NOT_FOUND,
                HttpStatus.NOT_FOUND.value(),
                Collections.singletonMap(e.getFieldName(), e.getMessage())
        );
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ExpenseNotFoundException.class)
    public ApiResponse handleExpenseNotFoundException(ExpenseNotFoundException e) {
        return new ApiResponse(
                HttpStatus.NOT_FOUND,
                HttpStatus.NOT_FOUND.value(),
                Collections.singletonMap(e.getFieldName(), e.getMessage())
        );
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(UserNotFoundException.class)
    public ApiResponse handleUserNotFoundException(UserNotFoundException e) {
        return new ApiResponse(
                HttpStatus.NOT_FOUND,
                HttpStatus.NOT_FOUND.value(),
                Collections.singletonMap(e.getFieldName(), e.getMessage())
        );
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ApiResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        Map<String, String> errorMap = new HashMap<>();
        e.getBindingResult()
                .getFieldErrors()
                .forEach(error -> {
                    errorMap.put(error.getField(), error.getDefaultMessage());
                });
        return new ApiResponse(
                HttpStatus.BAD_REQUEST,
                HttpStatus.BAD_REQUEST.value(),
                errorMap
        );
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ApiResponse handleUserAlreadyExistsException(UserAlreadyExistsException e) {
        return new ApiResponse(
                HttpStatus.BAD_REQUEST,
                HttpStatus.BAD_REQUEST.value(),
                Collections.singletonMap(e.getFieldName(), e.getMessage())
        );
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UsernameIsTakenException.class)
    public ApiResponse handleUsernameIsTakenException(UsernameIsTakenException e) {
        return new ApiResponse(
                HttpStatus.BAD_REQUEST,
                HttpStatus.BAD_REQUEST.value(),
                Collections.singletonMap(e.getFieldName(), e.getMessage())
        );
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(InvalidPasswordException.class)
    public ApiResponse handleInvalidPasswordException(InvalidPasswordException e) {
        return new ApiResponse(
                HttpStatus.UNAUTHORIZED,
                HttpStatus.UNAUTHORIZED.value(),
                Collections.singletonMap(e.getFieldName(), e.getMessage())
        );
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(InvalidUsernameException.class)
    public ApiResponse handleInvalidUsernameException(InvalidUsernameException e) {
        return new ApiResponse(
                HttpStatus.UNAUTHORIZED,
                HttpStatus.UNAUTHORIZED.value(),
                Collections.singletonMap(e.getFieldName(), e.getMessage())
        );
    }
}
