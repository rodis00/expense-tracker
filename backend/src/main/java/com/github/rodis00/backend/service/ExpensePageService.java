package com.github.rodis00.backend.service;

import com.github.rodis00.backend.model.Expense;
import com.github.rodis00.backend.model.GlobalPage;
import com.github.rodis00.backend.repository.ExpensePageRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ExpensePageService implements ExpensePageServiceInterface {
    private final ExpensePageRepository repository;

    public ExpensePageService(ExpensePageRepository repository) {
        this.repository = repository;
    }

    @Override
    public Page<Expense> getExpensesByUserId(Integer userId, GlobalPage expensePage) {
        Sort sort = Sort.by(expensePage.getSortDirection(), expensePage.getSortBy());
        Pageable pageable = PageRequest.of(expensePage.getPageNumber(), expensePage.getPageSize(), sort);
        return repository.findByUserId(userId, pageable);
    }
}
