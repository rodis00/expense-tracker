package com.github.rodis00.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

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

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
