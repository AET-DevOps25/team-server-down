package de.tum.cit.aet.devops.teamserverdown.controller;

import de.tum.cit.aet.devops.teamserverdown.model.Viewport;
import de.tum.cit.aet.devops.teamserverdown.repository.ViewportRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/viewports")
public class ViewportController {

  private final ViewportRepository viewportRepository;

  public ViewportController(ViewportRepository viewportRepository) {
    this.viewportRepository = viewportRepository;
  }

  @GetMapping("/whiteboard/{whiteboardId}")
  public ResponseEntity<Viewport> getViewportByWhiteboardId(@PathVariable Long whiteboardId) {
    return viewportRepository
        .findByWhiteboardId(whiteboardId)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteViewport(@PathVariable Long id) {
    if (!viewportRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }
    viewportRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
