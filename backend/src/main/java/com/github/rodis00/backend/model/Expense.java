package com.github.rodis00.backend.model;

import com.github.rodis00.backend.model.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "expense")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String title;
    private Double price;
    private Date date;
    @OneToMany(
            orphanRemoval = true,
            cascade = CascadeType.PERSIST
    )
    @JoinColumn(name = "user_id")
    private List<User> users = new ArrayList<>();
}
