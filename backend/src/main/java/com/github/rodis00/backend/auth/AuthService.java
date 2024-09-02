package com.github.rodis00.backend.auth;

import com.github.rodis00.backend.config.JwtService;
import com.github.rodis00.backend.entity.Role;
import com.github.rodis00.backend.entity.UserEntity;
import com.github.rodis00.backend.exception.InvalidPasswordException;
import com.github.rodis00.backend.exception.InvalidUsernameException;
import com.github.rodis00.backend.exception.UserAlreadyExistsException;
import com.github.rodis00.backend.exception.UsernameIsTakenException;
import com.github.rodis00.backend.user.UserRepository;
import com.github.rodis00.backend.user.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager,
            UserService userService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userService.existsByUsername(request.getUsername()))
            throw new UsernameIsTakenException("This username is taken.");

        if (userService.existsByEmail(request.getEmail()))
            throw new UserAlreadyExistsException("User with this email already exists.");

        UserEntity user = new UserEntity();
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        String jwtToken = jwtService.generateToken(user);

        return new AuthResponse(jwtToken);
    }

    public AuthResponse authenticate(AuthRequest request) {
        UserEntity user = userRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() -> new InvalidUsernameException("Username does not exist."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword()))
            throw new InvalidPasswordException("Invalid password.");

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        String jwtToken = jwtService.generateToken(user);

        return new AuthResponse(jwtToken);
    }
}
