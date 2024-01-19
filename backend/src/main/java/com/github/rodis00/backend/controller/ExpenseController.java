package com.github.rodis00.backend.controller;

import com.github.rodis00.backend.model.Expense;
import com.github.rodis00.backend.service.ExpenseService;
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
    public ResponseEntity<List<Expense>> getExpenses() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(expenseService.getAllExpenses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpense(@PathVariable Integer id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(expenseService.getExpenseById(id));
    }

    @PostMapping("/add/{userId}")
    public ResponseEntity<Expense> addExpense(@RequestBody Expense expense, @PathVariable Integer userId) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(expenseService.saveExpense(expense, userId));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Integer id, @RequestBody Expense expense) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(expenseService.updateExpense(id, expense));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Integer id) {
        expenseService.deleteExpenseById(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
