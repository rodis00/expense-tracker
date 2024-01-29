package com.github.rodis00.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JsonIgnore
    private Integer id;

    @NotBlank(message = "Username shouldn't be empty.")
    @Size(min = 3, max = 20, message = "Username should be between 3 or 20 characters.")
    @Column(
            unique = true
    )
    private String username;

    @NotBlank(message = "Email shouldn't be null.")
    @Email(message = "Invalid email address.")
    @Column(
            unique = true
    )
    private String email;

    @NotBlank(message = "Password shouldn't be null.")
    @Password
    private String password;

    @OneToMany(
            orphanRemoval = true,
            cascade = CascadeType.ALL,
            mappedBy = "user"
    )
    @JsonManagedReference
    @JsonIgnore
    private List<Earning> earnings;

    @OneToMany(
            orphanRemoval = true,
            cascade = CascadeType.ALL,
            mappedBy = "user"
    )
    @JsonManagedReference
    @JsonIgnore
    private List<Expense> expenses;
}
