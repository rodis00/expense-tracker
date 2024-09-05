package com.github.rodis00.backend.user;

import com.github.rodis00.backend.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String username;
    private String email;

    public static UserDto from(UserEntity user) {
        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail()
        );
    }
}
