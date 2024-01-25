package com.github.rodis00.backend.service;

import com.github.rodis00.backend.model.Earning;
import com.github.rodis00.backend.model.GlobalPage;
import org.springframework.data.domain.Page;

public interface EarningPageServiceInterface {
    Page<Earning> getEarningsByUserId(Integer userId, GlobalPage earningPage);
}
