package com.github.rodis00.backend.controller;

import com.github.rodis00.backend.dto.EarningDto;
import com.github.rodis00.backend.model.GlobalPage;
import com.github.rodis00.backend.service.EarningPageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Min;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("expense-tracker/api/v1/earnings")
@Tag(name = "Earning Page")
public class EarningPageController {
    private final EarningPageService earningPageService;

    public EarningPageController(EarningPageService earningPageService) {
        this.earningPageService = earningPageService;
    }

    @Operation(
            summary = "Get page of earnings by userId"
    )
    @GetMapping("/pages/users/{userId}")
    public ResponseEntity<Page<EarningDto>> getEarnings(
            @PathVariable Integer userId,
            @RequestParam(defaultValue = "0") @Min(0) Integer pageNumber,
            @RequestParam(defaultValue = "10") @Min(1) Integer pageSize,
            @RequestParam(defaultValue = "DESC") Sort.Direction sortDirection,
            @RequestParam(defaultValue = "date") String sortBy) {
        GlobalPage earningPage = new GlobalPage();
        earningPage.setPageNumber(pageNumber);
        earningPage.setPageSize(pageSize);
        earningPage.setSortDirection(sortDirection);
        earningPage.setSortBy(sortBy);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(earningPageService.getEarningsByUserId(userId, earningPage)
                        .map(EarningDto::from));
    }
}
