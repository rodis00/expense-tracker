package com.github.rodis00.backend.emailSender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmailDto {
    private String to;
    private String subject;
    private String content;
}
