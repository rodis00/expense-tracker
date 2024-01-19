package com.github.rodis00.backend.controller;

import com.github.rodis00.backend.model.Earning;
import com.github.rodis00.backend.service.EarningService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("expense-tracker/api/v1/earnings")
public class EarningController {
    private final EarningService earningService;

    public EarningController(EarningService earningService) {
        this.earningService = earningService;
    }

    @GetMapping("")
    public ResponseEntity<List<Earning>> getEarnings() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(earningService.getAllEarnings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Earning> getEarning(@PathVariable Integer id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(earningService.getEarningById(id));
    }

    @PostMapping("/add/{userId}")
    public ResponseEntity<Earning> addEarning(@RequestBody Earning earning, @PathVariable Integer userId) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(earningService.saveEarning(earning, userId));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Earning> updateEarning(@PathVariable Integer id, @RequestBody Earning earning) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(earningService.updateEarning(id, earning));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEarning(@PathVariable Integer id) {
        earningService.deleteEarningById(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
