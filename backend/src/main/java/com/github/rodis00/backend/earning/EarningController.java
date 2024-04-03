package com.github.rodis00.backend.earning;

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
@RequestMapping("expense-tracker/api/v1/earnings")
@Tag(name = "Earning")
public class EarningController {
    private final EarningService earningService;

    public EarningController(EarningService earningService) {
        this.earningService = earningService;
    }

    @Operation(
            summary = "Get all earnings"
    )
    @GetMapping("/")
    public ResponseEntity<List<EarningDto>> getEarnings() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(earningService
                        .getAllEarnings()
                        .stream()
                        .map(EarningDto::from)
                        .toList());
    }

    @Operation(
            summary = "Get earning by id"
    )
    @GetMapping("/{id}")
    public ResponseEntity<EarningDto> getEarning(@PathVariable Integer id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(EarningDto.from(earningService.getEarningById(id)));
    }

    @Operation(
            summary = "Get earning by userId"
    )
    @GetMapping("/users/{userId}")
    public ResponseEntity<List<EarningDto>> getUserEarnings(@PathVariable Integer userId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(earningService
                        .getAllUserEarnings(userId)
                        .stream()
                        .map(EarningDto::from)
                        .toList());
    }

    @Operation(
            summary = "Get page of user earnings"
    )
    @GetMapping("/pages/users/{userId}")
    public ResponseEntity<Page<EarningDto>> getPageOfUserEarnings(
            @PathVariable Integer userId,
            @RequestParam(defaultValue = "0") @Min(0) Integer pageNumber,
            @RequestParam(defaultValue = "10") @Min(1) Integer pageSize,
            @RequestParam(defaultValue = "DESC") Sort.Direction sortDirection,
            @RequestParam(defaultValue = "date") String sortBy
    ) {
        GlobalPage earningsPage = new GlobalPage();
        earningsPage.setPageNumber(pageNumber);
        earningsPage.setPageSize(pageSize);
        earningsPage.setSortDirection(sortDirection);
        earningsPage.setSortBy(sortBy);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(earningService
                        .findAllEarningsByUserId(userId, earningsPage)
                        .map(EarningDto::from));
    }

    @Operation(
            summary = "Add new earning to the user"
    )
    @PostMapping("/users/{userId}")
    public ResponseEntity<EarningDto> addEarning(
            @RequestBody @Valid Earning earning,
            @PathVariable Integer userId
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(EarningDto.from(earningService.saveEarning(earning, userId)));
    }

    @Operation(
            summary = "Update earning by id"
    )
    @PutMapping("/{id}")
    public ResponseEntity<EarningDto> updateEarning(
            @PathVariable Integer id,
            @RequestBody @Valid Earning earning
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(EarningDto.from(earningService.updateEarning(id, earning)));
    }

    @Operation(
            summary = "Delete earning by id"
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEarning(@PathVariable Integer id) {
        earningService.deleteEarningById(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
