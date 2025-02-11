package com.github.rodis00.backend.expense;

import com.github.rodis00.backend.entity.ExpenseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ExpenseDto {
    private String slug;
    private String title;
    private BigDecimal price;
    private LocalDateTime date;
    private ExpenseCategory category;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String description;

    public static ExpenseDto from(ExpenseEntity expense) {
        return new ExpenseDto(
                expense.getSlug(),
                expense.getTitle(),
                expense.getPrice(),
                expense.getDate(),
                expense.getCategory(),
                expense.getCreatedAt(),
                expense.getUpdatedAt(),
                expense.getDescription()
        );
    }
}
