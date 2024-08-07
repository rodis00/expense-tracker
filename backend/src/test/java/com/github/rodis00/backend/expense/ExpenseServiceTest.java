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

    @BeforeEach
    void setUp() {
        user = new UserEntity();
        user.setId(1L);

        expense = new ExpenseEntity();
        expense.setId(1L);
        expense.setTitle("expense");
        expense.setDate(LocalDateTime.of(2024, 5, 25, 18, 8));
        expense.setPrice(new BigDecimal("100.00"));
        expense.setUser(user);
    }

    @Test
    void shouldSaveExpense() {
        Expense newExpense = new Expense();
        newExpense.setTitle("expense");
        newExpense.setDate(LocalDateTime.of(2024, 5, 25, 18, 8));
        newExpense.setPrice(new BigDecimal("100.00"));

        when(expenseRepository.save(any(ExpenseEntity.class))).thenReturn(expense);
        when(userService.getUserById(1L)).thenReturn(user);

        ExpenseEntity savedExpense = expenseService.saveExpense(newExpense, user.getId());

        assertNotNull(savedExpense);
        assertEquals(expense.getId(), savedExpense.getId());
        assertEquals(expense.getTitle(), savedExpense.getTitle());
        assertEquals(expense.getUser(), savedExpense.getUser());

        verify(userService, times(1)).getUserById(1L);
        verify(expenseRepository, times(1)).save(any(ExpenseEntity.class));
    }

    @Test
    void shouldGetExpenseById() {
        when(expenseRepository.findById(1L)).thenReturn(Optional.of(expense));

        ExpenseEntity existedExpense = expenseService.getExpenseById(1L);

        assertNotNull(existedExpense);
        assertEquals(expense.getId(), existedExpense.getId());
        assertEquals(expense.getTitle(), existedExpense.getTitle());

        verify(expenseRepository, times(1)).findById(1L);
    }

    @Test
    void shouldThrowExceptionIfExpenseNotFound() {
        when(expenseRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ExpenseNotFoundException.class, () -> {
            expenseService.getExpenseById(1L);
        });

        verify(expenseRepository, times(1)).findById(1L);
    }

    @Test
    void shouldUpdateExpense() {
        Expense newExpense = new Expense();
        newExpense.setTitle("newExpense");
        newExpense.setDate(LocalDateTime.of(2024, 5, 25, 18, 28));
        newExpense.setPrice(new BigDecimal("150.00"));

        when(expenseRepository.findById(1L)).thenReturn(Optional.of(expense));
        when(expenseRepository.save(any(ExpenseEntity.class))).thenReturn(expense);

        ExpenseEntity updatedExpense = expenseService.updateExpense(expense.getId(), newExpense);

        assertNotNull(updatedExpense);
        assertEquals(newExpense.getTitle(), updatedExpense.getTitle());
        assertEquals(newExpense.getPrice(), updatedExpense.getPrice());
        assertEquals(newExpense.getDate(), updatedExpense.getDate());

        verify(expenseRepository, times(1)).findById(1L);
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
    void shouldReturnAllUserExpenses() {
        List<ExpenseEntity> expectedExpenses = List.of(expense);

        when(userService.getUserById(1L)).thenReturn(user);
        when(expenseRepository.findAllByUserId(1L)).thenReturn(expectedExpenses);

        List<ExpenseEntity> expenses = expenseService.getAllUserExpenses(user.getId());

        assertEquals(expectedExpenses.size(), expenses.size());
        assertEquals(expectedExpenses.get(0).getId(), expenses.get(0).getId());
        assertEquals(expectedExpenses.get(0).getTitle(), expenses.get(0).getTitle());
        assertEquals(expectedExpenses.get(0).getUser(), expenses.get(0).getUser());

        verify(userService, times(1)).getUserById(1L);
        verify(expenseRepository, times(1)).findAllByUserId(1L);
    }

    @Test
    void shouldDeleteExpenseById() {
        when(expenseRepository.findById(1L)).thenReturn(Optional.of(expense));
        doNothing()
                .when(expenseRepository)
                .delete(expense);

        expenseService.deleteExpenseById(1L);

        verify(expenseRepository, times(1)).findById(1L);
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

        when(userService.getUserById(1L)).thenReturn(user);
        when(expenseRepository.findAllExpensesByUserIdAndYear(user.getId(), null, pageable))
                .thenReturn(expectedPage);

        Page<ExpenseEntity> expensePage = expenseService.findAllExpensesByUserId(user.getId(), page, null);

        assertNotNull(expensePage);
        assertEquals(expectedPage.getTotalElements(), expensePage.getTotalElements());
        assertEquals(expectedPage.getTotalPages(), expectedPage.getTotalPages());
        assertEquals(expectedPage.getContent().get(0), expensePage.getContent().get(0));
        assertEquals(expectedPage.getContent().get(1), expensePage.getContent().get(1));

        verify(userService, times(1)).getUserById(1L);
        verify(expenseRepository, times(1))
                .findAllExpensesByUserIdAndYear(1L, null, pageable);
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

        when(userService.getUserById(1L)).thenReturn(user);
        when(expenseRepository.findAllExpensesByUserIdAndYear(user.getId(), year, pageable))
                .thenReturn(expectedPage);

        Page<ExpenseEntity> expensePage = expenseService.findAllExpensesByUserId(user.getId(), page, year);

        assertNotNull(expensePage);
        assertEquals(expectedPage.getTotalElements(), expensePage.getTotalElements());
        assertEquals(expectedPage.getTotalPages(), expectedPage.getTotalPages());
        assertEquals(year, expensePage.getContent().get(0).getDate().getYear());

        verify(userService, times(1)).getUserById(1L);
        verify(expenseRepository, times(1))
                .findAllExpensesByUserIdAndYear(1L, year, pageable);
    }

    @Test
    void shouldReturnUserExpensesPageInSpecificYearAndSortDirectionDESC() {
        ExpenseEntity expense1 = new ExpenseEntity();
        expense1.setId(1L);
        expense1.setTitle("expense1");
        expense1.setDate(LocalDateTime.of(2024, 12, 25, 19, 50));
        expense1.setPrice(new BigDecimal("150.00"));
        expense1.setUser(user);

        ExpenseEntity expense2 = new ExpenseEntity();
        expense2.setId(2L);
        expense2.setTitle("expense2");
        expense2.setDate(LocalDateTime.of(2024, 5, 13, 2, 30));
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

        when(userService.getUserById(1L)).thenReturn(user);
        when(expenseRepository.findAllExpensesByUserIdAndYear(user.getId(), year, pageable))
                .thenReturn(expectedPage);

        Page<ExpenseEntity> expensePage = expenseService.findAllExpensesByUserId(user.getId(), page, year);

        assertNotNull(expensePage);
        assertEquals(expectedPage.getTotalElements(), expensePage.getTotalElements());
        assertEquals(expectedPage.getTotalPages(), expectedPage.getTotalPages());
        assertEquals(Sort.Direction.DESC, page.getSortDirection());
        assertEquals(year, expensePage.getContent().get(0).getDate().getYear());
        assertTrue(expensePage.getContent().get(0).getDate().isAfter(expensePage.getContent().get(1).getDate()));

        verify(userService, times(1)).getUserById(1L);
        verify(expenseRepository, times(1))
                .findAllExpensesByUserIdAndYear(1L, year, pageable);
    }

    @Test
    void shouldReturnUserExpensesPageInSpecificYearAndSortDirectionASC() {
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
        page.setSortDirection(Sort.Direction.ASC);
        page.setSortBy("date");

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);

        int year = 2024;

        Page<ExpenseEntity> expectedPage = new PageImpl<>(List.of(expense1, expense2));

        when(userService.getUserById(1L)).thenReturn(user);
        when(expenseRepository.findAllExpensesByUserIdAndYear(user.getId(), year, pageable))
                .thenReturn(expectedPage);

        Page<ExpenseEntity> expensePage = expenseService.findAllExpensesByUserId(user.getId(), page, year);

        assertNotNull(expensePage);
        assertEquals(expectedPage.getTotalElements(), expensePage.getTotalElements());
        assertEquals(expectedPage.getTotalPages(), expectedPage.getTotalPages());
        assertEquals(Sort.Direction.ASC, page.getSortDirection());
        assertEquals(year, expensePage.getContent().get(0).getDate().getYear());
        assertTrue(expensePage.getContent().get(0).getDate().isBefore(expensePage.getContent().get(1).getDate()));

        verify(userService, times(1)).getUserById(1L);
        verify(expenseRepository, times(1))
                .findAllExpensesByUserIdAndYear(1L, year, pageable);
    }
}