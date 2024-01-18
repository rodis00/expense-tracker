package com.github.rodis00.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String username;
    private String email;
    private String password;
    @OneToMany(
            orphanRemoval = true,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "user_id")
    private List<Earning> earnings;
    @OneToMany(
            orphanRemoval = true,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "user_id")
    private List<Expense> expenses;
}
