package com.github.rodis00.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "earning")
public class Earning {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String title;
    private Double amount;
    private Date date;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
