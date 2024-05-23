package com.github.rodis00.backend.expense;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    List<Expense> findAllByUserId(Integer userId);

    Page<Expense> findAllExpensesByUserId(Integer userId, Pageable pageable);

    @Query("select e from Expense e where e.user.id = :userId and (:year is null or function('year', e.date) = :year)")
    Page<Expense> findAllExpensesByUserIdAndYear(Integer userId, Integer year, Pageable pageable);
}
