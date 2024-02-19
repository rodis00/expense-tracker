package com.github.rodis00.backend.expense;

import com.github.rodis00.backend.exception.ExpenseNotFoundException;
import com.github.rodis00.backend.page.GlobalPage;
import com.github.rodis00.backend.user.User;
import com.github.rodis00.backend.user.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService implements ExpenseServiceInterface {

    private final ExpenseRepository expenseRepository;
    private final UserService userService;

    public ExpenseService(
            ExpenseRepository expenseRepository,
            UserService userService
    ) {
        this.expenseRepository = expenseRepository;
        this.userService = userService;
    }

    @Override
    public Expense saveExpense(
            Expense expense,
            Integer userId
    ) {
        User user = userService.getUserById(userId);
        expense.setUser(user);
        expenseRepository.save(expense);
        return expense;
    }

    @Override
    public Expense getExpenseById(Integer id) {
        return expenseRepository
                .findById(id)
                .orElseThrow(() -> new ExpenseNotFoundException("Expense not found."));
    }

    @Override
    public Expense updateExpense(
            Integer id,
            Expense expense
    ) {
        Expense actualExpense = getExpenseById(id);

        actualExpense.setTitle(expense.getTitle());
        actualExpense.setPrice(expense.getPrice());
        actualExpense.setDate(expense.getDate());
        expenseRepository.save(actualExpense);

        return actualExpense;
    }

    @Override
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @Override
    public List<Expense> getAllUserExpenses(Integer userId) {
        User user = userService.getUserById(userId);
        return expenseRepository.findAllByUserId(user.getId());
    }

    @Override
    public void deleteExpenseById(Integer id) {
        Expense expense = getExpenseById(id);
        expenseRepository.delete(expense);
    }

    @Override
    public Page<Expense> findAllExpensesByUserId(
            Integer userId,
            GlobalPage page
    ) {
        User user = userService.getUserById(userId);

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
        return expenseRepository.findAllExpensesByUserId(userId, pageable);
    }
}
