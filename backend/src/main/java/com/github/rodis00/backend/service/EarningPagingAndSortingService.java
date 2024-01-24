package com.github.rodis00.backend.service;

import com.github.rodis00.backend.model.Earning;
import com.github.rodis00.backend.model.GlobalPage;
import com.github.rodis00.backend.repository.EarningPagingAndSortingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class EarningPagingAndSortingService implements EarningPagingAndSortingServiceInterface{
    private final EarningPagingAndSortingRepository repository;

    public EarningPagingAndSortingService(EarningPagingAndSortingRepository repository) {
        this.repository = repository;
    }

    @Override
    public Page<Earning> getEarningsByUserId(Integer userId, GlobalPage earningPage) {
        Sort sort = Sort.by(earningPage.getSortDirection(), earningPage.getSortBy());
        Pageable pageable = PageRequest.of(earningPage.getPageNumber(), earningPage.getPageSize(), sort);
        return repository.findByUserId(userId, pageable);
    }
}
