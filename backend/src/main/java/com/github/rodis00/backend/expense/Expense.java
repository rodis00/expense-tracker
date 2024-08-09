package com.github.rodis00.backend.expense;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Expense {

    @NotBlank(message = "Title shouldn't be blank.")
    private String title;

    @NotNull(message = "Price shouldn't be empty.")
    @Min(value = 1, message = "Price can't be lower than 1.")
    private BigDecimal price;

    @NotNull(message = "Invalid date.")
    private LocalDateTime date;

    private String description;
}
