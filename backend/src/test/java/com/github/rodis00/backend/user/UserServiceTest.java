package com.github.rodis00.backend.user;

import com.github.rodis00.backend.entity.UserEntity;
import com.github.rodis00.backend.exception.UserAlreadyExistsException;
import com.github.rodis00.backend.exception.UserNotFoundException;
import com.github.rodis00.backend.exception.UsernameIsTakenException;
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

    @InjectMocks
    private UserService userService;

    private UserEntity user;

    @BeforeEach
    void setUp() {
        user = new UserEntity();
        user.setId(1L);
        user.setUsername("test");
        user.setPassword("password");
        user.setEmail("test@example.com");
        user.setExpenses(null);
        user.setIncomes(null);
    }

    @Test
    void shouldGetUserById() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        UserEntity existedUser = userService.getUserById(1L);

        assertNotNull(existedUser);
        assertEquals(user.getId(), existedUser.getId());
        assertEquals(user.getUsername(), existedUser.getUsername());
        assertEquals(user.getPassword(), existedUser.getPassword());
        assertEquals(user.getEmail(), existedUser.getEmail());
        assertEquals(user.getExpenses(), existedUser.getExpenses());
        assertEquals(user.getIncomes(), existedUser.getIncomes());

        verify(userRepository, times(1)).findById(1L);
    }

    @Test
    void shouldThrowExceptionWhenUserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> {
            userService.getUserById(1L);
        });

        verify(userRepository, times(1)).findById(1L);
    }

    @Test
    void shouldUpdateUserEmail() {
        String email = "expected@example.com";

        User expectedUser = new User();
        expectedUser.setEmail(email);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.existsByEmail(email)).thenReturn(false);

        UserDto updatedDto = userService.updateUser(1L, expectedUser);

        assertNotNull(updatedDto);
        assertEquals(email, updatedDto.getEmail());
        assertEquals(user.getId(), updatedDto.getId());

        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).existsByEmail(email);
    }

    @Test
    void shouldThrowExceptionIfUserWithEmailAlreadyExists() {
        String email = "expected@example.com";
        User expectedUser = new User();
        expectedUser.setEmail(email);

        when(userRepository.existsByEmail(email)).thenReturn(true);

        assertThrows(UserAlreadyExistsException.class, () -> {
            userService.updateUser(1L, expectedUser);
        });

        verify(userRepository, times(1)).existsByEmail(email);
        verify(userRepository, never()).save(any(UserEntity.class));
    }

    @Test
    void shouldThrowExceptionIfUserWithUsernameAlreadyExists() {
        String username = "expected@example.com";
        User expectedUser = new User();
        expectedUser.setUsername(username);

        when(userRepository.existsByUsername(username)).thenReturn(true);

        assertThrows(UsernameIsTakenException.class, () -> {
            userService.updateUser(1L, expectedUser);
        });

        verify(userRepository, times(1)).existsByUsername(username);
        verify(userRepository, never()).save(any(UserEntity.class));
    }

    @Test
    void shouldUpdateUsername() {
        String username = "expected@example.com";
        User expectedUser = new User();
        expectedUser.setUsername(username);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.existsByUsername(username)).thenReturn(false);

        UserDto updatedDto = userService.updateUser(1L, expectedUser);

        assertNotNull(updatedDto);
        assertEquals(username, updatedDto.getUsername());

        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).existsByUsername(username);
    }

    @Test
    void shouldUpdateUserPassword() {
        String password = "password";
        User expectedUser = new User();
        expectedUser.setPassword(password);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(passwordEncoder.encode(password)).thenReturn("password");

        UserDto updatedDto = userService.updateUser(1L, expectedUser);

        assertNotNull(updatedDto);
        assertEquals(password, user.getPassword());

        verify(userRepository, times(1)).findById(1L);
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
    void shouldDeleteUserById() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        doNothing()
                .when(userRepository)
                .delete(user);

        userService.deleteUserById(1L);

        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).delete(user);
    }
}