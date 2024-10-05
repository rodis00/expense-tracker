package com.github.rodis00.backend.expense;

import com.github.rodis00.backend.entity.ExpenseEntity;
import com.github.rodis00.backend.entity.UserEntity;
import com.github.rodis00.backend.exception.ExpenseNotFoundException;
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
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ExpenseServiceTest {

    @Mock
    private ExpenseRepository expenseRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private ExpenseService expenseService;

    private UserEntity user;

    private ExpenseEntity expense;

    private final String username = "username";

    private final String slug = UUID.randomUUID().toString();

    @BeforeEach
    void setUp() {
        user = new UserEntity();
        user.setId(1L);
        user.setUsername(username);

        expense = new ExpenseEntity();
        expense.setId(1L);
        expense.setTitle("expense");
        expense.setDate(LocalDateTime.of(2024, 5, 25, 18, 8));
        expense.setPrice(new BigDecimal("100.00"));
        expense.setUser(user);
        expense.setDescription("expense");
        expense.setSlug(slug);
    }

    @Test
    void shouldSaveExpense() {
        Expense newExpense = new Expense();
        newExpense.setTitle("expense");
        newExpense.setDate(LocalDateTime.of(2024, 5, 25, 18, 8));
        newExpense.setPrice(new BigDecimal("100.00"));

        when(expenseRepository.save(any(ExpenseEntity.class))).thenReturn(expense);
        when(userService.getUserByUsername(username)).thenReturn(user);

        ExpenseEntity savedExpense = expenseService.saveExpense(newExpense, username);

        assertNotNull(savedExpense);
        assertEquals(expense.getId(), savedExpense.getId());
        assertEquals(expense.getTitle(), savedExpense.getTitle());
        assertEquals(expense.getUser(), savedExpense.getUser());

        verify(userService, times(1)).getUserByUsername(username);
        verify(expenseRepository, times(1)).save(any(ExpenseEntity.class));
    }

    @Test
    void shouldGetExpenseBySlug() {
        when(expenseRepository.findBySlug(slug)).thenReturn(Optional.of(expense));

        ExpenseEntity existedExpense = expenseService.getExpenseBySlug(slug);

        assertNotNull(existedExpense);
        assertEquals(expense.getId(), existedExpense.getId());
        assertEquals(expense.getTitle(), existedExpense.getTitle());

        verify(expenseRepository, times(1)).findBySlug(slug);
    }

    @Test
    void shouldThrowExceptionIfExpenseNotFound() {
        when(expenseRepository.findBySlug(slug)).thenReturn(Optional.empty());

        assertThrows(ExpenseNotFoundException.class, () -> {
            expenseService.getExpenseBySlug(slug);
        });

        verify(expenseRepository, times(1)).findBySlug(slug);
    }

    @Test
    void shouldUpdateExpense() {
        Expense newExpense = new Expense();
        newExpense.setTitle("newExpense");
        newExpense.setDate(LocalDateTime.of(2024, 5, 25, 18, 28));
        newExpense.setPrice(new BigDecimal("150.00"));

        when(expenseRepository.findBySlug(slug)).thenReturn(Optional.of(expense));
        when(expenseRepository.save(any(ExpenseEntity.class))).thenReturn(expense);

        ExpenseEntity updatedExpense = expenseService.updateExpense(slug, newExpense);

        assertNotNull(updatedExpense);
        assertEquals(newExpense.getTitle(), updatedExpense.getTitle());
        assertEquals(newExpense.getPrice(), updatedExpense.getPrice());
        assertEquals(newExpense.getDate(), updatedExpense.getDate());

        verify(expenseRepository, times(1)).findBySlug(slug);
        verify(expenseRepository, times(1)).save(any(ExpenseEntity.class));
    }

    @Test
    void shouldReturnAllExpenses() {
        List<ExpenseEntity> expenses = List.of(expense);

        when(expenseRepository.findAll()).thenReturn(expenses);

        List<ExpenseEntity> existedExpenses = expenseService.getAllExpenses();

        assertEquals(expenses.size(), existedExpenses.size());
        assertEquals(expenses.get(0).getId(), existedExpenses.get(0).getId());
        assertEquals(expenses.get(0).getTitle(), existedExpenses.get(0).getTitle());

        verify(expenseRepository, times(1)).findAll();
    }

    @Test
    void shouldDeleteExpenseBySlug() {
        when(expenseRepository.findBySlug(slug)).thenReturn(Optional.of(expense));
        doNothing().when(expenseRepository).delete(expense);

        expenseService.deleteExpenseBySlug(slug);

        verify(expenseRepository, times(1)).findBySlug(slug);
        verify(expenseRepository, times(1)).delete(expense);
    }

    @Test
    void shouldReturnUserExpensesPage() {
        ExpenseEntity expense1 = new ExpenseEntity();
        expense1.setId(1L);
        expense1.setTitle("expense1");
        expense1.setDate(LocalDateTime.of(2024, 5, 25, 19, 50));
        expense1.setPrice(new BigDecimal("150.00"));
        expense1.setUser(user);

        ExpenseEntity expense2 = new ExpenseEntity();
        expense2.setId(2L);
        expense2.setTitle("expense2");
        expense2.setDate(LocalDateTime.of(2022, 12, 13, 2, 30));
        expense2.setPrice(new BigDecimal("100.00"));
        expense2.setUser(user);

        GlobalPage page = new GlobalPage();
        page.setPageNumber(0);
        page.setPageSize(5);
        page.setSortDirection(Sort.Direction.DESC);
        page.setSortBy("date");

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);

        Page<ExpenseEntity> expectedPage = new PageImpl<>(List.of(expense1, expense2));

        when(userService.getUserByUsername(username)).thenReturn(user);
        when(expenseRepository.findAllExpensesByUser_UsernameAndYear(user.getUsername(), null, pageable))
                .thenReturn(expectedPage);

        Page<ExpenseEntity> expensePage = expenseService.findAllExpensesByUsername(username, page, null);

        assertNotNull(expensePage);
        assertEquals(expectedPage.getTotalElements(), expensePage.getTotalElements());
        assertEquals(expectedPage.getTotalPages(), expensePage.getTotalPages());
        assertEquals(expectedPage.getContent().get(0), expensePage.getContent().get(0));
        assertEquals(expectedPage.getContent().get(1), expensePage.getContent().get(1));

        verify(userService, times(1)).getUserByUsername(username);
        verify(expenseRepository, times(1))
                .findAllExpensesByUser_UsernameAndYear(user.getUsername(), null, pageable);
    }

    @Test
    void shouldReturnUserExpensesPageInSpecificYear() {
        ExpenseEntity expense1 = new ExpenseEntity();
        expense1.setId(1L);
        expense1.setTitle("expense1");
        expense1.setDate(LocalDateTime.of(2024, 5, 25, 19, 50));
        expense1.setPrice(new BigDecimal("150.00"));
        expense1.setUser(user);

        ExpenseEntity expense2 = new ExpenseEntity();
        expense2.setId(2L);
        expense2.setTitle("expense2");
        expense2.setDate(LocalDateTime.of(2024, 12, 13, 2, 30));
        expense2.setPrice(new BigDecimal("100.00"));
        expense2.setUser(user);

        GlobalPage page = new GlobalPage();
        page.setPageNumber(0);
        page.setPageSize(5);
        page.setSortDirection(Sort.Direction.DESC);
        page.setSortBy("date");

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);

        int year = 2024;

        Page<ExpenseEntity> expectedPage = new PageImpl<>(List.of(expense1, expense2));

        when(userService.getUserByUsername(username)).thenReturn(user);
        when(expenseRepository.findAllExpensesByUser_UsernameAndYear(user.getUsername(), year, pageable))
                .thenReturn(expectedPage);

        Page<ExpenseEntity> expensePage = expenseService.findAllExpensesByUsername(username, page, year);

        assertNotNull(expensePage);
        assertEquals(expectedPage.getTotalElements(), expensePage.getTotalElements());
        assertEquals(expectedPage.getTotalPages(), expensePage.getTotalPages());
        assertEquals(year, expensePage.getContent().get(0).getDate().getYear());

        verify(userService, times(1)).getUserByUsername(username);
        verify(expenseRepository, times(1))
                .findAllExpensesByUser_UsernameAndYear(user.getUsername(), year, pageable);
    }

    @Test
    void shouldReturnAllSortedExpenseYears() {
        ExpenseEntity expense1 = new ExpenseEntity();
        expense1.setDate(LocalDateTime.of(2000, 6, 4, 12, 12));

        ExpenseEntity expense2 = new ExpenseEntity();
        expense2.setDate(LocalDateTime.of(2024, 6, 4, 12, 12));

        ExpenseEntity expense3 = new ExpenseEntity();
        expense3.setDate(LocalDateTime.of(2010, 6, 4, 12, 12));

        List<ExpenseEntity> expenses = List.of(expense1, expense2, expense3);

        List<Integer> expectedYears = List.of(2000, 2010, 2024);

        when(expenseRepository.findAll()).thenReturn(expenses);

        List<Integer> expenseYears = expenseService.getYears();

        assertNotNull(expenseYears);
        assertEquals(expectedYears.size(), expenseYears.size());
        assertEquals(expectedYears, expenseYears);

        verify(expenseRepository, times(1)).findAll();
    }
}
