package com.github.rodis00.backend.service;

import com.github.rodis00.backend.model.User;

import java.util.List;

public interface UserServiceInterface {
    User saveUser(User user);
    User getUserById(Integer id);
    User updateUser(Integer id, User user);
    List<User> getAllUsers();
    void deleteUserById(Integer id);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    User getUserByEmail(String email);
}
