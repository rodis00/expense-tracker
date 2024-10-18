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
import java.util.UUID;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserService userService;
    private final ExpenseSearchDao expenseSearchDao;

    public ExpenseService(
            ExpenseRepository expenseRepository,
            UserService userService,
            ExpenseSearchDao expenseSearchDao
    ) {
        this.expenseRepository = expenseRepository;
        this.userService = userService;
        this.expenseSearchDao = expenseSearchDao;
    }

    public ExpenseEntity saveExpense(
            Expense expense,
            String username
    ) {
        UserEntity user = userService.getUserByUsername(username);

        return expenseRepository.save(
                ExpenseEntity.builder()
                        .title(expense.getTitle())
                        .date(expense.getDate())
                        .price(expense.getPrice())
                        .user(user)
                        .description(expense.getDescription())
                        .slug(generateSlug())
                        .build()
        );
    }

    private String generateSlug() {
        return UUID.randomUUID().toString();
    }

    public ExpenseEntity getExpenseBySlug(String slug) {
        return expenseRepository
                .findBySlug(slug)
                .orElseThrow(() -> new ExpenseNotFoundException("Expense not found."));
    }

    public ExpenseEntity updateExpense(
            String slug,
            Expense expense
    ) {
        ExpenseEntity actualExpense = getExpenseBySlug(slug);

        actualExpense.setTitle(expense.getTitle());
        actualExpense.setPrice(expense.getPrice());
        actualExpense.setDate(expense.getDate());
        actualExpense.setDescription(expense.getDescription());
        expenseRepository.save(actualExpense);

        return actualExpense;
    }

    public List<ExpenseEntity> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public List<ExpenseEntity> getAllUserExpenses(
            String username,
            Integer year,
            Integer month
    ) {
        userService.checkIfUserExists(username);
        return expenseSearchDao.findAllByUsernameYearAndMonth(username, year, month);
    }

    public void deleteExpenseBySlug(String slug) {
        ExpenseEntity expense = getExpenseBySlug(slug);
        expenseRepository.delete(expense);
    }

    public Page<ExpenseEntity> findAllExpensesByUsername(
            String username,
            GlobalPage page,
            Integer year,
            Integer month
    ) {
        userService.checkIfUserExists(username);

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);

        return expenseRepository.findAllExpensesByUser_UsernameAndYear(username, year, month, pageable);
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
