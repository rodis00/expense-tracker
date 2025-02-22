package com.github.rodis00.backend.image;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("expense-tracker/api/v1/images")
@AllArgsConstructor
@Tag(name = "Image")
public class ImageController {

    private final ImageService imageService;

    @Operation(
            summary = "Upload an image for a specific user"
    )
    @PostMapping(
            value = "/upload/users/{username}",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}
    )
    public ResponseEntity<ImageDto> uploadImage(
            @RequestPart MultipartFile file,
            @PathVariable String username
    ) {
        return ResponseEntity.ok(imageService.saveImage(file, username));
    }

    @Operation(
            summary = "Retrieve an image by its path"
    )
    @GetMapping
    public ResponseEntity<byte[]> getImage(@RequestParam String path) {
        return imageService.getImage(path);
    }

    @Operation(
            summary = "Delete an image for a specific user"
    )
    @DeleteMapping("/delete/users/{username}")
    public ResponseEntity<Void> deleteUserImage(@PathVariable String username) {
        imageService.deleteUserProfilePicture(username);
        return ResponseEntity.noContent().build();
    }
}
