package com.github.rodis00.backend.earning;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class EarningDtoTest {

    private Earning earning;

    @BeforeEach
    void setUp() {
        earning = new Earning();
        earning.setId(1);
        earning.setTitle("earning");
        earning.setAmount(100.0);
        earning.setDate(LocalDateTime.of(2024,5,24,18,4));
        earning.setUser(null);
    }

    @Test
    void shouldReturnEarningDto() {
        EarningDto expectedDto = new EarningDto(
                earning.getId(),
                earning.getTitle(),
                earning.getAmount(),
                earning.getDate()
        );

        EarningDto earningDto = EarningDto.from(earning);

        assertNotNull(earningDto);
        assertEquals(expectedDto.getId(), earningDto.getId());
        assertEquals(expectedDto.getTitle(), earningDto.getTitle());
        assertEquals(expectedDto.getAmount(), earningDto.getAmount());
        assertEquals(expectedDto.getDate(), earningDto.getDate());
    }
}