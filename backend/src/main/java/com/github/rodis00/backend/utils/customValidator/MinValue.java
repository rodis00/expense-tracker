package com.github.rodis00.backend.utils.customValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;
import java.math.BigDecimal;

@Documented
@Constraint(validatedBy = MinValueValidator.class)
@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface MinValue {

    String message() default "Minimal value is (0.01).";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    String minValue() default "0.01";
}
