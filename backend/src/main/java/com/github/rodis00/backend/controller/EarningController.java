package com.github.rodis00.backend.controller;

import com.github.rodis00.backend.dto.EarningDto;
import com.github.rodis00.backend.model.Earning;
import com.github.rodis00.backend.service.EarningService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
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

    @GetMapping("")
    public ResponseEntity<List<EarningDto>> getEarnings() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(earningService.getAllEarnings().stream()
                        .map(EarningDto::from).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EarningDto> getEarning(@PathVariable Integer id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(EarningDto.from(earningService.getEarningById(id)));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<EarningDto>> getUserEarnings(@PathVariable Integer userId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(earningService.getAllUserEarnings(userId).stream()
                        .map(EarningDto::from)
                        .toList());
    }

    @PostMapping("/add/{userId}")
    public ResponseEntity<EarningDto> addEarning(@RequestBody @Valid Earning earning, @PathVariable Integer userId) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(EarningDto.from(earningService.saveEarning(earning, userId)));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<EarningDto> updateEarning(@PathVariable Integer id, @RequestBody @Valid Earning earning) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(EarningDto.from(earningService.updateEarning(id, earning)));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEarning(@PathVariable Integer id) {
        earningService.deleteEarningById(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
