package com.github.rodis00.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
public class BaseEntity {

    @Id
    @SequenceGenerator(
            name = "base_seq",
            sequenceName = "base_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            generator = "base_seq",
            strategy = GenerationType.SEQUENCE
    )
    private Long id;
}
