package com.github.rodis00.backend.controller;

import com.github.rodis00.backend.dto.ExpenseDto;
import com.github.rodis00.backend.model.Expense;
import com.github.rodis00.backend.model.GlobalPage;
import com.github.rodis00.backend.service.ExpenseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("expense-tracker/api/v1/expenses")
@Tag(name = "Expense")
public class ExpenseController {
    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @Operation(
            summary = "Get all expenses"
    )
    @GetMapping("")
    public ResponseEntity<List<ExpenseDto>> getExpenses() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(expenseService.getAllExpenses().stream()
                        .map(ExpenseDto::from)
                        .toList());
    }

    @Operation(
            summary = "Get expense by id"
    )
    @GetMapping("/{id}")
    public ResponseEntity<ExpenseDto> getExpense(@PathVariable Integer id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ExpenseDto.from(expenseService.getExpenseById(id)));
    }

    @Operation(
            summary = "Get expense by userId"
    )
    @GetMapping("/users/{userId}")
    public ResponseEntity<List<ExpenseDto>> getUserExpenses(@PathVariable Integer userId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(expenseService.getAllUserExpenses(userId).stream()
                        .map(ExpenseDto::from)
                        .toList());
    }

    @Operation(
            summary = "Get page of user expenses."
    )
    @GetMapping("/pages/users/{userId}")
    public ResponseEntity<Page<ExpenseDto>> getPageOfUserExpenses(
            @PathVariable Integer userId,
            @RequestParam(defaultValue = "0") @Min(0) Integer pageNumber,
            @RequestParam(defaultValue = "10") @Min(1) Integer pageSize,
            @RequestParam(defaultValue = "DESC") Sort.Direction sortDirection,
            @RequestParam(defaultValue = "date") String sortBy
            ) {
        GlobalPage expensePage = new GlobalPage();
        expensePage.setPageNumber(pageNumber);
        expensePage.setPageSize(pageSize);
        expensePage.setSortDirection(sortDirection);
        expensePage.setSortBy(sortBy);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(expenseService.findAllExpensesByUserId(userId, expensePage)
                    .map(ExpenseDto::from));
    }

    @Operation(
            summary = "Add new expense to the user"
    )
    @PostMapping("/add/{userId}")
    public ResponseEntity<ExpenseDto> addExpense(@RequestBody @Valid Expense expense, @PathVariable Integer userId) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ExpenseDto.from(expenseService.saveExpense(expense, userId)));
    }

    @Operation(
            summary = "Update expense by id"
    )
    @PutMapping("/update/{id}")
    public ResponseEntity<ExpenseDto> updateExpense(@PathVariable Integer id, @RequestBody @Valid Expense expense) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ExpenseDto.from(expenseService.updateExpense(id, expense)));
    }

    @Operation(
            summary = "Delete expense by id"
    )
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Integer id) {
        expenseService.deleteExpenseById(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
