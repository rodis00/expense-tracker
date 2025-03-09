package com.github.rodis00.backend.expense;

import com.github.rodis00.backend.entity.ExpenseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExpenseRepository extends JpaRepository<ExpenseEntity, Long> {

    @Query("select e from ExpenseEntity e " +
            "where e.user.username = :username " +
            "and (:year is null or extract(year from e.date) = :year) " +
            "and (:month is null or extract(month from e.date) = :month) "
    )
    Page<ExpenseEntity> findAllExpensesByUser_UsernameAndYear(
            String username,
            Integer year,
            Integer month,
            Pageable pageable
    );

    Optional<ExpenseEntity> findBySlug(String slug);

    @Query(value = "select * from expense_tracker.expense " +
            "where user_id = :userId " +
            "order by created_at desc " +
            "limit 1",
            nativeQuery = true
    )
    ExpenseEntity findLastAdded(Long userId);
}
