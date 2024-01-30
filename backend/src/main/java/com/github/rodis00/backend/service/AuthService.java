package com.github.rodis00.backend.service;

import com.github.rodis00.backend.dto.AuthDto;
import com.github.rodis00.backend.dto.RequestDto;
import com.github.rodis00.backend.dto.UserDto;
import com.github.rodis00.backend.exception.InvalidPasswordException;
import com.github.rodis00.backend.exception.UserAlreadyExistsException;
import com.github.rodis00.backend.exception.UserNotFoundException;
import com.github.rodis00.backend.exception.UsernameIsTakenException;
import com.github.rodis00.backend.model.User;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserService userService;

    public AuthService(UserService userService) {
        this.userService = userService;
    }

    public UserDto register(RequestDto requestDto) {
        if (userService.existsByEmail(requestDto.getEmail()))
            throw new UserAlreadyExistsException("User with this email already exists.");

        if (userService.existsByUsername(requestDto.getUsername()))
            throw new UsernameIsTakenException("This username is taken.");

        User user = new User();
        user.setUsername(requestDto.getUsername());
        user.setEmail(requestDto.getEmail());
        user.setPassword(requestDto.getPassword());
        userService.saveUser(user);

        return UserDto.from(user);
    }

    public UserDto login(AuthDto authDto) {
        if (!userService.existsByEmail(authDto.getEmail()))
            throw new UserNotFoundException("User with this email doesn't exists.");

        User user = userService.getUserByEmail(authDto.getEmail());

        if (!user.getPassword().equals(authDto.getPassword()))
            throw new InvalidPasswordException("Invalid password.");

        return UserDto.from(user);
    }
}
