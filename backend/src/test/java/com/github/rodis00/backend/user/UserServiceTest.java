package com.github.rodis00.backend.user;

import com.github.rodis00.backend.entity.UserEntity;
import com.github.rodis00.backend.exception.EntityNotFoundException;
import com.github.rodis00.backend.exception.InvalidEmailException;
import com.github.rodis00.backend.exception.UserAlreadyExistsException;
import com.github.rodis00.backend.exception.UsernameIsTakenException;
import com.github.rodis00.backend.image.ImageService;
import com.github.rodis00.backend.passwordReset.PasswordResetService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private PasswordResetService passwordResetService;

    @Mock
    private ImageService imageService;

    @InjectMocks
    private UserService userService;

    private UserEntity user;

    private final String username = "username";

    @BeforeEach
    void setUp() {
        user = new UserEntity();
        user.setId(1L);
        user.setUsername(username);
        user.setPassword("password");
        user.setEmail("test@example.com");
        user.setExpenses(null);
        user.setIncomes(null);
    }

    @Test
    void shouldGetUserByUsername() {
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));

        UserEntity existedUser = userService.getUserByUsername(username);

        assertNotNull(existedUser);
        assertEquals(user.getId(), existedUser.getId());
        assertEquals(user.getUsername(), existedUser.getUsername());
        assertEquals(user.getPassword(), existedUser.getPassword());
        assertEquals(user.getEmail(), existedUser.getEmail());
        assertEquals(user.getExpenses(), existedUser.getExpenses());
        assertEquals(user.getIncomes(), existedUser.getIncomes());

        verify(userRepository, times(1)).findByUsername(username);
    }

    @Test
    void shouldThrowExceptionWhenUserNotFound() {
        when(userRepository.findByUsername(username)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> {
            userService.getUserByUsername(username);
        });

        verify(userRepository, times(1)).findByUsername(username);
    }

    @Test
    void shouldUpdateUserEmail() {
        String email = "expected@example.com";

        User expectedUser = new User();
        expectedUser.setEmail(email);

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));
        when(userRepository.existsByEmail(email)).thenReturn(false);

        UserDto updatedDto = userService.updateUser(username, expectedUser);

        assertNotNull(updatedDto);
        assertEquals(email, updatedDto.getEmail());

        verify(userRepository, times(1)).findByUsername(username);
        verify(userRepository, times(1)).existsByEmail(email);
    }

    @Test
    void shouldThrowExceptionIfUserWithEmailAlreadyExists() {
        String email = "expected@example.com";

        User expectedUser = new User();
        expectedUser.setEmail(email);

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));
        when(userRepository.existsByEmail(email)).thenReturn(true);

        assertThrows(UserAlreadyExistsException.class, () -> {
            userService.updateUser(username, expectedUser);
        });

        verify(userRepository, times(1)).existsByEmail(email);
        verify(userRepository, never()).save(any(UserEntity.class));
    }

    @Test
    void shouldThrowExceptionIfEmailIsInvalid() {
        String invalidEmail = "";
        String username = "user";

        UserEntity existingUser = new UserEntity();
        existingUser.setEmail("correct@example.com");
        existingUser.setUsername(username);

        User expectedUser = new User();
        expectedUser.setEmail(invalidEmail);

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(existingUser));
        when(userRepository.existsByEmail(invalidEmail)).thenReturn(false);

        assertThrows(InvalidEmailException.class, () -> {
            userService.updateUser(username, expectedUser);
        });

        verify(userRepository, times(1)).existsByEmail(invalidEmail);
        verify(userRepository, never()).save(any(UserEntity.class));
    }

    @Test
    void shouldThrowExceptionIfUserWithUsernameAlreadyExists() {
        String username = "username";

        User user = new User();
        user.setUsername(username);

        UserEntity expectedUser = new UserEntity();
        expectedUser.setUsername(username);

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(expectedUser));
        when(userRepository.existsByUsername(username)).thenReturn(true);

        assertThrows(UsernameIsTakenException.class, () -> {
            userService.updateUser(username, user);
        });

        verify(userRepository, times(1)).existsByUsername(username);
        verify(userRepository, never()).save(any(UserEntity.class));
    }

    @Test
    void shouldUpdateUsername() {
        String username = "expected@example.com";
        User expectedUser = new User();
        expectedUser.setUsername(username);

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));
        when(userRepository.existsByUsername(username)).thenReturn(false);

        UserDto updatedDto = userService.updateUser(username, expectedUser);

        assertNotNull(updatedDto);
        assertEquals(username, updatedDto.getUsername());

        verify(userRepository, times(1)).findByUsername(username);
        verify(userRepository, times(1)).existsByUsername(username);
    }

    @Test
    void shouldUpdateUserPassword() {
        String password = "password";
        User expectedUser = new User();
        expectedUser.setPassword(password);

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));
        when(passwordEncoder.encode(password)).thenReturn("password");

        UserDto updatedDto = userService.updateUser(username, expectedUser);

        assertNotNull(updatedDto);
        assertEquals(password, user.getPassword());

        verify(userRepository, times(1)).findByUsername(username);
    }

    @Test
    void shouldReturnAllUsers() {
        List<UserEntity> expectedUsers = List.of(user);

        when(userRepository.findAll()).thenReturn(expectedUsers);

        List<UserEntity> users = userService.getAllUsers();

        assertNotNull(users);
        assertEquals(expectedUsers.size(), users.size());
        assertEquals(expectedUsers.get(0), users.get(0));

        verify(userRepository, times(1)).findAll();
    }

    @Test
    void shouldDeleteUserByUsername() {
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));

        doNothing().when(passwordResetService).deleteUserPasswordTokens(user.getId());
        doNothing().when(imageService).deleteUserProfilePicture(user.getUsername());
        doNothing().when(userRepository).delete(user);

        userService.deleteUserByUsername(username);

        verify(userRepository, times(1)).findByUsername(username);
        verify(passwordResetService, times(1)).deleteUserPasswordTokens(user.getId());
        verify(imageService, times(1)).deleteUserProfilePicture(user.getUsername());
        verify(userRepository, times(1)).delete(user);
    }

    @Test
    void shouldThrowExceptionIfUserDoesNotExist() {
        when(userRepository.existsByUsername(username)).thenReturn(false);

        assertThrows(EntityNotFoundException.class, () -> {
            userService.checkIfUserExists(username);
        });

        verify(userRepository, times(1)).existsByUsername(username);
    }
}