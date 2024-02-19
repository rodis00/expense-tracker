package com.github.rodis00.backend.expense;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class ExpenseDto {
    private Integer id;
    private String title;
    private Double price;
    private Date date;

    public static ExpenseDto from(Expense expense) {
        return new ExpenseDto(
                expense.getId(),
                expense.getTitle(),
                expense.getPrice(),
                expense.getDate()
        );
    }
}
