package com.github.rodis00.backend.service;

import com.github.rodis00.backend.exception.ExpenseNotFoundException;
import com.github.rodis00.backend.model.Expense;
import com.github.rodis00.backend.model.User;
import com.github.rodis00.backend.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService implements ExpenseServiceInterface{

    private final ExpenseRepository expenseRepository;
    private final UserService userService;

    public ExpenseService(ExpenseRepository expenseRepository, UserService userService) {
        this.expenseRepository = expenseRepository;
        this.userService = userService;
    }

    @Override
    public Expense saveExpense(Expense expense, Integer userId) {
        User user = userService.getUserById(userId);
        user.addExpense(expense);
        userService.saveUser(user);
        return expense;
    }

    @Override
    public Expense getExpenseById(Integer id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new ExpenseNotFoundException("Expense not found."));
    }

    @Override
    public Expense updateExpense(Integer id, Expense expense) {
        Expense actualExpense = getExpenseById(id);

        actualExpense.setTitle(expense.getTitle());
        actualExpense.setPrice(expense.getPrice());
        actualExpense.setDate(expense.getDate());
        actualExpense.setUser(expense.getUser());
        expenseRepository.save(actualExpense);

        return actualExpense;
    }

    @Override
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @Override
    public void deleteExpenseById(Integer id) {
        Expense expense = getExpenseById(id);
        expenseRepository.delete(expense);
    }
}
