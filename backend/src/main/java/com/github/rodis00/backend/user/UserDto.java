package com.github.rodis00.backend.user;

import com.github.rodis00.backend.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class UserDto {
    private String username;
    private String email;
    private String profilePicture;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static UserDto from(UserEntity user) {
        return new UserDto(
                user.getUsername(),
                user.getEmail(),
                user.getProfilePicture(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}
