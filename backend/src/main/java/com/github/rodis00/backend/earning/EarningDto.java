package com.github.rodis00.backend.earning;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class EarningDto {
    private Integer id;
    private String title;
    private Double amount;
    private LocalDateTime date;

    public static EarningDto from(Earning earning) {
        return new EarningDto(
                earning.getId(),
                earning.getTitle(),
                earning.getAmount(),
                earning.getDate()
        );
    }
}
