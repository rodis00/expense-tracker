package com.github.rodis00.backend.service;

import com.github.rodis00.backend.model.Earning;

import java.util.List;

public interface EarningServiceInterface {
    Earning saveEarning(Earning earning, Integer userId);
    Earning getEarningById(Integer id);
    Earning updateEarning(Integer id, Earning earning);
    List<Earning> getAllEarnings();
    List<Earning> getAllUserEarnings(Integer userId);
    void deleteEarningById(Integer id);
}
