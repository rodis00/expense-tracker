package com.github.rodis00.backend.image;

import com.github.rodis00.backend.entity.UserEntity;
import com.github.rodis00.backend.exception.FileNotFoundException;
import com.github.rodis00.backend.exception.InvalidFileException;
import com.github.rodis00.backend.exception.UserNotFoundException;
import com.github.rodis00.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.hibernate.query.sqm.PathElementException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageService {

    @Value("${application.image.upload-dir}")
    private String uploadDir;

    private final UserRepository userRepository;

    public ImageDto saveImage(
            MultipartFile file,
            String username
    ) {
        if (Objects.isNull(file) || file.isEmpty()) {
            throw new InvalidFileException("File is empty");
        }
        try {
            UserEntity user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UserNotFoundException("User not found"));
            Path directory = Paths.get(uploadDir);
            String fileExtension = file.getOriginalFilename()
                    .substring(file.getOriginalFilename().lastIndexOf("."));
            Path filePath = directory.resolve(UUID.randomUUID() + fileExtension);
            Files.createDirectories(directory);
            Files.write(filePath, file.getBytes());
            updateUserProfilePicture(user, filePath.toString());
            userRepository.save(user);
            return new ImageDto(user.getProfilePicture());
        } catch (IOException e) {
            throw new InvalidFileException("Could not save image: " + e.getMessage());
        }
    }

    public void updateUserProfilePicture(UserEntity user, String filePath) {
        String oldProfilePicture = user.getProfilePicture();
        String newProfilePicture = filePath.replace("\\", "/");
        if (oldProfilePicture != null) {
            deleteUserProfilePicture(oldProfilePicture, user);
        }
        user.setProfilePicture(newProfilePicture);
    }

    public void deleteUserProfilePicture(String filePath, UserEntity user) {
        try {
            Files.deleteIfExists(Paths.get(filePath));
            user.setProfilePicture(null);
        } catch (IOException e) {
            throw new InvalidFileException("Could not delete profile picture: " + e.getMessage());
        }
    }

    public void deleteUserProfilePicture(String username) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        deleteUserProfilePicture(user.getProfilePicture(), user);
        userRepository.save(user);
    }

    public ResponseEntity<byte[]> getImage(String path) {
        try {
            Path file = Paths.get(path);
            String contentType = Files.probeContentType(file);
            byte[] fileData = Files.readAllBytes(file);
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(fileData);
        } catch (PathElementException | IOException e) {
            throw new FileNotFoundException("Image not found or could not be read");
        }
    }
}
