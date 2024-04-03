package com.github.rodis00.backend.user;

import java.util.List;

public interface UserServiceInterface {
    User getUserById(Integer id);
    UserDto updateUser(Integer id, UserRequest user);
    List<User> getAllUsers();
    void deleteUserById(Integer id);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
