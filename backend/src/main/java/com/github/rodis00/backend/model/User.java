package com.github.rodis00.backend.model;

import com.github.rodis00.backend.utils.customValidator.Password;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @NotBlank(message = "Username shouldn't be empty.")
    @Size(min = 3, max = 20, message = "Username should be between 3 or 20 characters.")
    private String username;
    @NotBlank(message = "Email shouldn't be null.")
    @Email(message = "Invalid email address.")
    private String email;
    @NotBlank(message = "Password shouldn't be null.")
    @Password
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
