package com.github.rodis00.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "role", schema = "admin")
public class RoleEntity extends BaseEntity {

    private String name;
}
