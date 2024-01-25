package com.github.rodis00.backend.service;

import com.github.rodis00.backend.model.Expense;
import com.github.rodis00.backend.model.GlobalPage;
import org.springframework.data.domain.Page;

public interface ExpensePageServiceInterface {
    Page<Expense> getExpensesByUserId(Integer userId, GlobalPage expensePage);
}
