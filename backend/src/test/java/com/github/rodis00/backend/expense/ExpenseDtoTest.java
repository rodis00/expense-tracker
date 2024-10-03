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
        expense = new ExpenseEntity();
        expense.setSlug(slug);
        expense.setTitle("expense");
        expense.setPrice(new BigDecimal("100.00"));
        expense.setDate(LocalDateTime.of(2024, 5, 25, 20, 32));
        expense.setDescription("expense");
    }

    @Test
    void shouldReturnExpenseDto() {
        ExpenseDto expectedDto = new ExpenseDto(
                expense.getSlug(),
                expense.getTitle(),
                expense.getPrice(),
                expense.getDate(),
                expense.getDescription()
        );

        ExpenseDto expenseDto = ExpenseDto.from(expense);

        assertNotNull(expenseDto);
        assertEquals(expectedDto.getSlug(), expenseDto.getSlug());
        assertEquals(expectedDto.getTitle(), expenseDto.getTitle());
        assertEquals(expectedDto.getPrice(), expenseDto.getPrice());
        assertEquals(expectedDto.getDate(), expenseDto.getDate());
    }
}