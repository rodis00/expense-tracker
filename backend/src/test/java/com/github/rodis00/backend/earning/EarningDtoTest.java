package com.github.rodis00.backend.earning;

import com.github.rodis00.backend.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class EarningDtoTest {

    private Earning earning;
    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1);

        earning = new Earning();
        earning.setId(1);
        earning.setTitle("earning");
        earning.setAmount(100.0);
        earning.setDate(LocalDateTime.of(2024,5,24,18,4));
        earning.setUser(user);
    }

    @Test
    void shouldReturnEarningDto() {
        EarningDto earningDto = EarningDto.from(earning);

        assertNotNull(earningDto);
        assertEquals(earning.getId(), earningDto.getId());
        assertEquals(earning.getTitle(), earningDto.getTitle());
        assertEquals(earning.getAmount(), earningDto.getAmount());
        assertEquals(earning.getDate(), earningDto.getDate());

    }
}