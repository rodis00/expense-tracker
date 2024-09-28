package com.github.rodis00.backend.income;

import com.github.rodis00.backend.entity.IncomeEntity;
import com.github.rodis00.backend.entity.UserEntity;
import com.github.rodis00.backend.exception.IncomeNotFoundException;
import com.github.rodis00.backend.page.GlobalPage;
import com.github.rodis00.backend.user.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncomeService {

    private final IncomeRepository incomeRepository;
    private final UserService userService;

    public IncomeService(
            IncomeRepository incomeRepository,
            UserService userService
    ) {
        this.incomeRepository = incomeRepository;
        this.userService = userService;
    }

    public IncomeEntity saveIncome(
            Income income,
            Long userId
    ) {
        UserEntity user = userService.getUserById(userId);

        return incomeRepository.save(
                IncomeEntity.builder()
                        .title(income.getTitle())
                        .amount(income.getAmount())
                        .date(income.getDate())
                        .user(user)
                        .description(income.getDescription())
                        .build()
        );
    }

    public IncomeEntity getIncomeById(Long id) {
        return incomeRepository.findById(id)
                .orElseThrow(() -> new IncomeNotFoundException("Income not found."));
    }

    public IncomeEntity updateIncome(
            Long id,
            Income income
    ) {
        IncomeEntity actualIncome = getIncomeById(id);

        actualIncome.setTitle(income.getTitle());
        actualIncome.setAmount(income.getAmount());
        actualIncome.setDate(income.getDate());
        incomeRepository.save(actualIncome);

        return actualIncome;
    }

    public List<IncomeEntity> getAllIncomes() {
        return incomeRepository.findAll();
    }

    public List<IncomeEntity> getAllUserIncomes(Long userId) {
        UserEntity user = userService.getUserById(userId);
        return incomeRepository.findAllByUserId(user.getId());
    }

    public void deleteIncomeById(Long id) {
        IncomeEntity income = getIncomeById(id);
        incomeRepository.delete(income);
    }

    public Page<IncomeEntity> findAllIncomesByUserId(
            Long userId,
            GlobalPage page,
            Integer year
    ) {
        UserEntity user = userService.getUserById(userId);

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);

        return incomeRepository.findAllIncomesByUserIdAndYear(user.getId(), year, pageable);
    }

    public List<Integer> getYears() {
        return incomeRepository
                .findAll()
                .stream()
                .map(income -> income.getDate().getYear())
                .distinct()
                .sorted()
                .toList();
    }
}
