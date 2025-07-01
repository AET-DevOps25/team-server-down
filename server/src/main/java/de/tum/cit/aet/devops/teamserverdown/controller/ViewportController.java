package de.tum.cit.aet.devops.teamserverdown.controller;

import de.tum.cit.aet.devops.teamserverdown.dto.ViewportCreateRequest;
import de.tum.cit.aet.devops.teamserverdown.model.Viewport;
import de.tum.cit.aet.devops.teamserverdown.repository.ViewportRepository;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/viewports")
public class ViewportController {

  private ViewportRepository viewportRepository;

  public ViewportController(ViewportRepository viewportRepository) {
    this.viewportRepository = viewportRepository;
  }

  @PostMapping
  public ResponseEntity<Viewport> createViewport(@RequestBody ViewportCreateRequest request) {
    Viewport viewport = new Viewport();
    viewport.setX(request.getX());
    viewport.setY(request.getY());
    viewport.setZoom(request.getZoom());
    viewport.setWhiteboardId(request.getWhiteboardId());

    Viewport saved = viewportRepository.save(viewport);
    return ResponseEntity.ok(saved);
  }

  @GetMapping("/whiteboard/{whiteboardId}")
  public ResponseEntity<Viewport> getViewportByWhiteboardId(@PathVariable Long whiteboardId) {
    return viewportRepository
        .findByWhiteboardId(whiteboardId)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/whiteboard/{whiteboardId}")
  public ResponseEntity<Viewport> updateViewportByWhiteboardId(
      @PathVariable Long whiteboardId, @RequestBody Viewport updated) {

    Optional<Viewport> optionalViewport = viewportRepository.findByWhiteboardId(whiteboardId);
    if (optionalViewport.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    Viewport existing = optionalViewport.get();
    existing.setX(updated.getX());
    existing.setY(updated.getY());
    existing.setZoom(updated.getZoom());

    viewportRepository.save(existing);
    return ResponseEntity.ok(existing);
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
