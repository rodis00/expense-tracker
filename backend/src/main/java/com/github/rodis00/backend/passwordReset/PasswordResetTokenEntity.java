package com.github.rodis00.backend.passwordReset;

import com.github.rodis00.backend.entity.BaseEntity;
import com.github.rodis00.backend.entity.UserEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "password_reset_token", schema = "expense_tracker")
public class PasswordResetTokenEntity extends BaseEntity {

    private String token;

    private LocalDateTime expiryDate;

    @OneToOne
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    private UserEntity user;

    public boolean isExpired() {
        return expiryDate.isBefore(LocalDateTime.now());
    }
}
