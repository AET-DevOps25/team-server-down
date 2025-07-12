package de.tum.cit.aet.devops.teamserverdown.controller;

import de.tum.cit.aet.devops.teamserverdown.controller.dtos.*;
import de.tum.cit.aet.devops.teamserverdown.model.User;
import de.tum.cit.aet.devops.teamserverdown.model.Viewport;
import de.tum.cit.aet.devops.teamserverdown.model.Whiteboard;
import de.tum.cit.aet.devops.teamserverdown.repository.EdgeRepository;
import de.tum.cit.aet.devops.teamserverdown.repository.NodeRepository;
import de.tum.cit.aet.devops.teamserverdown.repository.UserWhiteboardAccessRepository;
import de.tum.cit.aet.devops.teamserverdown.repository.ViewportRepository;
import de.tum.cit.aet.devops.teamserverdown.repository.WhiteboardRepository;
import de.tum.cit.aet.devops.teamserverdown.security.CurrentUser;
import de.tum.cit.aet.devops.teamserverdown.services.UserWhiteboardAccessService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/whiteboards")
@Tag(name = "Whiteboard", description = "Endpoints for managing whiteboards")
public class WhiteboardController {

  private static final Logger logger = LoggerFactory.getLogger(WhiteboardController.class);

  private final WhiteboardRepository whiteboardRepository;
  private final NodeRepository nodeRepository;
  private final EdgeRepository edgeRepository;
  private final ViewportRepository viewportRepository;
  private final UserWhiteboardAccessRepository userWhiteboardAccessRepository;
  private final UserWhiteboardAccessService userWhiteboardAccessService;

  public WhiteboardController(
      WhiteboardRepository whiteboardRepository,
      NodeRepository nodeRepository,
      EdgeRepository edgeRepository,
      ViewportRepository viewportRepository,
      UserWhiteboardAccessRepository userWhiteboardAccessRepository,
      UserWhiteboardAccessService userWhiteboardAccessService) {
    this.whiteboardRepository = whiteboardRepository;
    this.nodeRepository = nodeRepository;
    this.edgeRepository = edgeRepository;
    this.viewportRepository = viewportRepository;
    this.userWhiteboardAccessRepository = userWhiteboardAccessRepository;
    this.userWhiteboardAccessService = userWhiteboardAccessService;
  }

  @PostMapping
  @Operation(summary = "Create whiteboard", description = "Creates a new whiteboard for a user.")
  public ResponseEntity<WhiteboardResponse> createWhiteboard(
      @CurrentUser User user, @RequestParam String title) {
    logger.info("Creating whiteboard for userId={} with title='{}'", user.getId(), title);

    Whiteboard whiteboard = new Whiteboard(title, user);
    Whiteboard saved = whiteboardRepository.save(whiteboard);
    logger.info("Whiteboard created with id={}", saved.getId());

    WhiteboardResponse response = WhiteboardResponse.fromEntity(saved);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/{id}")
  public ResponseEntity<WhiteboardResponse> getWhiteboardById(
      @Parameter(description = "ID of the whiteboard", required = true) @PathVariable Long id,
      @CurrentUser User user) {

    logger.info("Fetching whiteboard with id={} for userId={}", id, user.getId());
    Optional<Whiteboard> whiteboardOpt = whiteboardRepository.findByIdAndUserId(id, user.getId());

    if (whiteboardOpt.isEmpty()) {
      logger.warn(
          "Whiteboard not found or unauthorized access for id={} and userId={}", id, user.getId());
      return ResponseEntity.status(404).build();
    }

    logger.info("Whiteboard found: id={}", id);
    WhiteboardResponse response = WhiteboardResponse.fromEntity(whiteboardOpt.get());
    return ResponseEntity.ok(response);
  }

  @GetMapping
  @Operation(
      summary = "Get whiteboards by user ID",
      description = "Returns a list of whiteboards for the current user.")
  public ResponseEntity<List<WhiteboardResponse>> getUserWhiteboards(@CurrentUser User user) {
    logger.info("Fetching all whiteboards for userId={}", user.getId());
    List<Whiteboard> ownedWhiteboards = whiteboardRepository.findByUserId(user.getId());
    List<Whiteboard> collaborativeWhiteboards =
        userWhiteboardAccessRepository.findWhiteboardsByUserId(user.getId());

    Set<Whiteboard> allAccessible = new HashSet<>(ownedWhiteboards);
    allAccessible.addAll(collaborativeWhiteboards);

    List<WhiteboardResponse> whiteboardResponseList = new ArrayList<>();
    for (Whiteboard whiteboard : allAccessible) {
      whiteboardResponseList.add(WhiteboardResponse.fromEntity(whiteboard));
    }

    return ResponseEntity.ok(whiteboardResponseList);
  }

  @GetMapping("/{id}/title")
  @Operation(
      summary = "Get whiteboard title",
      description = "Returns the title of a whiteboard by its ID")
  public ResponseEntity<String> getWhiteboardTitle(
      @Parameter(description = "ID of the whiteboard", required = true) @PathVariable Long id,
      @CurrentUser User user) {

    logger.info("Fetching title for whiteboard with id={} for userId={}", id, user.getId());
    Optional<Whiteboard> whiteboardOpt = whiteboardRepository.findByIdAndUserId(id, user.getId());

    if (whiteboardOpt.isPresent()) {
      Whiteboard whiteboard = whiteboardOpt.get();
      logger.info("Whiteboard found: id={}, title='{}'", id, whiteboard.getTitle());
      return ResponseEntity.ok(whiteboard.getTitle());
    } else {
      logger.warn(
          "Whiteboard not found or unauthorized access for id={} and userId={}", id, user.getId());
      return ResponseEntity.status(404).build();
    }
  }

  @PutMapping("/{id}/title")
  @Operation(summary = "Update title", description = "Updates the title of an existing whiteboard.")
  public ResponseEntity<String> updateTitle(
      @Parameter(description = "ID of the whiteboard", required = true) @PathVariable Long id,
      @RequestParam String title,
      @CurrentUser User user) {
    logger.info("Updating title for whiteboard id={} to '{}'", id, title);
    Optional<Whiteboard> whiteboardOpt = whiteboardRepository.findByIdAndUserId(id, user.getId());
    if (whiteboardOpt.isPresent()) {
      Whiteboard w = whiteboardOpt.get();
      w.setTitle(title);
      Whiteboard updated = whiteboardRepository.save(w);
      logger.info("Whiteboard title updated successfully for id={}", id);
      return ResponseEntity.ok(updated.getTitle());
    }
    logger.warn("Whiteboard not found or unauthorized access: id={}, userId={}", id, user.getId());
    return ResponseEntity.status(403).build();
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

  @GetMapping("/{id}/collaborators")
  public ResponseEntity<List<UserResponse>> getCollaborators(
      @Parameter(description = "ID of the whiteboard", required = true) @PathVariable Long id,
      @CurrentUser User user) {
    Optional<Whiteboard> whiteboardOpt = whiteboardRepository.findById(id);
    if (whiteboardOpt.isEmpty()) {
      logger.warn("Whiteboard not found: id={}", id);
      return ResponseEntity.status(404).build();
    }

    List<User> collaborators = userWhiteboardAccessRepository.findUsersByWhiteboardId(id);
    collaborators.add(whiteboardOpt.get().getUser());

    List<UserResponse> whiteboardUserListResponse = new ArrayList<>();
    for (User collaborator : collaborators) {
      whiteboardUserListResponse.add(UserResponse.fromEntity(collaborator));
    }

    return ResponseEntity.ok(whiteboardUserListResponse);
  }

  @PostMapping("/{id}/invitations")
  @Operation(summary = "Invite users to collaborate on the whiteboard")
  public ResponseEntity<Void> inviteCollaborators(
      @Parameter(description = "ID of the whiteboard", required = true) @PathVariable Long id,
      @Valid @RequestBody InviteCollaboratorsRequest inviteCollaboratorsRequest,
      @CurrentUser User user) {
    Optional<Whiteboard> whiteboardOpt = whiteboardRepository.findByIdAndUserId(id, user.getId());
    if (whiteboardOpt.isEmpty()) {
      logger.warn(
          "[Invitations] Whiteboard not found or unauthorized access: id={}, userId={}",
          id,
          user.getId());
      return ResponseEntity.status(403).build();
    }

    List<String> emails = inviteCollaboratorsRequest.getEmails();
    this.userWhiteboardAccessService.inviteUsersToWhiteboard(emails, whiteboardOpt.get().getId());

    return ResponseEntity.noContent().build();
  }

  @PostMapping("/{whiteboardId}/save")
  public ResponseEntity<Void> saveWhiteboardState(
      @PathVariable Long whiteboardId,
      @RequestBody SaveWhiteboardStateRequest saveWhiteboardStateRequest) {

    nodeRepository.deleteByWhiteboardId(whiteboardId);
    edgeRepository.deleteByWhiteboardId(whiteboardId);

    saveWhiteboardStateRequest.getNodes().forEach(node -> node.setWhiteboardId(whiteboardId));
    saveWhiteboardStateRequest.getEdges().forEach(edge -> edge.setWhiteboardId(whiteboardId));

    nodeRepository.saveAll(saveWhiteboardStateRequest.getNodes());
    edgeRepository.saveAll(saveWhiteboardStateRequest.getEdges());

    ViewportResponse viewportResponse = saveWhiteboardStateRequest.getViewportResponse();
    if (viewportResponse != null) {
      Optional<Viewport> existingOpt = viewportRepository.findByWhiteboardId(whiteboardId);

      if (existingOpt.isPresent()) {
        Viewport existing = existingOpt.get();
        existing.setX(viewportResponse.getX());
        existing.setY(viewportResponse.getY());
        existing.setZoom(viewportResponse.getZoom());
        viewportRepository.save(existing);
      } else {
        Viewport newViewport = new Viewport();
        newViewport.setX(viewportResponse.getX());
        newViewport.setY(viewportResponse.getY());
        newViewport.setZoom(viewportResponse.getZoom());
        newViewport.setWhiteboardId(whiteboardId);
        viewportRepository.save(newViewport);
      }
    }

    return ResponseEntity.ok().build();
  }
}
