package com.github.rodis00.backend.expense;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ExpenseDto {
    private Integer id;
    private String title;
    private Double price;
    private LocalDateTime date;

    public static ExpenseDto from(Expense expense) {
        return new ExpenseDto(
                expense.getId(),
                expense.getTitle(),
                expense.getPrice(),
                expense.getDate()
        );
    }
}
