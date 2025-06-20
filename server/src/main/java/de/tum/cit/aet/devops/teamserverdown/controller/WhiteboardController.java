package de.tum.cit.aet.devops.teamserverdown.controller;

import de.tum.cit.aet.devops.teamserverdown.model.Whiteboard;
import de.tum.cit.aet.devops.teamserverdown.repository.WhiteboardRepository;
import de.tum.cit.aet.devops.teamserverdown.dto.CreateWhiteboardRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/whiteboards")
@Tag(name = "Whiteboard", description = "Endpoints for managing whiteboards")
public class WhiteboardController {

    private static final Logger logger = LoggerFactory.getLogger(WhiteboardController.class);

    @Autowired
    private WhiteboardRepository whiteboardRepository;

    @PostMapping
    @Operation(summary = "Create whiteboard", description = "Creates a new whiteboard for a user.")
    public Whiteboard createWhiteboard(@RequestBody CreateWhiteboardRequest request) {
        logger.info("Creating whiteboard for userId={} with title='{}'", request.userId, request.title);
        Whiteboard whiteboard = new Whiteboard(request.title, request.userId);
        Whiteboard saved = whiteboardRepository.save(whiteboard);
        logger.info("Whiteboard created with id={}", saved.getId());
        return saved;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Whiteboard> getWhiteboardByIdAndUserId(
            @PathVariable Long id,
            @RequestParam Long userId) {

        logger.info("Fetching whiteboard with id={} for userId={}", id, userId);
        Optional<Whiteboard> whiteboardOpt = whiteboardRepository.findByIdAndUserId(id, userId);

        if (whiteboardOpt.isPresent()) {
            logger.info("Whiteboard found: id={}", id);
            return ResponseEntity.ok(whiteboardOpt.get());
        } else {
            logger.warn("Whiteboard not found or unauthorized access for id={} and userId={}", id, userId);
            return ResponseEntity.status(404).build();
        }
    }

    @GetMapping
    @Operation(summary = "Get whiteboards by user ID", description = "Returns a list of whiteboards for the given user ID.")
    public List<Whiteboard> getWhiteboardsByUserId(@RequestParam Long userId) {
        logger.info("Fetching all whiteboards for userId={}", userId);
        return whiteboardRepository.findByUserId(userId);
    }

    @PutMapping("/{id}/title")
    @Operation(summary = "Update title", description = "Updates the title of an existing whiteboard.")
    public Whiteboard updateTitle(@PathVariable Long id, @RequestParam String title) {
        logger.info("Updating title for whiteboard id={} to '{}'", id, title);
        Optional<Whiteboard> optional = whiteboardRepository.findById(id);
        if (optional.isPresent()) {
            Whiteboard w = optional.get();
            w.setTitle(title);
            w.setLastEditedTime(LocalDateTime.now());
            Whiteboard updated = whiteboardRepository.save(w);
            logger.info("Whiteboard title updated successfully for id={}", id);
            return updated;
        }
        logger.error("Failed to update title - Whiteboard not found for id={}", id);
        throw new RuntimeException("Whiteboard not found");
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete whiteboard", description = "Deletes a whiteboard by its ID.")
    public void deleteWhiteboard(@PathVariable Long id) {
        logger.info("Deleting whiteboard with id={}", id);
        try {
            whiteboardRepository.deleteById(id);
            logger.info("Whiteboard deleted successfully: id={}", id);
        } catch (Exception e) {
            logger.error("Failed to delete whiteboard with id={}: {}", id, e.getMessage());
            throw e;
        }
    }
}
