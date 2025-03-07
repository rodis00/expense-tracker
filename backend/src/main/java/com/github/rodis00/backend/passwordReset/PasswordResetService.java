package com.github.rodis00.backend.passwordReset;

import com.github.rodis00.backend.emailSender.EmailDto;
import com.github.rodis00.backend.emailSender.EmailService;
import com.github.rodis00.backend.entity.UserEntity;
import com.github.rodis00.backend.exception.EntityNotFoundException;
import com.github.rodis00.backend.exception.ResetTokenExpiredException;
import com.github.rodis00.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private final PasswordResetTokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Value("${application.password-reset-token.expiration-time}")
    private int EXPIRATION_TIME;

    @Value("${application.frontend-port}")
    private String BASE_URL;

    private PasswordResetTokenEntity generateResetToken(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        PasswordResetTokenEntity resetToken = new PasswordResetTokenEntity();
        resetToken.setToken(UUID.randomUUID().toString());
        resetToken.setUser(user);
        resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(EXPIRATION_TIME));

        tokenRepository.save(resetToken);

        return resetToken;
    }

    private EmailDto prepareEmail(String recipient) {
        PasswordResetTokenEntity resetToken = generateResetToken(recipient);
        String resetLink = BASE_URL + "/reset-password?resetToken=" + resetToken.getToken();

        String subject = "Reset password";
        String content = "Click here to reset your password: " + resetLink +
                "\nThis link will be active for " + EXPIRATION_TIME + " minutes.";

        EmailDto emailDto = new EmailDto();
        emailDto.setTo(recipient);
        emailDto.setSubject(subject);
        emailDto.setContent(content);

        return emailDto;
    }

    public void sendEmailToResetPassword(String email) {
        emailService.sendEmail(prepareEmail(email));
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetTokenEntity resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new EntityNotFoundException("Invalid password reset token"));

        if (resetToken.isExpired()) {
            throw new ResetTokenExpiredException("Password reset token expired");
        }

        UserEntity user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));

        userRepository.save(user);
        tokenRepository.delete(resetToken);
    }
}
