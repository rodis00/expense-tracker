package com.github.rodis00.backend.service;

import com.github.rodis00.backend.exception.EarningNotFoundException;
import com.github.rodis00.backend.model.Earning;
import com.github.rodis00.backend.model.User;
import com.github.rodis00.backend.repository.EarningRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EarningService implements EarningServiceInterface{

    private final EarningRepository earningRepository;
    private final UserService userService;

    public EarningService(EarningRepository earningRepository, UserService userService) {
        this.earningRepository = earningRepository;
        this.userService = userService;
    }

    @Override
    public Earning saveEarning(Earning earning, Integer userId) {
        User user = userService.getUserById(userId);
        earning.setUser(user);
        earningRepository.save(earning);
        return earning;
    }

    @Override
    public Earning getEarningById(Integer id) {
        return earningRepository.findById(id)
                .orElseThrow(() -> new EarningNotFoundException("Earning not found."));
    }

    @Override
    public Earning updateEarning(Integer id, Earning earning) {
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
}
