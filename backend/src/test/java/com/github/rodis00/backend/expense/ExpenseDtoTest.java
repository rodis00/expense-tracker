package com.github.rodis00.backend.expense;

import com.github.rodis00.backend.entity.ExpenseEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(SpringExtension.class)
class ExpenseDtoTest {

    private ExpenseEntity expense;

    @BeforeEach
    void setUp() {
        expense = new ExpenseEntity();
        expense.setId(1L);
        expense.setTitle("expense");
        expense.setPrice(new BigDecimal("100.00"));
        expense.setDate(LocalDateTime.of(2024, 5, 25, 20, 32));
        expense.setDescription("expense");
        expense.setUser(null);
    }

    @Test
    void shouldReturnExpenseDto() {
        ExpenseDto expectedDto = new ExpenseDto(
                expense.getId(),
                expense.getTitle(),
                expense.getPrice(),
                expense.getDate(),
                expense.getDescription()
        );

        ExpenseDto expenseDto = ExpenseDto.from(expense);

        assertNotNull(expenseDto);
        assertEquals(expectedDto.getId(), expenseDto.getId());
        assertEquals(expectedDto.getTitle(), expenseDto.getTitle());
        assertEquals(expectedDto.getPrice(), expenseDto.getPrice());
        assertEquals(expectedDto.getDate(), expenseDto.getDate());
    }
}