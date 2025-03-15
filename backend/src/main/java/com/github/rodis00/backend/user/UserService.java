package com.github.rodis00.backend.user;

import com.github.rodis00.backend.entity.UserEntity;
import com.github.rodis00.backend.exception.EntityNotFoundException;
import com.github.rodis00.backend.exception.InvalidEmailException;
import com.github.rodis00.backend.exception.UserAlreadyExistsException;
import com.github.rodis00.backend.exception.UsernameIsTakenException;
import com.github.rodis00.backend.image.ImageService;
import com.github.rodis00.backend.passwordReset.PasswordResetService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetService passwordResetService;
    private final ImageService imageService;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            PasswordResetService passwordResetService,
            ImageService imageService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.passwordResetService = passwordResetService;
        this.imageService = imageService;
    }

    public UserEntity getUserByUsername(String username) {
        return userRepository
                .findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found."));
    }

    public UserDto updateUser(
            String username,
            User user
    ) {
        String newUsername = user.getUsername();
        String newEmail = user.getEmail();
        String newPassword = user.getPassword();

        UserEntity existingUser = getUserByUsername(username);

        if (validateEmail(newEmail))
            existingUser.setEmail(newEmail);

        if (validateUsername(newUsername))
            existingUser.setUsername(newUsername);

        if (validatePassword(newPassword))
            existingUser.setPassword(passwordEncoder.encode(newPassword));

        userRepository.save(existingUser);

        return UserDto.from(existingUser);
    }

    private boolean validateUsername(String username) {
        if (existsByUsername(username)) {
            throw new UsernameIsTakenException("This username is taken.");
        }
        return (username != null && !username.isEmpty());
    }

    private boolean validateEmail(String email) {
        if (existsByEmail(email)) {
            throw new UserAlreadyExistsException("User with this email already exists.");
        }
        boolean valid = false;
        if (email != null) {
            if (!email.isEmpty()) {
                valid = true;
            } else {
                throw new InvalidEmailException("Invalid email address.");
            }
        }
        return valid;
    }

    private boolean validatePassword(String email) {
        return (email != null && !email.isEmpty());
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUserByUsername(String username) {
        UserEntity user = getUserByUsername(username);
        passwordResetService.deleteUserPasswordTokens(user.getId());
        imageService.deleteUserProfilePicture(user.getUsername());
        userRepository.delete(user);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public void checkIfUserExists(String username) {
        if (!userRepository.existsByUsername(username))
            throw new EntityNotFoundException("User not found.");
    }
}
