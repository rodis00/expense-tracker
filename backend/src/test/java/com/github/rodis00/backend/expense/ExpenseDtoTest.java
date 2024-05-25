package com.github.rodis00.backend.expense;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(SpringExtension.class)
class ExpenseDtoTest {

    private Expense expense;

    @BeforeEach
    void setUp() {
        expense = new Expense();
        expense.setId(1);
        expense.setTitle("expense");
        expense.setPrice(100.0);
        expense.setDate(LocalDateTime.of(2024, 5, 25, 20, 32));
        expense.setUser(null);
    }

    @Test
    void shouldReturnExpenseDto() {
        ExpenseDto expectedDto = new ExpenseDto(
                expense.getId(),
                expense.getTitle(),
                expense.getPrice(),
                expense.getDate()
        );

        ExpenseDto expenseDto = ExpenseDto.from(expense);

        assertNotNull(expenseDto);
        assertEquals(expectedDto.getId(), expenseDto.getId());
        assertEquals(expectedDto.getTitle(), expenseDto.getTitle());
        assertEquals(expectedDto.getPrice(), expenseDto.getPrice());
        assertEquals(expectedDto.getDate(), expenseDto.getDate());
    }
}