package com.github.rodis00.backend.repository;

import com.github.rodis00.backend.model.Earning;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EarningRepository extends JpaRepository<Earning, Integer> {
    List<Earning> findAllByUserId(Integer userId);

    Page<Earning> findAllEarningsByUserId(Integer userId, Pageable pageable);
}
