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
            cascade = CascadeType.ALL,
            mappedBy = "user"
    )
    private List<Earning> earnings;
    @OneToMany(
            orphanRemoval = true,
            cascade = CascadeType.ALL,
            mappedBy = "user"
    )
    private List<Expense> expenses;

    public void addEarning(Earning earning) {
        this.earnings.add(earning);
        earning.setUser(this);
    }

    public void addExpense(Expense expense) {
        this.expenses.add(expense);
        expense.setUser(this);
    }
}
