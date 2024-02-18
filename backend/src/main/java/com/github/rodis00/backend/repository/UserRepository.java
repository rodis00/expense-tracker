package com.github.rodis00.backend.repository;

import com.github.rodis00.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    User findByEmail(String email);

    Optional<User> findByUsername(String username);
}
