package com.github.rodis00.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "expense", schema = "expense_tracker")
public class ExpenseEntity extends BaseEntity {

    private String title;

    private BigDecimal price;

    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private String description;

    @Column(
            unique = true,
            nullable = false
    )
    private String slug;
}
