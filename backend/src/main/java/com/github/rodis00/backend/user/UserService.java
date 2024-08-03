package com.github.rodis00.backend.user;

import com.github.rodis00.backend.exception.UserAlreadyExistsException;
import com.github.rodis00.backend.exception.UserNotFoundException;
import com.github.rodis00.backend.exception.UsernameIsTakenException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getUserById(Integer id) {
        return userRepository
                .findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found."));
    }

    public UserDto updateUser(
            Integer id,
            UserRequest user
    ) {
        if (existsByEmail(user.getEmail()))
            throw new UserAlreadyExistsException("User with this email already exists.");

        if (existsByUsername(user.getUsername()))
            throw new UsernameIsTakenException("This username is taken.");

        User existingUser = getUserById(id);
        if (Objects.nonNull(user.getEmail()))
            existingUser.setEmail(user.getEmail());

        if (Objects.nonNull(user.getUsername()))
            existingUser.setUsername(user.getUsername());

        if (Objects.nonNull(user.getPassword()))
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(existingUser);

        return UserDto.from(existingUser);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUserById(Integer id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
}
