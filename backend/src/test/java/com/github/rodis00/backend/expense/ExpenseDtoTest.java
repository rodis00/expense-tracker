package com.github.rodis00.backend.expense;

import com.github.rodis00.backend.entity.ExpenseEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class ExpenseDtoTest {

    private ExpenseEntity expense;

    private final String slug = UUID.randomUUID().toString();

    @BeforeEach
    void setUp() {
        LocalDateTime now = LocalDateTime
                .of(2025, 3, 13,14,9,12);
        expense = new ExpenseEntity();
        expense.setSlug(slug);
        expense.setTitle("expense");
        expense.setPrice(new BigDecimal("100.00"));
        expense.setDate(now);
        expense.setCategory(ExpenseCategory.OTHER);
        expense.setCreatedAt(now);
        expense.setUpdatedAt(now);
        expense.setDescription("expense");
    }

    @Test
    void shouldReturnExpenseDto() {
        ExpenseDto expectedDto = new ExpenseDto(
                expense.getSlug(),
                expense.getTitle(),
                expense.getPrice(),
                expense.getDate(),
                expense.getCategory(),
                expense.getCreatedAt(),
                expense.getUpdatedAt(),
                expense.getDescription()
        );

        ExpenseDto expenseDto = ExpenseDto.from(expense);

        assertNotNull(expenseDto);
        assertEquals(expectedDto.getSlug(), expenseDto.getSlug());
        assertEquals(expectedDto.getTitle(), expenseDto.getTitle());
        assertEquals(expectedDto.getPrice(), expenseDto.getPrice());
        assertEquals(expectedDto.getDate(), expenseDto.getDate());
        assertEquals(expectedDto.getCategory(), expenseDto.getCategory());
        assertEquals(expectedDto.getCreatedAt(), expenseDto.getCreatedAt());
        assertEquals(expectedDto.getUpdatedAt(), expenseDto.getUpdatedAt());
        assertEquals(expectedDto.getDescription(), expenseDto.getDescription());
    }
}