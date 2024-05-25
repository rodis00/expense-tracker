package com.github.rodis00.backend.user;

import com.github.rodis00.backend.exception.UserAlreadyExistsException;
import com.github.rodis00.backend.exception.UserNotFoundException;
import com.github.rodis00.backend.exception.UsernameIsTakenException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1);
        user.setUsername("test");
        user.setPassword("password");
        user.setEmail("test@example.com");
        user.setExpenses(null);
        user.setEarnings(null);
    }

    @Test
    void shouldGetUserById() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        User existedUser = userService.getUserById(1);

        assertNotNull(existedUser);
        assertEquals(user.getId(), existedUser.getId());
        assertEquals(user.getUsername(), existedUser.getUsername());
        assertEquals(user.getPassword(), existedUser.getPassword());
        assertEquals(user.getEmail(), existedUser.getEmail());
        assertEquals(user.getExpenses(), existedUser.getExpenses());
        assertEquals(user.getEarnings(), existedUser.getEarnings());

        verify(userRepository, times(1)).findById(1);
    }

    @Test
    void shouldThrowExceptionWhenUserNotFound() {
        when(userRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> {
            userService.getUserById(1);
        });

        verify(userRepository, times(1)).findById(1);
    }

    @Test
    void shouldUpdateUserEmail() {
        String email = "expected@example.com";

        UserRequest expectedUser = new UserRequest();
        expectedUser.setEmail(email);

        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(userRepository.existsByEmail(email)).thenReturn(false);

        UserDto updatedDto = userService.updateUser(1, expectedUser);

        assertNotNull(updatedDto);
        assertEquals(email, updatedDto.getEmail());
        assertEquals(user.getId(), updatedDto.getId());

        verify(userRepository, times(1)).findById(1);
        verify(userRepository, times(1)).existsByEmail(email);
    }

    @Test
    void shouldThrowExceptionIfUserWithEmailAlreadyExists() {
        String email = "expected@example.com";
        UserRequest expectedUser = new UserRequest();
        expectedUser.setEmail(email);

        when(userRepository.existsByEmail(email)).thenReturn(true);

        assertThrows(UserAlreadyExistsException.class, () -> {
            userService.updateUser(1, expectedUser);
        });

        verify(userRepository, times(1)).existsByEmail(email);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void shouldThrowExceptionIfUserWithUsernameAlreadyExists() {
        String username = "expected@example.com";
        UserRequest expectedUser = new UserRequest();
        expectedUser.setUsername(username);

        when(userRepository.existsByUsername(username)).thenReturn(true);

        assertThrows(UsernameIsTakenException.class, () -> {
            userService.updateUser(1, expectedUser);
        });

        verify(userRepository, times(1)).existsByUsername(username);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void shouldUpdateUsername() {
        String username = "expected@example.com";
        UserRequest expectedUser = new UserRequest();
        expectedUser.setUsername(username);

        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(userRepository.existsByUsername(username)).thenReturn(false);

        UserDto updatedDto = userService.updateUser(1, expectedUser);

        assertNotNull(updatedDto);
        assertEquals(username, updatedDto.getUsername());

        verify(userRepository, times(1)).findById(1);
        verify(userRepository, times(1)).existsByUsername(username);
    }

    @Test
    void shouldUpdateUserPassword() {
        String password = "password";
        UserRequest expectedUser = new UserRequest();
        expectedUser.setPassword(password);

        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(passwordEncoder.encode(password)).thenReturn("password");

        UserDto updatedDto = userService.updateUser(1, expectedUser);

        assertNotNull(updatedDto);
        assertEquals(password, user.getPassword());

        verify(userRepository, times(1)).findById(1);
    }

    @Test
    void shouldReturnAllUsers() {
        List<User> expectedUsers = List.of(user);

        when(userRepository.findAll()).thenReturn(expectedUsers);

        List<User> users = userService.getAllUsers();

        assertNotNull(users);
        assertEquals(expectedUsers.size(), users.size());
        assertEquals(expectedUsers.get(0), users.get(0));

        verify(userRepository, times(1)).findAll();
    }

    @Test
    void shouldDeleteUserById() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        doNothing()
                .when(userRepository)
                .delete(user);

        userService.deleteUserById(1);

        verify(userRepository, times(1)).findById(1);
        verify(userRepository, times(1)).delete(user);
    }
}