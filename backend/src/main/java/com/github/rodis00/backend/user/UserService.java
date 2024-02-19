package com.github.rodis00.backend.user;

import com.github.rodis00.backend.exception.UserAlreadyExistsException;
import com.github.rodis00.backend.exception.UserNotFoundException;
import com.github.rodis00.backend.exception.UsernameIsTakenException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserServiceInterface {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User user) {
        if (existsByEmail(user.getEmail()))
            throw new UserAlreadyExistsException("User with this email already exists.");

        if (existsByUsername(user.getUsername()))
            throw new UsernameIsTakenException("This username is taken.");

        return userRepository.save(user);
    }

    @Override
    public User getUserById(Integer id) {
        return userRepository
                .findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found."));
    }

    @Override
    public User updateUser(
            Integer id,
            User user
    ) {
        if (existsByEmail(user.getEmail()))
            throw new UserAlreadyExistsException("User with this email already exists.");

        if (existsByUsername(user.getUsername()))
            throw new UsernameIsTakenException("This username is taken.");

        User actualUser = getUserById(id);
        actualUser.setEmail(user.getEmail());
        actualUser.setUsername(user.getUsername());
        actualUser.setPassword(user.getPassword());
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

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
