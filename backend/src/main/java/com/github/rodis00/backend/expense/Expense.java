package com.github.rodis00.backend.expense;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.rodis00.backend.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "expense")
public class Expense {
    @Id
    @SequenceGenerator(
            name = "expense_seq",
            sequenceName = "expense_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            generator = "expense_seq",
            strategy = GenerationType.SEQUENCE
    )
    @JsonIgnore
    private Integer id;

    @NotBlank(message = "Title shouldn't be blank.")
    private String title;

    @NotNull(message = "Price shouldn't be empty.")
    @Min(value = 1, message = "Price can't be lower than 1.")
    private Double price;

    @NotNull(message = "Invalid date.")
    private Date date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    @JsonIgnore
    private User user;
}
