package com.github.rodis00.backend.dto;

import com.github.rodis00.backend.model.Earning;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class EarningDto {
    private Integer id;
    private String title;
    private Double amount;
    private Date date;

    public static EarningDto from (Earning earning) {
        return new EarningDto(
                earning.getId(),
                earning.getTitle(),
                earning.getAmount(),
                earning.getDate()
        );
    }
}
