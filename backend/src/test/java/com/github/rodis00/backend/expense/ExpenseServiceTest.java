package com.github.rodis00.backend.expense;

import com.github.rodis00.backend.exception.ExpenseNotFoundException;
import com.github.rodis00.backend.page.GlobalPage;
import com.github.rodis00.backend.user.User;
import com.github.rodis00.backend.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.data.domain.*;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
class ExpenseServiceTest {

    @Mock
    private ExpenseRepository expenseRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private ExpenseService expenseService;

    private User user;

    private Expense expense;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1);

        expense = new Expense();
        expense.setId(1);
        expense.setTitle("expense");
        expense.setDate(LocalDateTime.of(2024, 5, 25, 18, 8));
        expense.setPrice(100.0);
        expense.setUser(user);
    }

    @Test
    void shouldSaveExpense() {
        when(expenseRepository.save(expense)).thenReturn(expense);
        when(userService.getUserById(1)).thenReturn(user);

        Expense savedExpense = expenseService.saveExpense(expense, user.getId());

        assertNotNull(savedExpense);
        assertEquals(expense.getId(), savedExpense.getId());
        assertEquals(expense.getTitle(), savedExpense.getTitle());
        assertEquals(expense.getUser(), savedExpense.getUser());

        verify(userService, times(1)).getUserById(1);
        verify(expenseRepository, times(1)).save(expense);
    }

    @Test
    void shouldGetExpenseById() {
        when(expenseRepository.findById(1)).thenReturn(Optional.of(expense));

        Expense existedExpense = expenseService.getExpenseById(1);

        assertNotNull(existedExpense);
        assertEquals(expense.getId(), existedExpense.getId());
        assertEquals(expense.getTitle(), existedExpense.getTitle());

        verify(expenseRepository, times(1)).findById(1);
    }

    @Test
    void shouldThrowExceptionIfExpenseNotFound() {
        when(expenseRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(ExpenseNotFoundException.class, () -> {
            expenseService.getExpenseById(1);
        });

        verify(expenseRepository, times(1)).findById(1);
    }

    @Test
    void shouldUpdateExpense() {
        Expense newExpense = new Expense();
        newExpense.setId(1);
        newExpense.setTitle("newExpense");
        newExpense.setDate(LocalDateTime.of(2024, 5, 25, 18, 28));
        newExpense.setPrice(150.0);
        newExpense.setUser(user);

        when(expenseRepository.findById(1)).thenReturn(Optional.of(expense));
        when(expenseRepository.save(newExpense)).thenReturn(newExpense);

        Expense updatedExpense = expenseService.updateExpense(expense.getId(), newExpense);

        assertNotNull(updatedExpense);
        assertEquals(newExpense.getId(), updatedExpense.getId());
        assertEquals(newExpense.getTitle(), updatedExpense.getTitle());
        assertEquals(newExpense.getPrice(), updatedExpense.getPrice());
        assertEquals(newExpense.getDate(), updatedExpense.getDate());
        assertEquals(newExpense.getUser(), updatedExpense.getUser());

        verify(expenseRepository, times(1)).findById(1);
        verify(expenseRepository, times(1)).save(newExpense);
    }

    @Test
    void shouldReturnAllExpenses() {
        List<Expense> expenses = List.of(expense);

        when(expenseRepository.findAll()).thenReturn(expenses);

        List<Expense> existedExpenses = expenseService.getAllExpenses();

        assertEquals(expenses.size(), existedExpenses.size());
        assertEquals(expenses.get(0).getId(), existedExpenses.get(0).getId());
        assertEquals(expenses.get(0).getTitle(), existedExpenses.get(0).getTitle());

        verify(expenseRepository, times(1)).findAll();
    }

    @Test
    void shouldReturnAllUserExpenses() {
        List<Expense> expectedExpenses = List.of(expense);

        when(userService.getUserById(1)).thenReturn(user);
        when(expenseRepository.findAllByUserId(1)).thenReturn(expectedExpenses);

        List<Expense> expenses = expenseService.getAllUserExpenses(user.getId());

        assertEquals(expectedExpenses.size(), expenses.size());
        assertEquals(expectedExpenses.get(0).getId(), expenses.get(0).getId());
        assertEquals(expectedExpenses.get(0).getTitle(), expenses.get(0).getTitle());
        assertEquals(expectedExpenses.get(0).getUser(), expenses.get(0).getUser());

        verify(userService, times(1)).getUserById(1);
        verify(expenseRepository, times(1)).findAllByUserId(1);
    }

    @Test
    void shouldDeleteExpenseById() {
        when(expenseRepository.findById(1)).thenReturn(Optional.of(expense));
        doNothing()
                .when(expenseRepository)
                .delete(expense);

        expenseService.deleteExpenseById(1);

        verify(expenseRepository, times(1)).findById(1);
        verify(expenseRepository, times(1)).delete(expense);
    }

    @Test
    void shouldReturnUserExpensesPage() {
        Expense expense1 = new Expense();
        expense1.setId(1);
        expense1.setTitle("expense1");
        expense1.setDate(LocalDateTime.of(2024, 5, 25, 19, 50));
        expense1.setPrice(150.0);
        expense1.setUser(user);

        Expense expense2 = new Expense();
        expense2.setId(2);
        expense2.setTitle("expense2");
        expense2.setDate(LocalDateTime.of(2022, 12, 13, 2, 30));
        expense2.setPrice(100.0);
        expense2.setUser(user);

        GlobalPage page = new GlobalPage();
        page.setPageNumber(0);
        page.setPageSize(5);
        page.setSortDirection(Sort.Direction.DESC);
        page.setSortBy("date");

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);

        Page<Expense> expectedPage = new PageImpl<>(List.of(expense1, expense2));

        when(userService.getUserById(1)).thenReturn(user);
        when(expenseRepository.findAllExpensesByUserIdAndYear(user.getId(), null, pageable))
                .thenReturn(expectedPage);

        Page<Expense> expensePage = expenseService.findAllExpensesByUserId(user.getId(), page, null);

        assertNotNull(expensePage);
        assertEquals(expectedPage.getTotalElements(), expensePage.getTotalElements());
        assertEquals(expectedPage.getTotalPages(), expectedPage.getTotalPages());
        assertEquals(expectedPage.getContent().get(0), expensePage.getContent().get(0));
        assertEquals(expectedPage.getContent().get(1), expensePage.getContent().get(1));

        verify(userService, times(1)).getUserById(1);
        verify(expenseRepository, times(1))
                .findAllExpensesByUserIdAndYear(1, null, pageable);
    }

    @Test
    void shouldReturnUserExpensesPageInSpecificYear() {
        Expense expense1 = new Expense();
        expense1.setId(1);
        expense1.setTitle("expense1");
        expense1.setDate(LocalDateTime.of(2024, 5, 25, 19, 50));
        expense1.setPrice(150.0);
        expense1.setUser(user);

        Expense expense2 = new Expense();
        expense2.setId(2);
        expense2.setTitle("expense2");
        expense2.setDate(LocalDateTime.of(2024, 12, 13, 2, 30));
        expense2.setPrice(100.0);
        expense2.setUser(user);

        GlobalPage page = new GlobalPage();
        page.setPageNumber(0);
        page.setPageSize(5);
        page.setSortDirection(Sort.Direction.DESC);
        page.setSortBy("date");

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);

        int year = 2024;

        Page<Expense> expectedPage = new PageImpl<>(List.of(expense1, expense2));

        when(userService.getUserById(1)).thenReturn(user);
        when(expenseRepository.findAllExpensesByUserIdAndYear(user.getId(), year, pageable))
                .thenReturn(expectedPage);

        Page<Expense> expensePage = expenseService.findAllExpensesByUserId(user.getId(), page, year);

        assertNotNull(expensePage);
        assertEquals(expectedPage.getTotalElements(), expensePage.getTotalElements());
        assertEquals(expectedPage.getTotalPages(), expectedPage.getTotalPages());
        assertEquals(year, expensePage.getContent().get(0).getDate().getYear());

        verify(userService, times(1)).getUserById(1);
        verify(expenseRepository, times(1))
                .findAllExpensesByUserIdAndYear(1, year, pageable);
    }

    @Test
    void shouldReturnUserExpensesPageInSpecificYearAndSortDirectionDESC() {
        Expense expense1 = new Expense();
        expense1.setId(1);
        expense1.setTitle("expense1");
        expense1.setDate(LocalDateTime.of(2024, 12, 25, 19, 50));
        expense1.setPrice(150.0);
        expense1.setUser(user);

        Expense expense2 = new Expense();
        expense2.setId(2);
        expense2.setTitle("expense2");
        expense2.setDate(LocalDateTime.of(2024, 5, 13, 2, 30));
        expense2.setPrice(100.0);
        expense2.setUser(user);

        GlobalPage page = new GlobalPage();
        page.setPageNumber(0);
        page.setPageSize(5);
        page.setSortDirection(Sort.Direction.DESC);
        page.setSortBy("date");

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);

        int year = 2024;

        Page<Expense> expectedPage = new PageImpl<>(List.of(expense1, expense2));

        when(userService.getUserById(1)).thenReturn(user);
        when(expenseRepository.findAllExpensesByUserIdAndYear(user.getId(), year, pageable))
                .thenReturn(expectedPage);

        Page<Expense> expensePage = expenseService.findAllExpensesByUserId(user.getId(), page, year);

        assertNotNull(expensePage);
        assertEquals(expectedPage.getTotalElements(), expensePage.getTotalElements());
        assertEquals(expectedPage.getTotalPages(), expectedPage.getTotalPages());
        assertEquals(Sort.Direction.DESC, page.getSortDirection());
        assertEquals(year, expensePage.getContent().get(0).getDate().getYear());
        assertTrue(expensePage.getContent().get(0).getDate().isAfter(expensePage.getContent().get(1).getDate()));

        verify(userService, times(1)).getUserById(1);
        verify(expenseRepository, times(1))
                .findAllExpensesByUserIdAndYear(1, year, pageable);
    }

    @Test
    void shouldReturnUserExpensesPageInSpecificYearAndSortDirectionASC() {
        Expense expense1 = new Expense();
        expense1.setId(1);
        expense1.setTitle("expense1");
        expense1.setDate(LocalDateTime.of(2024, 5, 25, 19, 50));
        expense1.setPrice(150.0);
        expense1.setUser(user);

        Expense expense2 = new Expense();
        expense2.setId(2);
        expense2.setTitle("expense2");
        expense2.setDate(LocalDateTime.of(2024, 12, 13, 2, 30));
        expense2.setPrice(100.0);
        expense2.setUser(user);

        GlobalPage page = new GlobalPage();
        page.setPageNumber(0);
        page.setPageSize(5);
        page.setSortDirection(Sort.Direction.ASC);
        page.setSortBy("date");

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);

        int year = 2024;

        Page<Expense> expectedPage = new PageImpl<>(List.of(expense1, expense2));

        when(userService.getUserById(1)).thenReturn(user);
        when(expenseRepository.findAllExpensesByUserIdAndYear(user.getId(), year, pageable))
                .thenReturn(expectedPage);

        Page<Expense> expensePage = expenseService.findAllExpensesByUserId(user.getId(), page, year);

        assertNotNull(expensePage);
        assertEquals(expectedPage.getTotalElements(), expensePage.getTotalElements());
        assertEquals(expectedPage.getTotalPages(), expectedPage.getTotalPages());
        assertEquals(Sort.Direction.ASC, page.getSortDirection());
        assertEquals(year, expensePage.getContent().get(0).getDate().getYear());
        assertTrue(expensePage.getContent().get(0).getDate().isBefore(expensePage.getContent().get(1).getDate()));

        verify(userService, times(1)).getUserById(1);
        verify(expenseRepository, times(1))
                .findAllExpensesByUserIdAndYear(1, year, pageable);
    }
}