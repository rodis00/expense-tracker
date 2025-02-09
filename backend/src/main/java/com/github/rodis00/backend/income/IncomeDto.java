package com.github.rodis00.backend.income;

import com.github.rodis00.backend.entity.IncomeEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class IncomeDto {
    private String slug;
    private String title;
    private BigDecimal amount;
    private LocalDateTime date;
    private IncomeCategory category;
    private String description;

    public static IncomeDto from(IncomeEntity income) {
        return new IncomeDto(
                income.getSlug(),
                income.getTitle(),
                income.getAmount(),
                income.getDate(),
                income.getCategory(),
                income.getDescription()
        );
    }
}
