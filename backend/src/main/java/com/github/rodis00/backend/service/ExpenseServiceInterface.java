package com.github.rodis00.backend.service;

import com.github.rodis00.backend.model.Expense;

import java.util.List;

public interface ExpenseServiceInterface {
    Expense saveExpense(Expense expense);
    Expense getExpenseById(Integer id);
    Expense updateExpense(Integer id, Expense expense);
    List<Expense> getAllExpenses();
    void deleteExpenseById(Integer id);
}
