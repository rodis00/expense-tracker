package com.github.rodis00.backend.controller;

import com.github.rodis00.backend.dto.ExpenseDto;
import com.github.rodis00.backend.model.Expense;
import com.github.rodis00.backend.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("expense-tracker/api/v1/expenses")
public class ExpenseController {
    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping("")
    public ResponseEntity<List<ExpenseDto>> getExpenses() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(expenseService.getAllExpenses().stream()
                        .map(ExpenseDto::from)
                        .toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpenseDto> getExpense(@PathVariable Integer id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ExpenseDto.from(expenseService.getExpenseById(id)));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ExpenseDto>> getUserExpenses(@PathVariable Integer userId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(expenseService.getAllUserExpenses(userId).stream()
                        .map(ExpenseDto::from)
                        .toList());
    }

    @PostMapping("/add/{userId}")
    public ResponseEntity<ExpenseDto> addExpense(@RequestBody @Valid Expense expense, @PathVariable Integer userId) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ExpenseDto.from(expenseService.saveExpense(expense, userId)));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ExpenseDto> updateExpense(@PathVariable Integer id, @RequestBody @Valid Expense expense) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ExpenseDto.from(expenseService.updateExpense(id, expense)));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Integer id) {
        expenseService.deleteExpenseById(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
