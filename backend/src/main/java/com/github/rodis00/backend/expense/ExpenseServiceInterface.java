package com.github.rodis00.backend.expense;

import com.github.rodis00.backend.page.GlobalPage;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ExpenseServiceInterface {
    Expense saveExpense(Expense expense, Integer userId);
    Expense getExpenseById(Integer id);
    Expense updateExpense(Integer id, Expense expense);
    List<Expense> getAllExpenses();
    List<Expense> getAllUserExpenses(Integer userId);
    void deleteExpenseById(Integer id);
    Page<Expense> findAllExpensesByUserId(Integer userId, GlobalPage page, Integer year);
}
