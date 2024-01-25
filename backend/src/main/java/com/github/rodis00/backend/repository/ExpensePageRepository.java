package com.github.rodis00.backend.repository;

import com.github.rodis00.backend.model.Expense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ExpensePageRepository extends PagingAndSortingRepository<Expense, Integer> {
    Page<Expense> findByUserId(Integer userId, Pageable pageable);
}
