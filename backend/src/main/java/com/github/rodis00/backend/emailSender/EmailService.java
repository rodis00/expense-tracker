package com.github.rodis00.backend.emailSender;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class EmailService {

    @Value("${application.frontend-port}")
    private String frontendPort;

    private final JavaMailSender mailSender;

    private void sendEmail(EmailDto emailDto) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(
                    message,
                    true,
                    StandardCharsets.UTF_8.name()
            );

            helper.setFrom("expensetracker2025.noreply@gmail.com");
            helper.setTo(emailDto.getTo());
            helper.setSubject(emailDto.getSubject());

            helper.setText(emailDto.getContent(), true);

            ClassPathResource logo = new ClassPathResource("static/images/logo.png");
            helper.addInline("logoImage", logo);

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public void sendResetPasswordEmail(
            String resetLink,
            String recipientEmail
    ) {
        String subject = "Reset password";
        String content = loadHtmlTemplate("templates/resetPasswordEmail.html");
        content = content.replace("{{resetPasswordLink}}", resetLink);

        EmailDto emailDto = new EmailDto();
        emailDto.setTo(recipientEmail);
        emailDto.setSubject(subject);
        emailDto.setContent(content);

        sendEmail(emailDto);
    }

    public void sendWelcomeEmail(String recipientEmail) {
        String subject = "Welcome to Expense Tracker!";
        String content = loadHtmlTemplate("templates/welcomeEmail.html");
        String homeLink = frontendPort + "/login";
        content = content.replace("{{homeLink}}", homeLink);

        EmailDto emailDto = new EmailDto();
        emailDto.setTo(recipientEmail);
        emailDto.setSubject(subject);
        emailDto.setContent(content);

        sendEmail(emailDto);
    }

    private String loadHtmlTemplate(String path) {
        try {
            ClassPathResource resource = new ClassPathResource(path);
            return new String(resource.getInputStream().readAllBytes());
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
