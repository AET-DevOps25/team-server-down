package de.tum.cit.aet.devops.teamserverdown.controller;

import de.tum.cit.aet.devops.teamserverdown.model.User;
import de.tum.cit.aet.devops.teamserverdown.model.Whiteboard;
import de.tum.cit.aet.devops.teamserverdown.repository.WhiteboardRepository;
import de.tum.cit.aet.devops.teamserverdown.security.CurrentUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/whiteboards")
@Tag(name = "Whiteboard", description = "Endpoints for managing whiteboards")
public class WhiteboardController {

  private static final Logger logger = LoggerFactory.getLogger(WhiteboardController.class);

  private WhiteboardRepository whiteboardRepository;

  public WhiteboardController(WhiteboardRepository whiteboardRepository) {
    this.whiteboardRepository = whiteboardRepository;
  }

  @PostMapping
  @Operation(summary = "Create whiteboard", description = "Creates a new whiteboard for a user.")
  public Whiteboard createWhiteboard(@CurrentUser User user, @RequestParam String title) {

    logger.info("Creating whiteboard for userId={} with title='{}'", user.getId(), title);

    Whiteboard whiteboard = new Whiteboard(title, user.getId());
    Whiteboard saved = whiteboardRepository.save(whiteboard);
    logger.info("Whiteboard created with id={}", saved.getId());
    return saved;
  }

  @GetMapping("/{id}")
  public ResponseEntity<Whiteboard> getWhiteboardById(
      @Parameter(description = "ID of the whiteboard", required = true) @PathVariable Long id,
      @CurrentUser User user) {

    logger.info("Fetching whiteboard with id={} for userId={}", id, user.getId());
    Optional<Whiteboard> whiteboardOpt = whiteboardRepository.findByIdAndUserId(id, user.getId());

    if (whiteboardOpt.isPresent()) {
      logger.info("Whiteboard found: id={}", id);
      return ResponseEntity.ok(whiteboardOpt.get());
    } else {
      logger.warn(
          "Whiteboard not found or unauthorized access for id={} and userId={}", id, user.getId());
      return ResponseEntity.status(404).build();
    }
  }

  @GetMapping
  @Operation(
      summary = "Get whiteboards by user ID",
      description = "Returns a list of whiteboards for the current user.")
  public List<Whiteboard> getUserWhiteboards(@CurrentUser User user) {
    logger.info("Fetching all whiteboards for userId={}", user.getId());
    return whiteboardRepository.findByUserId(user.getId());
  }

  @PutMapping("/{id}/title")
  @Operation(summary = "Update title", description = "Updates the title of an existing whiteboard.")
  public Whiteboard updateTitle(
      @Parameter(description = "ID of the whiteboard", required = true) @PathVariable Long id,
      @RequestParam String title,
      @CurrentUser User user) {
    logger.info("Updating title for whiteboard id={} to '{}'", id, title);
    Optional<Whiteboard> optional = whiteboardRepository.findById(id);
    if (optional.isPresent()) {
      Whiteboard w = optional.get();
      if (w.getUserId() != user.getId()) {
        throw new RuntimeException("Not autherized for this request");
      }
      w.setTitle(title);
      Whiteboard updated = whiteboardRepository.save(w);
      logger.info("Whiteboard title updated successfully for id={}", id);
      return updated;
    }
    logger.error("Failed to update title - Whiteboard not found for id={}", id);
    throw new RuntimeException("Whiteboard not found");
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteWhiteboard(@PathVariable Long id, @CurrentUser User user) {

    logger.info("Attempting to delete whiteboard with id={} by userId={}", id, user.getId());

    Optional<Whiteboard> whiteboardOpt = whiteboardRepository.findByIdAndUserId(id, user.getId());

    if (whiteboardOpt.isEmpty()) {
      logger.warn(
          "Whiteboard not found or unauthorized access: id={}, userId={}", id, user.getId());
      return ResponseEntity.status(403).build();
    }

    whiteboardRepository.delete(whiteboardOpt.get());
    logger.info("Whiteboard deleted: id={}, userId={}", id, user.getId());

    return ResponseEntity.noContent().build();
  }
}
