package com.github.rodis00.backend.service;

import com.github.rodis00.backend.model.Earning;

import java.util.List;

public interface EarningServiceInterface {
    Earning saveEarning(Earning earning);
    Earning getEarningById(Integer id);
    Earning updateEarning(Integer id, Earning earning);
    List<Earning> getAllEarnings();
    void deleteEarningById(Integer id);
}
