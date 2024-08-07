package com.github.rodis00.backend.incomes;

import com.github.rodis00.backend.entity.IncomeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<IncomeEntity, Long> {
    List<IncomeEntity> findAllByUserId(Long userId);

    Page<IncomeEntity> findAllIncomesByUserId(Long userId, Pageable pageable);

    @Query("select e from IncomeEntity e " +
            "where e.user.id = :userId " +
            "and (:year is null or extract(year from e.date) = :year) "
    )
    Page<IncomeEntity> findAllIncomesByUserIdAndYear(Long userId, Integer year, Pageable pageable);
}
