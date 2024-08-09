package com.github.rodis00.backend.expense;

import com.github.rodis00.backend.entity.ExpenseEntity;
import com.github.rodis00.backend.entity.UserEntity;
import com.github.rodis00.backend.exception.ExpenseNotFoundException;
import com.github.rodis00.backend.page.GlobalPage;
import com.github.rodis00.backend.user.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserService userService;

    public ExpenseService(
            ExpenseRepository expenseRepository,
            UserService userService
    ) {
        this.expenseRepository = expenseRepository;
        this.userService = userService;
    }

    public ExpenseEntity saveExpense(
            Expense expense,
            Long userId
    ) {
        UserEntity user = userService.getUserById(userId);

        return expenseRepository.save(
                ExpenseEntity.builder()
                        .title(expense.getTitle())
                        .date(expense.getDate())
                        .price(expense.getPrice())
                        .user(user)
                        .build()
        );
    }

    public ExpenseEntity getExpenseById(Long id) {
        return expenseRepository
                .findById(id)
                .orElseThrow(() -> new ExpenseNotFoundException("Expense not found."));
    }

    public ExpenseEntity updateExpense(
            Long id,
            Expense expense
    ) {
        ExpenseEntity actualExpense = getExpenseById(id);

        actualExpense.setTitle(expense.getTitle());
        actualExpense.setPrice(expense.getPrice());
        actualExpense.setDate(expense.getDate());
        expenseRepository.save(actualExpense);

        return actualExpense;
    }

    public List<ExpenseEntity> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public List<ExpenseEntity> getAllUserExpenses(Long userId) {
        UserEntity user = userService.getUserById(userId);
        return expenseRepository.findAllByUserId(user.getId());
    }

    public void deleteExpenseById(Long id) {
        ExpenseEntity expense = getExpenseById(id);
        expenseRepository.delete(expense);
    }

    public Page<ExpenseEntity> findAllExpensesByUserId(
            Long userId,
            GlobalPage page,
            Integer year
    ) {
        UserEntity user = userService.getUserById(userId);

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);

        return expenseRepository.findAllExpensesByUserIdAndYear(user.getId(), year, pageable);
    }

    public List<Integer> getYears() {
        return expenseRepository
                .findAll()
                .stream()
                .map(expense -> expense.getDate().getYear())
                .distinct()
                .sorted()
                .toList();
    }
}
