package com.github.rodis00.backend.income;

import com.github.rodis00.backend.entity.IncomeEntity;
import com.github.rodis00.backend.entity.UserEntity;
import com.github.rodis00.backend.exception.EntityNotFoundException;
import com.github.rodis00.backend.page.GlobalPage;
import com.github.rodis00.backend.user.UserService;
import com.github.rodis00.backend.utils.TitleFormatter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class IncomeService {

    private final IncomeRepository incomeRepository;
    private final UserService userService;
    private final IncomeSearchDao incomeSearchDao;

    public IncomeService(
            IncomeRepository incomeRepository,
            UserService userService,
            IncomeSearchDao incomeSearchDao
    ) {
        this.incomeRepository = incomeRepository;
        this.userService = userService;
        this.incomeSearchDao = incomeSearchDao;
    }

    public IncomeEntity saveIncome(
            Income income,
            String username
    ) {
        UserEntity user = userService.getUserByUsername(username);

        return incomeRepository.save(
                IncomeEntity.builder()
                        .title(TitleFormatter.capitalizeFirstLetter(income.getTitle()))
                        .amount(income.getAmount())
                        .date(income.getDate())
                        .user(user)
                        .description(income.getDescription())
                        .slug(generateSlug())
                        .category(income.getCategory())
                        .build()
        );
    }

    private String generateSlug() {
        return UUID.randomUUID().toString();
    }

    public IncomeEntity getIncomeBySlug(String slug) {
        return incomeRepository.findBySlug(slug)
                .orElseThrow(() -> new EntityNotFoundException("Income not found."));
    }

    public IncomeEntity updateIncome(
            String slug,
            Income income
    ) {
        IncomeEntity actualIncome = getIncomeBySlug(slug);

        actualIncome.setTitle(TitleFormatter.capitalizeFirstLetter(income.getTitle()));
        actualIncome.setAmount(income.getAmount());
        actualIncome.setDate(income.getDate());
        actualIncome.setDescription(income.getDescription());
        actualIncome.setCategory(income.getCategory());
        incomeRepository.save(actualIncome);

        return actualIncome;
    }

    public List<IncomeEntity> getAllIncomes() {
        return incomeRepository.findAll();
    }

    public List<IncomeEntity> getAllUserIncomes(
            String username,
            Integer year,
            Integer month
    ) {
        userService.checkIfUserExists(username);
        return incomeSearchDao.findAllByUsernameYearAndMonth(username, year, month);
    }

    public void deleteIncomeBySlug(String slug) {
        IncomeEntity income = getIncomeBySlug(slug);
        incomeRepository.delete(income);
    }

    public Page<IncomeEntity> findAllIncomesByUserId(
            String username,
            GlobalPage page,
            Integer year,
            Integer month
    ) {
        userService.checkIfUserExists(username);

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);

        return incomeRepository.findAllIncomesByUser_UsernameAndYear(username, year, month, pageable);
    }

    public List<Integer> getYears(String username) {
        List<Integer> years = new ArrayList<>(
                incomeRepository
                        .findAll()
                        .stream()
                        .filter(income -> income.getUser().getUsername().equals(username))
                        .map(income -> income.getDate().getYear())
                        .distinct()
                        .sorted()
                        .toList()
        );
        // return current year if there are no incomes
        if (years.isEmpty()) {
            years.add(LocalDate.now().getYear());
        }
        return years;
    }

    public IncomeDto getLastUserIncome(String username) {
        UserEntity user = userService.getUserByUsername(username);
        IncomeEntity income = incomeRepository.findLastAdded(user.getId());

        return Optional.ofNullable(income)
                .map(IncomeDto::from).orElse(null);
    }
}
