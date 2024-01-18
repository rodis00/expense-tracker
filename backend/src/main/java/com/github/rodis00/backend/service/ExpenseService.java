package com.github.rodis00.backend.service;

import com.github.rodis00.backend.exception.ExpenseNotFoundException;
import com.github.rodis00.backend.model.Expense;
import com.github.rodis00.backend.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService implements ExpenseServiceInterface{

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    @Override
    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
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
