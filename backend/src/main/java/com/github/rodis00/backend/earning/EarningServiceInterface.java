package com.github.rodis00.backend.earning;

import com.github.rodis00.backend.page.GlobalPage;
import org.springframework.data.domain.Page;

import java.util.List;

public interface EarningServiceInterface {
    Earning saveEarning(Earning earning, Integer userId);
    Earning getEarningById(Integer id);
    Earning updateEarning(Integer id, Earning earning);
    List<Earning> getAllEarnings();
    List<Earning> getAllUserEarnings(Integer userId);
    void deleteEarningById(Integer id);
    Page<Earning> findAllEarningsByUserId(Integer userId, GlobalPage page);
}
