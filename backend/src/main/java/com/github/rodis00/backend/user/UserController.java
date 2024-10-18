package com.github.rodis00.backend.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("expense-tracker/api/v1/users")
@Tag(name = "User")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(
            summary = "Retrieve a list of users"
    )
    @GetMapping("/")
    public ResponseEntity<List<UserDto>> getUsers() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService
                        .getAllUsers()
                        .stream()
                        .map(UserDto::from)
                        .toList());
    }

    @Operation(
            summary = "Retrieve a single user by its unique username"
    )
    @GetMapping("/{username}")
    public ResponseEntity<UserDto> getUser(
            @PathVariable String username
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(UserDto.from(userService.getUserByUsername(username)));
    }

    @Operation(
            summary = "Update existing user by its unique username"
    )
    @PatchMapping("/{username}")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable String username,
            @RequestBody @Valid User user
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService.updateUser(username, user));
    }

    @Operation(
            summary = "Delete user by its unique username"
    )
    @DeleteMapping("/{username}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable String username
    ) {
        userService.deleteUserByUsername(username);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
