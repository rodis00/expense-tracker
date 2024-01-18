package com.github.rodis00.backend.repository;

import com.github.rodis00.backend.model.Earning;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EarningRepository extends JpaRepository<Earning, Integer> {
}
