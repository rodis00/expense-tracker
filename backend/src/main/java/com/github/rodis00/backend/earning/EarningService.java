package com.github.rodis00.backend.earning;

import com.github.rodis00.backend.exception.EarningNotFoundException;
import com.github.rodis00.backend.page.GlobalPage;
import com.github.rodis00.backend.user.User;
import com.github.rodis00.backend.user.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EarningService {

    private final EarningRepository earningRepository;
    private final UserService userService;

    public EarningService(
            EarningRepository earningRepository,
            UserService userService
    ) {
        this.earningRepository = earningRepository;
        this.userService = userService;
    }

    public Earning saveEarning(
            Earning earning,
            Integer userId
    ) {
        User user = userService.getUserById(userId);
        earning.setUser(user);
        earningRepository.save(earning);
        return earning;
    }

    public Earning getEarningById(Integer id) {
        return earningRepository.findById(id)
                .orElseThrow(() -> new EarningNotFoundException("Earning not found."));
    }

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

    public List<Earning> getAllEarnings() {
        return earningRepository.findAll();
    }

    public List<Earning> getAllUserEarnings(Integer userId) {
        User user = userService.getUserById(userId);
        return earningRepository.findAllByUserId(user.getId());
    }

    public void deleteEarningById(Integer id) {
        Earning earning = getEarningById(id);
        earningRepository.delete(earning);
    }

    public Page<Earning> findAllEarningsByUserId(
            Integer userId,
            GlobalPage page,
            Integer year
    ) {
        User user = userService.getUserById(userId);

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);

        return earningRepository.findAllEarningsByUserIdAndYear(user.getId(), year, pageable);
    }
}
