package com.github.rodis00.backend.income;

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
            summary = "Retrieve a list of all incomes"
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
            summary = "Retrieve a single income by its unique slug field"
    )
    @GetMapping("/{slug}")
    public ResponseEntity<IncomeDto> getIncome(
            @PathVariable String slug
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(IncomeDto.from(incomeService.getIncomeBySlug(slug)));
    }

    @Operation(
            summary = "Retrieve a list of user incomes by username and optional year and month"
    )
    @GetMapping("/users/{username}")
    public ResponseEntity<List<IncomeDto>> getUserIncomes(
            @PathVariable String username,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(incomeService
                        .getAllUserIncomes(username, year, month)
                        .stream()
                        .map(IncomeDto::from)
                        .toList());
    }

    @Operation(
            summary = "Retrieve a list of user incomes with pagination and sorting by username"
    )
    @GetMapping("/pages/users/{username}")
    public ResponseEntity<Page<IncomeDto>> getPageOfUserIncomes(
            @PathVariable String username,
            @RequestParam(defaultValue = "0") @Min(0) Integer pageNumber,
            @RequestParam(defaultValue = "10") @Min(1) Integer pageSize,
            @RequestParam(defaultValue = "DESC") Sort.Direction sortDirection,
            @RequestParam(defaultValue = "date") String sortBy,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month
    ) {
        GlobalPage incomesPage = new GlobalPage();
        incomesPage.setPageNumber(pageNumber);
        incomesPage.setPageSize(pageSize);
        incomesPage.setSortDirection(sortDirection);
        incomesPage.setSortBy(sortBy);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(incomeService
                        .findAllIncomesByUserId(username, incomesPage, year, month)
                        .map(IncomeDto::from));
    }

    @Operation(
            summary = "Create a new income"
    )
    @PostMapping("/users/{username}")
    public ResponseEntity<IncomeDto> addIncome(
            @RequestBody @Valid Income income,
            @PathVariable String username
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(IncomeDto.from(incomeService.saveIncome(income, username)));
    }

    @Operation(
            summary = "Update existing income by its unique slug field"
    )
    @PutMapping("/{slug}")
    public ResponseEntity<IncomeDto> updateIncome(
            @PathVariable String slug,
            @RequestBody @Valid Income income
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(IncomeDto.from(incomeService.updateIncome(slug, income)));
    }

    @Operation(
            summary = "Delete income by its unique slug field"
    )
    @DeleteMapping("/{slug}")
    public ResponseEntity<Void> deleteIncome(@PathVariable String slug) {
        incomeService.deleteIncomeBySlug(slug);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @Operation(
            summary = "Retrieve a list of income years"
    )
    @GetMapping("/years")
    public ResponseEntity<List<Integer>> getYears() {
        return ResponseEntity.ok(incomeService.getYears());
    }
}
