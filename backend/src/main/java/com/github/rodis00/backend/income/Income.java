package com.github.rodis00.backend.income;

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
public class Income {

    @NotBlank(message = "Title shouldn't be blank.")
    private String title;

    @NotNull(message = "Amount shouldn't be empty.")
    @MinValue
    private BigDecimal amount;

    @NotNull(message = "Invalid date.")
    private LocalDateTime date;

    private String description;
}
