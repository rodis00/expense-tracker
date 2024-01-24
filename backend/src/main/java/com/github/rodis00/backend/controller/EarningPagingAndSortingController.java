package com.github.rodis00.backend.controller;

import com.github.rodis00.backend.dto.EarningDto;
import com.github.rodis00.backend.model.GlobalPage;
import com.github.rodis00.backend.service.EarningPagingAndSortingService;
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
@RequestMapping("expense-tracker/api/v1/earnings")
@Tag(name = "Earning-Page-And-Sorting")
public class EarningPagingAndSortingController {
    private final EarningPagingAndSortingService earningService;

    public EarningPagingAndSortingController(EarningPagingAndSortingService earningService) {
        this.earningService = earningService;
    }

    @Operation(
            summary = "Get page of earnings by userId"
    )
    @GetMapping("/pages/user/{userId}")
    public ResponseEntity<Page<EarningDto>> getEarnings(@PathVariable Integer userId, GlobalPage earningPage) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(earningService.getEarningsByUserId(userId, earningPage).map(EarningDto::from));
    }
}
