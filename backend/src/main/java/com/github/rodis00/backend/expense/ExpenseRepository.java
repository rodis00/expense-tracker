package com.github.rodis00.backend.expense;

import com.github.rodis00.backend.entity.ExpenseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<ExpenseEntity, Long> {
    List<ExpenseEntity> findAllByUserId(Long userId);

    Page<ExpenseEntity> findAllExpensesByUserId(Long userId, Pageable pageable);

    @Query("select e from ExpenseEntity e " +
            "where e.user.id = :userId " +
            "and (:year is null or extract(year from e.date) = :year) "
    )
    Page<ExpenseEntity> findAllExpensesByUserIdAndYear(Long userId, Integer year, Pageable pageable);
}
