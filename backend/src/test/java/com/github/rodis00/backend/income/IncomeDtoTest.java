package com.github.rodis00.backend.income;

import com.github.rodis00.backend.entity.IncomeEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class IncomeDtoTest {

    private IncomeEntity income;

    private final String slug = UUID.randomUUID().toString();

    @BeforeEach
    void setUp() {
        LocalDateTime now = LocalDateTime
                .of(2025, 3, 13,14,9,12);
        income = new IncomeEntity();
        income.setSlug(slug);
        income.setTitle("income");
        income.setAmount(new BigDecimal("100.00"));
        income.setDate(now);
        income.setCategory(IncomeCategory.OTHER);
        income.setCreatedAt(now);
        income.setUpdatedAt(now);
        income.setDescription("income");
    }

    @Test
    void shouldReturnIncomeDto() {
        IncomeDto expectedDto = new IncomeDto(
                income.getSlug(),
                income.getTitle(),
                income.getAmount(),
                income.getDate(),
                income.getCategory(),
                income.getCreatedAt(),
                income.getUpdatedAt(),
                income.getDescription()
        );

        IncomeDto incomeDto = IncomeDto.from(income);

        assertNotNull(incomeDto);
        assertEquals(expectedDto.getSlug(), incomeDto.getSlug());
        assertEquals(expectedDto.getTitle(), incomeDto.getTitle());
        assertEquals(expectedDto.getAmount(), incomeDto.getAmount());
        assertEquals(expectedDto.getDate(), incomeDto.getDate());
        assertEquals(expectedDto.getCategory(), incomeDto.getCategory());
        assertEquals(expectedDto.getCreatedAt(), incomeDto.getCreatedAt());
        assertEquals(expectedDto.getUpdatedAt(), incomeDto.getUpdatedAt());
        assertEquals(expectedDto.getDescription(), incomeDto.getDescription());
    }
}