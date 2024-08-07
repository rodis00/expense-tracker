package com.github.rodis00.backend.earning;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EarningRepository extends JpaRepository<Earning, Integer> {
    List<Earning> findAllByUserId(Integer userId);

    Page<Earning> findAllEarningsByUserId(Integer userId, Pageable pageable);

    @Query("select e from Earning e where e.user.id = :userId and (:year is null or function('year', e.date) = :year)")
    Page<Earning> findAllEarningsByUserIdAndYear(Integer userId, Integer year, Pageable pageable);
}
