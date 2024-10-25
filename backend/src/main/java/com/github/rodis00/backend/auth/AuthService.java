package com.github.rodis00.backend.auth;

import com.github.rodis00.backend.config.jwt.JwtService;
import com.github.rodis00.backend.entity.UserEntity;
import com.github.rodis00.backend.exception.*;
import com.github.rodis00.backend.role.RoleRepository;
import com.github.rodis00.backend.entity.TokenEntity;
import com.github.rodis00.backend.token.TokenRepository;
import com.github.rodis00.backend.token.TokenType;
import com.github.rodis00.backend.user.UserRepository;
import com.github.rodis00.backend.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
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
    private final TokenRepository tokenRepository;
    private final RoleRepository roleRepository;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager,
            UserService userService,
            TokenRepository tokenRepository,
            RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.tokenRepository = tokenRepository;
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

        saveUserToken(savedUser, jwtToken);

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

        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);

        return new AuthResponse(jwtToken, refreshToken);
    }

    public AuthResponse refreshToken(
            HttpServletRequest request
    ) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String username;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new InvalidTokenException("Token is missing");
        }

        refreshToken = authHeader.substring(7);
        username = jwtService.extractUsername(refreshToken);

        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (!jwtService.isTokenValid(refreshToken, user)) {
            throw new InvalidTokenException("Token is not valid");
        }

        String accessToken = jwtService.generateToken(user.getUsername());
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);

        return new AuthResponse(accessToken, refreshToken);
    }

    private void revokeAllUserTokens(UserEntity user) {
        List<TokenEntity> validUserTokenEntities = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokenEntities.isEmpty()) {
            return;
        }
        validUserTokenEntities.forEach(tokenEntity -> {
            tokenEntity.setRevoked(true);
            tokenEntity.setExpired(true);
        });
        tokenRepository.saveAll(validUserTokenEntities);
    }

    private void saveUserToken(
            UserEntity savedUser,
            String jwtToken
    ) {
        TokenEntity tokenEntity = TokenEntity.builder()
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .user(savedUser)
                .build();

        tokenRepository.save(tokenEntity);
    }
}
