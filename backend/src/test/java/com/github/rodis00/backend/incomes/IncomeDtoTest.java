package com.github.rodis00.backend.incomes;

import com.github.rodis00.backend.entity.IncomeEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class IncomeDtoTest {

    private IncomeEntity income;

    @BeforeEach
    void setUp() {
        income = new IncomeEntity();
        income.setId(1L);
        income.setTitle("income");
        income.setAmount(new BigDecimal("100.00"));
        income.setDate(LocalDateTime.of(2024, 5, 24, 18, 4));
        income.setUser(null);
        income.setDescription("income");
    }

    @Test
    void shouldReturnEarningDto() {
        IncomeDto expectedDto = new IncomeDto(
                income.getId(),
                income.getTitle(),
                income.getAmount(),
                income.getDate(),
                income.getDescription()
        );

        IncomeDto incomeDto = IncomeDto.from(income);

        assertNotNull(incomeDto);
        assertEquals(expectedDto.getId(), incomeDto.getId());
        assertEquals(expectedDto.getTitle(), incomeDto.getTitle());
        assertEquals(expectedDto.getAmount(), incomeDto.getAmount());
        assertEquals(expectedDto.getDate(), incomeDto.getDate());
    }
}