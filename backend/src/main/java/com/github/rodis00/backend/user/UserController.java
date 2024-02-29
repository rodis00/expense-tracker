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
            summary = "Get all users"
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
            summary = "Get user by id"
    )
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Integer id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(UserDto.from(userService.getUserById(id)));
    }

    @Operation(
            summary = "Add new user"
    )
    @PostMapping("/")
    public ResponseEntity<UserDto> addUser(@RequestBody @Valid User user) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(UserDto.from(userService.saveUser(user)));
    }

    @Operation(
            summary = "Update user by id"
    )
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable Integer id,
            @RequestBody @Valid User user
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(UserDto.from(userService.updateUser(id, user)));
    }

    @Operation(
            summary = "Delete user by id"
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        userService.deleteUserById(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
