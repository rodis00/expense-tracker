package com.github.rodis00.backend.controller;

import com.github.rodis00.backend.dto.ExpenseDto;
import com.github.rodis00.backend.model.GlobalPage;
import com.github.rodis00.backend.service.ExpensePagingAndSortingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Min;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("expense-tracker/api/v1/expenses")
@Tag(name = "Expense Page")
public class ExpensePagingAndSortingController {
    private final ExpensePagingAndSortingService expenseService;

    public ExpensePagingAndSortingController(ExpensePagingAndSortingService expenseService) {
        this.expenseService = expenseService;
    }

    @Operation(
            summary = "Get page of expenses by userId"
    )
    @GetMapping("/pages/users/{userId}")
    public ResponseEntity<Page<ExpenseDto>> getExpenses(
            @PathVariable Integer userId,
            @RequestParam(defaultValue = "0") @Min(0) Integer pageNumber,
            @RequestParam(defaultValue = "10") @Min(1) Integer pageSize,
            @RequestParam(defaultValue = "DESC") Sort.Direction sortDirection,
            @RequestParam(defaultValue = "date") String sortBy) {
        GlobalPage expensePage = new GlobalPage();
            expensePage.setPageNumber(pageNumber);
            expensePage.setPageSize(pageSize);
            expensePage.setSortDirection(sortDirection);
            expensePage.setSortBy(sortBy);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(expenseService.getExpensesByUserId(userId, expensePage)
                        .map(ExpenseDto::from));
    }
}
