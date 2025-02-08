package com.github.rodis00.backend.expense;

import com.github.rodis00.backend.utils.customValidator.MinValue;
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
    @MinValue
    private BigDecimal price;

    @NotNull(message = "Invalid date.")
    private LocalDateTime date;

    private String description;
}
