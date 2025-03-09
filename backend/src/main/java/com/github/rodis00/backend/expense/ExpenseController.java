package com.github.rodis00.backend.expense;

import com.github.rodis00.backend.page.GlobalPage;
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
            summary = "Retrieve a list of expenses"
    )
    @GetMapping("/")
    public ResponseEntity<List<ExpenseDto>> getExpenses() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(expenseService
                        .getAllExpenses()
                        .stream()
                        .map(ExpenseDto::from)
                        .toList());
    }

    @Operation(
            summary = "Retrieve a single expense by its unique slug field"
    )
    @GetMapping("/{slug}")
    public ResponseEntity<ExpenseDto> getExpense(
            @PathVariable String slug
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ExpenseDto.from(expenseService.getExpenseBySlug(slug)));
    }

    @Operation(
            summary = "Retrieve a list of user expenses by username and optional year and month"
    )
    @GetMapping("/users/{username}")
    public ResponseEntity<List<ExpenseDto>> getUserExpenses(
            @PathVariable String username,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(expenseService
                        .getAllUserExpenses(username, year, month)
                        .stream()
                        .map(ExpenseDto::from)
                        .toList());
    }

    @Operation(
            summary = "Retrieve a list of user expenses with pagination and sorting"
    )
    @GetMapping("/pages/users/{username}")
    public ResponseEntity<Page<ExpenseDto>> getPageOfUserExpenses(
            @PathVariable String username,
            @RequestParam(defaultValue = "0") @Min(0) Integer pageNumber,
            @RequestParam(defaultValue = "10") @Min(1) Integer pageSize,
            @RequestParam(defaultValue = "DESC") Sort.Direction sortDirection,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month
    ) {
        GlobalPage expensePage = new GlobalPage();
        expensePage.setPageNumber(pageNumber);
        expensePage.setPageSize(pageSize);
        expensePage.setSortDirection(sortDirection);
        expensePage.setSortBy(sortBy);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(expenseService
                        .findAllExpensesByUsername(username, expensePage, year, month)
                        .map(ExpenseDto::from));
    }

    @Operation(
            summary = "Create a new expense"
    )
    @PostMapping("/users/{username}")
    public ResponseEntity<ExpenseDto> addExpense(
            @RequestBody @Valid Expense expense,
            @PathVariable String username
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ExpenseDto.from(expenseService.saveExpense(expense, username)));
    }

    @Operation(
            summary = "Update existing expense by its unique slug field"
    )
    @PutMapping("/{slug}")
    public ResponseEntity<ExpenseDto> updateExpense(
            @PathVariable String slug,
            @RequestBody @Valid Expense expense
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ExpenseDto.from(expenseService.updateExpense(slug, expense)));
    }

    @Operation(
            summary = "Delete expense by unique slug field"
    )
    @DeleteMapping("/{slug}")
    public ResponseEntity<Void> deleteExpense(
            @PathVariable String slug
    ) {
        expenseService.deleteExpenseBySlug(slug);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @Operation(
            summary = "Retrieve a list of expense years"
    )
    @GetMapping("/users/{username}/years")
    public ResponseEntity<List<Integer>> getYears(
            @PathVariable String username,
            @RequestParam(required = false) boolean yearLimit
    ) {
        return ResponseEntity.ok(expenseService.getYears(username, yearLimit));
    }

    @Operation(
            summary = "Retrieve a single user's last added expense."
    )
    @GetMapping("/users/{username}/last-added")
    public ResponseEntity<ExpenseDto> getLastUserExpense(
            @PathVariable String username
    ) {
        return ResponseEntity.ok(expenseService.getLastUserExpense(username));
    }
}
