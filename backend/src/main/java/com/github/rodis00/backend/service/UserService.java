package com.github.rodis00.backend.service;

import com.github.rodis00.backend.exception.UserNotFoundException;
import com.github.rodis00.backend.model.User;
import com.github.rodis00.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserServiceInterface{

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found."));
    }

    @Override
    public User updateUser(Integer id, User user) {
        User actualUser = getUserById(id);

        actualUser.setEmail(user.getEmail());
        actualUser.setUsername(user.getUsername());
        actualUser.setPassword(user.getPassword());
        actualUser.setEarnings(user.getEarnings());
        actualUser.setExpenses(user.getExpenses());
        userRepository.save(actualUser);

        return actualUser;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUserById(Integer id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }
}
