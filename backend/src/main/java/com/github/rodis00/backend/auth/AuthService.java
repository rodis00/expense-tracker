package com.github.rodis00.backend.auth;

import com.github.rodis00.backend.config.jwt.JwtService;
import com.github.rodis00.backend.config.jwt.RefreshTokenRequest;
import com.github.rodis00.backend.config.jwt.RefreshTokenResponse;
import com.github.rodis00.backend.entity.UserEntity;
import com.github.rodis00.backend.exception.*;
import com.github.rodis00.backend.role.RoleRepository;
import com.github.rodis00.backend.user.UserRepository;
import com.github.rodis00.backend.user.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final RoleRepository roleRepository;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager,
            UserService userService,
            RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.roleRepository = roleRepository;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userService.existsByUsername(request.getUsername()))
            throw new UsernameIsTakenException("This username is taken.");

        if (userService.existsByEmail(request.getEmail()))
            throw new UserAlreadyExistsException("User with this email already exists.");

        UserEntity user = new UserEntity();
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setRoles(List.of(roleRepository.findByName("USER")));
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        UserEntity savedUser = userRepository.save(user);

        String jwtToken = jwtService.generateToken(savedUser.getUsername());
        String refreshToken = jwtService.generateRefreshToken(savedUser.getUsername());

        return new AuthResponse(jwtToken, refreshToken);
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

        String jwtToken = jwtService.generateToken(user.getUsername());
        String refreshToken = jwtService.generateRefreshToken(user.getUsername());

        return new AuthResponse(jwtToken, refreshToken);
    }

    public RefreshTokenResponse refreshToken(
            RefreshTokenRequest refreshTokenRequest
    ) {
        final String username;
        final String refreshToken = refreshTokenRequest.refreshToken();

        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new InvalidTokenException("Refresh token is missing");
        }

        username = jwtService.extractUsername(refreshToken);

        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (!jwtService.isTokenValid(refreshToken, user) || !jwtService.isRefreshToken(refreshToken)) {
            throw new InvalidTokenException("Refresh token is not valid");
        }

        String accessToken = jwtService.generateToken(user.getUsername());

        return new RefreshTokenResponse(accessToken);
    }
}
