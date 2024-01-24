package com.github.rodis00.backend.repository;

import com.github.rodis00.backend.model.Earning;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface EarningPagingAndSortingRepository extends PagingAndSortingRepository<Earning, Integer> {
    Page<Earning> findByUserId(Integer userId, Pageable pageable);
}
