package com.github.rodis00.backend.incomes;

import com.github.rodis00.backend.entity.IncomeEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class IncomeDto {
    private Long id;
    private String title;
    private BigDecimal amount;
    private LocalDateTime date;

    public static IncomeDto from(IncomeEntity income) {
        return new IncomeDto(
                income.getId(),
                income.getTitle(),
                income.getAmount(),
                income.getDate()
        );
    }
}
