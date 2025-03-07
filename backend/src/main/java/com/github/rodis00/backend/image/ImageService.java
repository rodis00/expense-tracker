package com.github.rodis00.backend.image;

import com.github.rodis00.backend.entity.UserEntity;
import com.github.rodis00.backend.exception.EntityNotFoundException;
import com.github.rodis00.backend.exception.InvalidFileException;
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
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageService {

    @Value("${application.image.upload-dir}")
    private String uploadDir;

    private final UserRepository userRepository;

    private final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/bmp",
            "image/webp"
    );

    public ImageDto saveImage(
            MultipartFile file,
            String username
    ) {
        validateFile(file);

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || !originalFilename.contains(".")) {
            throw new InvalidFileException("Invalid file name: no extension found");
        }

        try {
            UserEntity user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new EntityNotFoundException("User not found"));

            Path directory = Paths.get(uploadDir);
            Files.createDirectories(directory); // Create directory if it doesn't exist

            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String newFilename = UUID.randomUUID() + fileExtension;

            Path filePath = directory.resolve(newFilename);
            Files.write(filePath, file.getBytes());

            updateUserProfilePicture(user, filePath.toString());
            userRepository.save(user);

            return new ImageDto(user.getProfilePicture());
        } catch (IOException e) {
            throw new InvalidFileException("Could not save image: " + e.getMessage());
        }
    }

    private void validateFile(MultipartFile file) {
        if (Objects.isNull(file) || file.isEmpty()) {
            throw new InvalidFileException("File is empty");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType)) {
            throw new InvalidFileException("Invalid file type, allowed types: " + ALLOWED_CONTENT_TYPES);
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
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
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
            throw new EntityNotFoundException("Image not found or could not be read");
        }
    }
}
