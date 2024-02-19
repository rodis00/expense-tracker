package com.github.rodis00.backend.utils.customValidator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.function.IntPredicate;

public class PasswordValidator implements ConstraintValidator<Password, String> {
    private int minLength;
    private int minUpperCase;
    private int minLowerCase;
    private int minDigit;
    private int minSpecialChar;

    @Override
    public void initialize(Password constraintAnnotation) {
        this.minLength = constraintAnnotation.minLength();
        this.minUpperCase = constraintAnnotation.minUpperCase();
        this.minLowerCase = constraintAnnotation.minLowerCase();
        this.minDigit = constraintAnnotation.minDigit();
        this.minSpecialChar = constraintAnnotation.minSpecialChar();
    }

    @Override
    public boolean isValid(
            String value,
            ConstraintValidatorContext context
    ) {
        if (value == null) {
            return false;
        }

        boolean isValid = true;

        if (value.length() < minLength) {
            isValid = false;
            context.disableDefaultConstraintViolation();
            context
                    .buildConstraintViolationWithTemplate(
                            "Password is too short. Minimum length is " + minLength + " characters.")
                    .addConstraintViolation();
        }

        if (countOccurrences(value, Character::isUpperCase) < minUpperCase) {
            isValid = false;
            context.disableDefaultConstraintViolation();
            context
                    .buildConstraintViolationWithTemplate(
                            "Password must contain at least " + minUpperCase + " uppercase letter(s).")
                    .addConstraintViolation();
        }

        if (countOccurrences(value, Character::isLowerCase) < minLowerCase) {
            isValid = false;
            context.disableDefaultConstraintViolation();
            context
                    .buildConstraintViolationWithTemplate(
                            "Password must contain at least " + minLowerCase + " lowercase letter(s).")
                    .addConstraintViolation();
        }

        if (countOccurrences(value, Character::isDigit) < minDigit) {
            isValid = false;
            context.disableDefaultConstraintViolation();
            context
                    .buildConstraintViolationWithTemplate(
                            "Password must contain at least " + minDigit + " digit(s).")
                    .addConstraintViolation();
        }

        if (countOccurrences(value, ch -> !Character.isLetterOrDigit(ch)) < minSpecialChar) {
            isValid = false;
            context.disableDefaultConstraintViolation();
            context
                    .buildConstraintViolationWithTemplate(
                            "Password must contain at least " + minSpecialChar + " special character(s).")
                    .addConstraintViolation();
        }

        return isValid;
    }

    private long countOccurrences(
            String value,
            IntPredicate predicate
    ) {
        return value
                .chars()
                .filter(predicate)
                .count();
    }
}
