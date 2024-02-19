package com.github.rodis00.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Data
@Table(name = "user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    private Integer id;

    @Column(
            unique = true
    )
    private String username;

    @Column(
            unique = true
    )
    private String email;

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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
