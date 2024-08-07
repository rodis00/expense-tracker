package com.github.rodis00.backend.expense;

import com.github.rodis00.backend.entity.ExpenseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ExpenseDto {
    private Long id;
    private String title;
    private BigDecimal price;
    private LocalDateTime date;

    public static ExpenseDto from(ExpenseEntity expense) {
        return new ExpenseDto(
                expense.getId(),
                expense.getTitle(),
                expense.getPrice(),
                expense.getDate()
        );
    }
}
