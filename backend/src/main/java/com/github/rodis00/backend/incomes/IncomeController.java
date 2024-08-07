package com.github.rodis00.backend.incomes;

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
@RequestMapping("expense-tracker/api/v1/incomes")
@Tag(name = "Income")
public class IncomeController {

    private final IncomeService incomeService;

    public IncomeController(IncomeService incomeService) {
        this.incomeService = incomeService;
    }

    @Operation(
            summary = "Get all incomes"
    )
    @GetMapping("/")
    public ResponseEntity<List<IncomeDto>> getIncomes() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(incomeService
                        .getAllIncomes()
                        .stream()
                        .map(IncomeDto::from)
                        .toList());
    }

    @Operation(
            summary = "Get income by id"
    )
    @GetMapping("/{id}")
    public ResponseEntity<IncomeDto> getIncome(
            @PathVariable Long id
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(IncomeDto.from(incomeService.getIncomeById(id)));
    }

    @Operation(
            summary = "Get income by userId"
    )
    @GetMapping("/users/{userId}")
    public ResponseEntity<List<IncomeDto>> getUserIncomes(
            @PathVariable Long userId
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(incomeService
                        .getAllUserIncomes(userId)
                        .stream()
                        .map(IncomeDto::from)
                        .toList());
    }

    @Operation(
            summary = "Get page of user incomes"
    )
    @GetMapping("/pages/users/{userId}")
    public ResponseEntity<Page<IncomeDto>> getPageOfUserIncomes(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") @Min(0) Integer pageNumber,
            @RequestParam(defaultValue = "10") @Min(1) Integer pageSize,
            @RequestParam(defaultValue = "DESC") Sort.Direction sortDirection,
            @RequestParam(defaultValue = "date") String sortBy,
            @RequestParam(defaultValue = "") Integer year
    ) {
        GlobalPage incomesPage = new GlobalPage();
        incomesPage.setPageNumber(pageNumber);
        incomesPage.setPageSize(pageSize);
        incomesPage.setSortDirection(sortDirection);
        incomesPage.setSortBy(sortBy);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(incomeService
                        .findAllIncomesByUserId(userId, incomesPage, year)
                        .map(IncomeDto::from));
    }

    @Operation(
            summary = "Add new income to the user"
    )
    @PostMapping("/users/{userId}")
    public ResponseEntity<IncomeDto> addIncome(
            @RequestBody @Valid Income income,
            @PathVariable Long userId
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(IncomeDto.from(incomeService.saveIncome(income, userId)));
    }

    @Operation(
            summary = "Update income by id"
    )
    @PutMapping("/{id}")
    public ResponseEntity<IncomeDto> updateIncome(
            @PathVariable Long id,
            @RequestBody @Valid Income income
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(IncomeDto.from(incomeService.updateIncome(id, income)));
    }

    @Operation(
            summary = "Delete income by id"
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable Long id) {
        incomeService.deleteIncomeById(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
