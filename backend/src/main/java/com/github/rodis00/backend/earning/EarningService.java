package com.github.rodis00.backend.earning;

import com.github.rodis00.backend.exception.EarningNotFoundException;
import com.github.rodis00.backend.page.GlobalPage;
import com.github.rodis00.backend.user.User;
import com.github.rodis00.backend.user.UserService;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class EarningService implements EarningServiceInterface {

    private final EarningRepository earningRepository;
    private final UserService userService;

    public EarningService(
            EarningRepository earningRepository,
            UserService userService
    ) {
        this.earningRepository = earningRepository;
        this.userService = userService;
    }

    @Override
    public Earning saveEarning(
            Earning earning,
            Integer userId
    ) {
        User user = userService.getUserById(userId);
        earning.setUser(user);
        earningRepository.save(earning);
        return earning;
    }

    @Override
    public Earning getEarningById(Integer id) {
        return earningRepository
                .findById(id)
                .orElseThrow(() -> new EarningNotFoundException("Earning not found."));
    }

    @Override
    public Earning updateEarning(
            Integer id,
            Earning earning
    ) {
        Earning actualEarning = getEarningById(id);

        actualEarning.setTitle(earning.getTitle());
        actualEarning.setAmount(earning.getAmount());
        actualEarning.setDate(earning.getDate());
        earningRepository.save(actualEarning);

        return actualEarning;
    }

    @Override
    public List<Earning> getAllEarnings() {
        return earningRepository.findAll();
    }

    @Override
    public List<Earning> getAllUserEarnings(Integer userId) {
        User user = userService.getUserById(userId);
        return earningRepository.findAllByUserId(user.getId());
    }

    @Override
    public void deleteEarningById(Integer id) {
        Earning earning = getEarningById(id);
        earningRepository.delete(earning);
    }

    @Override
    public Page<Earning> findAllEarningsByUserId(
            Integer userId,
            GlobalPage page,
            Integer year
    ) {
        User user = userService.getUserById(userId);

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);

        return earningRepository.findAllEarningsByUserIdAndYear(userId, year, pageable);
    }
}
