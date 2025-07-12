package de.tum.cit.aet.devops.teamserverdown.controller;

import de.tum.cit.aet.devops.teamserverdown.model.Edge;
import de.tum.cit.aet.devops.teamserverdown.repository.EdgeRepository;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/edge")
public class EdgeController {

  private final EdgeRepository edgeRepository;

  private static final Logger logger = LoggerFactory.getLogger(EdgeController.class);

  public EdgeController(EdgeRepository edgeRepository) {
    this.edgeRepository = edgeRepository;
  }

  @GetMapping("/whiteboard/{whiteboardId}")
  public ResponseEntity<List<Edge>> getEdgesByWhiteboard(@PathVariable long whiteboardId) {
    List<Edge> edges = edgeRepository.findAllByWhiteboardId(whiteboardId);
    return ResponseEntity.ok(edges);
  }

  @PostMapping
  public ResponseEntity<Edge> addEdge(@RequestBody Edge edge) {
    Edge savedEdge = edgeRepository.save(edge);
    return ResponseEntity.status(201).body(savedEdge);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteEdge(@PathVariable String id) {
    if (!edgeRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }
    edgeRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
