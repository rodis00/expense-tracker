package com.github.rodis00.backend.validators;

import com.github.rodis00.backend.exception.InvalidDateException;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class DateValidator {
    public void validate(LocalDateTime datetime) {
        int limit = 5;
        LocalDate date = datetime.toLocalDate();
        LocalDate minDate = LocalDate.now().minusYears(limit);
        LocalDate maxDate = LocalDate.now().plusYears(limit);
        if (date.isBefore(minDate) || date.isAfter(maxDate)) {
            throw new InvalidDateException("Invalid date. Date must be between " + minDate + " and " + maxDate);
        }
    }
}
