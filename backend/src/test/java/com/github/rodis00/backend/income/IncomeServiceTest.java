package com.github.rodis00.backend.income;

import com.github.rodis00.backend.entity.IncomeEntity;
import com.github.rodis00.backend.entity.UserEntity;
import com.github.rodis00.backend.page.GlobalPage;
import com.github.rodis00.backend.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class IncomeServiceTest {

    @Mock
    private IncomeRepository incomeRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private IncomeService incomeService;

    private UserEntity user;

    private IncomeEntity income;

    private GlobalPage page;

    final String username = "test";

    final String slug = UUID.randomUUID().toString();

    @BeforeEach
    void setUp() {
        user = new UserEntity();
        user.setId(1L);
        user.setUsername(username);
        user.setPassword("test123");
        user.setEmail("test@test.com");

        income = new IncomeEntity();
        income.setId(1L);
        income.setUser(user);
        income.setAmount(new BigDecimal("100.00"));
        income.setTitle("income");
        income.setDate(LocalDateTime.of(2024, 5, 24, 14, 54));
        income.setDescription("income");
        income.setSlug(slug);

        page = new GlobalPage();
        page.setPageNumber(0);
        page.setPageSize(5);
        page.setSortBy("date");
        page.setSortDirection(Sort.Direction.DESC);
    }

    @Test
    void shouldSaveIncome() {
        Income newIncome = new Income();
        newIncome.setAmount(new BigDecimal("100.00"));
        newIncome.setTitle("income");
        newIncome.setDate(LocalDateTime.of(2024, 5, 24, 14, 54));

        IncomeEntity expectedIncome = new IncomeEntity();
        expectedIncome.setId(1L);
        expectedIncome.setUser(user);
        expectedIncome.setAmount(new BigDecimal("100.00"));
        expectedIncome.setTitle("income");
        expectedIncome.setDate(LocalDateTime.of(2024, 5, 24, 14, 54));

        when(userService.getUserByUsername(username)).thenReturn(user);
        when(incomeRepository.save(any(IncomeEntity.class))).thenReturn(expectedIncome);

        IncomeEntity savedIncome = incomeService.saveIncome(newIncome, username);

        assertNotNull(savedIncome);
        assertEquals(income.getTitle(), savedIncome.getTitle());
        assertEquals(income.getAmount(), savedIncome.getAmount());
        assertEquals(income.getDate(), savedIncome.getDate());
        assertEquals(income.getUser(), savedIncome.getUser());

        verify(incomeRepository, times(1)).save(any(IncomeEntity.class));
    }

    @Test
    void shouldGetIncomeBySlug() {
        when(incomeRepository.findBySlug(slug)).thenReturn(Optional.of(income));

        IncomeEntity existingIncome = incomeService.getIncomeBySlug(slug);

        assertNotNull(existingIncome);
        assertEquals(income.getSlug(), existingIncome.getSlug());
        assertEquals(income.getTitle(), existingIncome.getTitle());

        verify(incomeRepository, times(1)).findBySlug(slug);
    }

    @Test
    void shouldThrowExceptionIfIncomeNotFound() {
        when(incomeRepository.findBySlug(slug)).thenReturn(Optional.empty());

        assertThrows(IncomeNotFoundException.class, () -> {
            incomeService.getIncomeBySlug(slug);
        });

        verify(incomeRepository, times(1)).findBySlug(slug);
    }

    @Test
    void shouldUpdateIncome() {
        LocalDateTime newDate = LocalDateTime.of(2024, 6, 12, 12, 23);
        String newTitle = "newTitle";
        BigDecimal newAmount = new BigDecimal("200.00");

        Income updatedIncome = new Income();
        updatedIncome.setTitle(newTitle);
        updatedIncome.setAmount(newAmount);
        updatedIncome.setDate(newDate);

        IncomeEntity expectedIncome = new IncomeEntity();
        expectedIncome.setId(1L);
        expectedIncome.setTitle(newTitle);
        expectedIncome.setAmount(newAmount);
        expectedIncome.setDate(newDate);

        when(incomeRepository.findBySlug(slug)).thenReturn(Optional.of(income));
        when(incomeRepository.save(any(IncomeEntity.class))).thenReturn(expectedIncome);

        IncomeEntity income = incomeService.updateIncome(slug, updatedIncome);

        assertNotNull(income);
        assertEquals(expectedIncome.getTitle(), income.getTitle());
        assertEquals(expectedIncome.getAmount(), income.getAmount());
        assertEquals(expectedIncome.getDate(), income.getDate());

        verify(incomeRepository, times(1)).findBySlug(slug);
        verify(incomeRepository, times(1)).save(any(IncomeEntity.class));
    }

    @Test
    void shouldDeleteIncomeBySlug() {
        when(incomeRepository.findBySlug(slug)).thenReturn(Optional.of(income));
        doNothing().when(incomeRepository).delete(income);

        incomeService.deleteIncomeBySlug(slug);

        verify(incomeRepository, times(1)).findBySlug(slug);
        verify(incomeRepository, times(1)).delete(income);
    }

    @Test
    void shouldReturnAllSortedIncomeYears() {
        IncomeEntity income1 = new IncomeEntity();
        income1.setDate(LocalDateTime.of(2000, 6, 4, 12, 12));

        IncomeEntity income2 = new IncomeEntity();
        income2.setDate(LocalDateTime.of(2024, 6, 4, 12, 12));

        IncomeEntity income3 = new IncomeEntity();
        income3.setDate(LocalDateTime.of(2010, 6, 4, 12, 12));

        List<IncomeEntity> incomes = List.of(income1, income2, income3);

        List<Integer> expectedYears = List.of(2000, 2010, 2024);

        when(incomeRepository.findAll()).thenReturn(incomes);

        List<Integer> incomeYears = incomeService.getYears();

        assertNotNull(incomeYears);
        assertEquals(expectedYears.size(), incomeYears.size());
        assertEquals(expectedYears, incomeYears);

        verify(incomeRepository, times(1)).findAll();
    }
}
