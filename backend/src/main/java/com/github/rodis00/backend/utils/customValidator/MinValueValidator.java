package com.github.rodis00.backend.utils.customValidator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.math.BigDecimal;

public class MinValueValidator implements ConstraintValidator<MinValue, BigDecimal> {

    private BigDecimal minValue;

    @Override
    public void initialize(MinValue constraintAnnotation) {
        this.minValue = new BigDecimal(constraintAnnotation.minValue());
    }

    @Override
    public boolean isValid(BigDecimal value, ConstraintValidatorContext context) {
        if (value == null)
            return false;

        return value.compareTo(minValue) >= 0;
    }
}
