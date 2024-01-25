package com.github.rodis00.backend.controller;

import com.github.rodis00.backend.dto.ExpenseDto;
import com.github.rodis00.backend.model.GlobalPage;
import com.github.rodis00.backend.service.ExpensePagingAndSortingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("expense-tracker/api/v1/expenses")
@Tag(name = "Expense-Page-And-Sorting")
public class ExpensePagingAndSortingController {
    private final ExpensePagingAndSortingService expenseService;

    public ExpensePagingAndSortingController(ExpensePagingAndSortingService expenseService) {
        this.expenseService = expenseService;
    }

    @Operation(
            summary = "Get page of expenses by userId"
    )
    @GetMapping("/pages/user/{userId}")
    public ResponseEntity<Page<ExpenseDto>> getExpenses(@PathVariable Integer userId, GlobalPage expensePage) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(expenseService.getExpensesByUserId(userId, expensePage).map(ExpenseDto::from));
    }
}
