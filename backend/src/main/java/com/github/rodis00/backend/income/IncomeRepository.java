package com.github.rodis00.backend.income;

import com.github.rodis00.backend.entity.IncomeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IncomeRepository extends JpaRepository<IncomeEntity, Long> {

    @Query("select e from IncomeEntity e " +
            "where e.user.username = :username " +
            "and (:year is null or extract(year from e.date) = :year) "
    )
    Page<IncomeEntity> findAllIncomesByUser_UsernameAndYear(String username, Integer year, Pageable pageable);

    Optional<IncomeEntity> findBySlug(String slug);
}
