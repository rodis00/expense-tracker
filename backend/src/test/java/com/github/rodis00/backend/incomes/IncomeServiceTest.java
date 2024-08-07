package com.github.rodis00.backend.incomes;

import com.github.rodis00.backend.entity.IncomeEntity;
import com.github.rodis00.backend.entity.UserEntity;
import com.github.rodis00.backend.exception.IncomeNotFoundException;
import com.github.rodis00.backend.page.GlobalPage;
import com.github.rodis00.backend.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

    @BeforeEach
    void setUp() {
        user = new UserEntity();
        user.setId(1L);
        user.setUsername("test");
        user.setPassword("test123");
        user.setEmail("test@test.com");
        user.setIncomes(null);
        user.setExpenses(null);

        income = new IncomeEntity();
        income.setId(1L);
        income.setUser(user);
        income.setAmount(new BigDecimal("100.00"));
        income.setTitle("income");
        income.setDate(LocalDateTime.of(2024, 5, 24, 14, 54));

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

        when(userService.getUserById(1L)).thenReturn(user);
        when(incomeRepository.save(any(IncomeEntity.class))).thenReturn(expectedIncome);

        IncomeEntity savedIncome = incomeService.saveIncome(newIncome, 1L);

        assertNotNull(savedIncome);
        assertEquals(income.getTitle(), savedIncome.getTitle());
        assertEquals(income.getAmount(), savedIncome.getAmount());
        assertEquals(income.getDate(), savedIncome.getDate());
        assertEquals(income.getUser(), savedIncome.getUser());

        verify(incomeRepository, times(1)).save(any(IncomeEntity.class));
    }

    @Test
    void shouldGetIncomeById() {
        when(incomeRepository.findById(1L)).thenReturn(Optional.of(income));

        IncomeEntity existingIncome = incomeService.getIncomeById(1L);

        assertNotNull(existingIncome);
        assertEquals(income.getId(), existingIncome.getId());
        assertEquals(income.getTitle(), existingIncome.getTitle());

        verify(incomeRepository, times(1)).findById(1L);
    }

    @Test
    void shouldThrowExceptionIfIncomeNotFound() {
        when(incomeRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(IncomeNotFoundException.class, () -> {
            incomeService.getIncomeById(1L);
        });

        verify(incomeRepository, times(1)).findById(1L);
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

        when(incomeRepository.findById(1L)).thenReturn(Optional.of(income));
        when(incomeRepository.save(any(IncomeEntity.class))).thenReturn(expectedIncome);

        IncomeEntity income = incomeService.updateIncome(1L, updatedIncome);

        assertNotNull(income);
        assertEquals(expectedIncome.getTitle(), income.getTitle());
        assertEquals(expectedIncome.getAmount(), income.getAmount());
        assertEquals(expectedIncome.getDate(), income.getDate());

        verify(incomeRepository, times(1)).findById(1L);
        verify(incomeRepository, times(1)).save(any(IncomeEntity.class));
    }

    @Test
    void shouldReturnAllIncomes() {
        List<IncomeEntity> expectedIncomes = List.of(income);

        when(incomeRepository.findAll()).thenReturn(expectedIncomes);

        List<IncomeEntity> incomes = incomeService.getAllIncomes();

        assertNotNull(incomes);
        assertEquals(1, incomes.size());
        assertEquals(expectedIncomes, incomes);

        verify(incomeRepository, times(1)).findAll();
    }

    @Test
    void shouldReturnAllUserIncomes() {
        List<IncomeEntity> expectedIncomes = List.of(income);

        when(userService.getUserById(1L)).thenReturn(user);
        when(incomeRepository.findAllByUserId(1L)).thenReturn(expectedIncomes);

        List<IncomeEntity> userIncomes = incomeService.getAllUserIncomes(1L);

        assertNotNull(userIncomes);
        assertEquals(1, userIncomes.size());

        verify(userService, times(1)).getUserById(1L);
        verify(incomeRepository, times(1)).findAllByUserId(1L);
    }

    @Test
    void shouldDeleteIncomeById() {
        when(incomeRepository.findById(1L)).thenReturn(Optional.of(income));
        doNothing()
                .when(incomeRepository)
                .delete(income);

        incomeService.deleteIncomeById(1L);

        verify(incomeRepository, times(1)).findById(1L);
        verify(incomeRepository, times(1)).delete(income);
    }

    @Test
    void shouldReturnAllIncomesByUserId() {
        IncomeEntity income1 = new IncomeEntity();
        income1.setId(1L);
        income1.setTitle("income 1");
        income1.setDate(LocalDateTime.of(2024, 5, 4, 12, 12));
        income1.setAmount(new BigDecimal("100.00"));
        income1.setUser(user);

        IncomeEntity income2 = new IncomeEntity();
        income2.setId(2L);
        income2.setTitle("income 2");
        income2.setDate(LocalDateTime.of(2023, 6, 12, 9, 45));
        income2.setAmount(new BigDecimal("200.00"));
        income2.setUser(user);

        Page<IncomeEntity> incomePage = new PageImpl<>(List.of(income1, income2));

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());

        Pageable pageable = PageRequest.of(
                page.getPageNumber(),
                page.getPageSize(),
                sort
        );

        when(userService.getUserById(1L)).thenReturn(user);
        when(incomeRepository
                .findAllIncomesByUserIdAndYear(1L, null, pageable)).thenReturn(incomePage);

        Page<IncomeEntity> userIncomesPage = incomeService.findAllIncomesByUserId(1L, page, null);

        assertNotNull(userIncomesPage);
        assertEquals(2, userIncomesPage.getTotalElements());


        verify(userService, times(1)).getUserById(1L);
        verify(incomeRepository, times(1))
                .findAllIncomesByUserIdAndYear(1L, null, pageable);
    }

    @Test
    void shouldReturnUserIncomesPageWithSpecificYear() {
        IncomeEntity income1 = new IncomeEntity();
        income1.setId(1L);
        income1.setTitle("income 1");
        income1.setDate(LocalDateTime.of(2024, 5, 4, 12, 12));
        income1.setAmount(new BigDecimal("100.00"));
        income1.setUser(user);

        int year = 2024;

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());

        Pageable pageable = PageRequest.of(
                page.getPageNumber(),
                page.getPageSize(),
                sort
        );

        Page<IncomeEntity> incomePage = new PageImpl<>(List.of(income1));

        when(userService.getUserById(1L)).thenReturn(user);
        when(incomeRepository.findAllIncomesByUserIdAndYear(1L, year, pageable)).thenReturn(incomePage);

        Page<IncomeEntity> filteredIncomes = incomeService.findAllIncomesByUserId(1L, page, year);

        assertNotNull(filteredIncomes);
        assertEquals(1, filteredIncomes.getTotalElements());
        assertEquals(year, filteredIncomes.getContent().get(0).getDate().getYear());

        verify(userService, times(1)).getUserById(1L);
        verify(incomeRepository, times(1))
                .findAllIncomesByUserIdAndYear(1L, year, pageable);
    }

    @Test
    void shouldReturnUserIncomesPageWithSpecificYearAndSortDirectionDESC() {
        IncomeEntity income1 = new IncomeEntity();
        income1.setId(1L);
        income1.setTitle("income 1");
        income1.setDate(LocalDateTime.of(2024, 6, 4, 12, 12));
        income1.setAmount(new BigDecimal("100.00"));
        income1.setUser(user);

        IncomeEntity income2 = new IncomeEntity();
        income2.setId(2L);
        income2.setTitle("income 2");
        income2.setDate(LocalDateTime.of(2024, 5, 12, 9, 45));
        income2.setAmount(new BigDecimal("200.00"));
        income2.setUser(user);

        int year = 2024;

        GlobalPage page = new GlobalPage();
        page.setPageNumber(0);
        page.setPageSize(5);
        page.setSortBy("date");
        page.setSortDirection(Sort.Direction.DESC);

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());

        Pageable pageable = PageRequest.of(
                page.getPageNumber(),
                page.getPageSize(),
                sort
        );

        Page<IncomeEntity> incomePage = new PageImpl<>(List.of(income1, income2));

        when(userService.getUserById(1L)).thenReturn(user);
        when(incomeRepository.findAllIncomesByUserIdAndYear(1L, year, pageable)).thenReturn(incomePage);

        Page<IncomeEntity> filteredIncomes = incomeService.findAllIncomesByUserId(1L, page, year);

        assertNotNull(filteredIncomes);
        assertEquals(Sort.Direction.DESC, page.getSortDirection());
        assertEquals(2, filteredIncomes.getTotalElements());
        assertEquals(year, filteredIncomes.getContent().get(0).getDate().getYear());
        assertEquals(income1.getTitle(), filteredIncomes.getContent().get(0).getTitle());
        assertTrue(filteredIncomes.getContent().get(0).getDate().isAfter(filteredIncomes.getContent().get(1).getDate()));

        verify(userService, times(1)).getUserById(1L);
        verify(incomeRepository, times(1))
                .findAllIncomesByUserIdAndYear(1L, year, pageable);
    }

    @Test
    void shouldReturnUserIncomesPageWithSpecificYearAndSortDirectionASC() {
        IncomeEntity income1 = new IncomeEntity();
        income1.setId(1L);
        income1.setTitle("income 1");
        income1.setDate(LocalDateTime.of(2024, 6, 4, 12, 12));
        income1.setAmount(new BigDecimal("100.00"));
        income1.setUser(user);

        IncomeEntity income2 = new IncomeEntity();
        income2.setId(2L);
        income2.setTitle("income 2");
        income2.setDate(LocalDateTime.of(2024, 5, 12, 9, 45));
        income2.setAmount(new BigDecimal("200.00"));
        income2.setUser(user);

        int year = 2024;

        GlobalPage page = new GlobalPage();
        page.setPageNumber(0);
        page.setPageSize(5);
        page.setSortBy("date");
        page.setSortDirection(Sort.Direction.ASC);

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());

        Pageable pageable = PageRequest.of(
                page.getPageNumber(),
                page.getPageSize(),
                sort
        );

        Page<IncomeEntity> incomePage = new PageImpl<>(List.of(income2, income1));

        when(userService.getUserById(1L)).thenReturn(user);
        when(incomeRepository.findAllIncomesByUserIdAndYear(1L, year, pageable)).thenReturn(incomePage);

        Page<IncomeEntity> filteredIncomes = incomeService.findAllIncomesByUserId(1L, page, year);

        assertNotNull(filteredIncomes);
        assertEquals(Sort.Direction.ASC, page.getSortDirection());
        assertEquals(2, filteredIncomes.getTotalElements());
        assertEquals(year, filteredIncomes.getContent().get(0).getDate().getYear());
        assertEquals(income2.getTitle(), filteredIncomes.getContent().get(0).getTitle());
        assertTrue(filteredIncomes.getContent().get(0).getDate().isBefore(filteredIncomes.getContent().get(1).getDate()));

        verify(userService, times(1)).getUserById(1L);
        verify(incomeRepository, times(1))
                .findAllIncomesByUserIdAndYear(1L, year, pageable);
    }
}