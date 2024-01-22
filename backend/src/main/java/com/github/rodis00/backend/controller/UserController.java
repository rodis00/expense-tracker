package com.github.rodis00.backend.controller;

import com.github.rodis00.backend.dto.UserDto;
import com.github.rodis00.backend.model.User;
import com.github.rodis00.backend.service.UserService;
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

    @GetMapping("")
    public ResponseEntity<List<UserDto>> getUsers() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService.getAllUsers().stream()
                        .map(UserDto::from)
                        .toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Integer id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(UserDto.from(userService.getUserById(id)));
    }

    @PostMapping("/add")
    public ResponseEntity<UserDto> addUser(@RequestBody @Valid User user) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(UserDto.from(userService.saveUser(user)));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Integer id, @RequestBody @Valid User user) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(UserDto.from(userService.updateUser(id, user)));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        userService.deleteUserById(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
