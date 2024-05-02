package com.github.rodis00.backend.earning;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.rodis00.backend.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "earning")
public class Earning {
    @Id
    @SequenceGenerator(
            name = "earning_seq",
            sequenceName = "earning_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            generator = "earning_seq",
            strategy = GenerationType.SEQUENCE
    )
    @JsonIgnore
    private Integer id;

    @NotBlank(message = "Title shouldn't be blank.")
    private String title;

    @NotNull(message = "Amount shouldn't be empty.")
    @Min(value = 1, message = "Amount can't be lower than 1.")
    private Double amount;

    @NotNull(message = "Invalid date.")
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    @JsonIgnore
    private User user;
}
