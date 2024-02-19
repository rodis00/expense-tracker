package com.github.rodis00.backend.earning;

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
@Table(name = "earning")
public class Earning {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    private Integer id;

    @NotBlank(message = "Title shouldn't be blank.")
    private String title;

    @NotNull(message = "Amount shouldn't be empty.")
    @Min(value = 1, message = "Amount can't be lower than 1.")
    private Double amount;

    @NotNull(message = "Invalid date.")
    private Date date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    @JsonIgnore
    private User user;
}
