package de.tum.cit.aet.devops.teamserverdown.controller;

import de.tum.cit.aet.devops.teamserverdown.controller.dtos.UpdateNodeRequest;
import de.tum.cit.aet.devops.teamserverdown.model.Node;
import de.tum.cit.aet.devops.teamserverdown.repository.NodeRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/nodes")
public class NodeController {

  private final NodeRepository nodeRepository;

  public NodeController(NodeRepository nodeRepository) {
    this.nodeRepository = nodeRepository;
  }

  @GetMapping("/whiteboard/{whiteboardId}")
  public List<Node> getAllByWhiteboardId(@PathVariable long whiteboardId) {
    return nodeRepository.findByWhiteboardId(whiteboardId);
  }

  @PostMapping
  public Node createNode(@RequestBody Node node) {
    return nodeRepository.save(node);
  }

  @PatchMapping("/nodes/{id}")
  public ResponseEntity<Node> patchNode(
      @PathVariable String id, @RequestBody UpdateNodeRequest updateDTO) {
    Optional<Node> existingNodeOpt = nodeRepository.findById(id);

    if (existingNodeOpt.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    Node node = existingNodeOpt.get();

    if (updateDTO.getType() != null) node.setType(updateDTO.getType());
    if (updateDTO.getPositionX() != null) node.setPositionX(updateDTO.getPositionX());
    if (updateDTO.getPositionY() != null) node.setPositionY(updateDTO.getPositionY());
    if (updateDTO.getLabel() != null) node.setLabel(updateDTO.getLabel());
    if (updateDTO.getWidth() != null) node.setWidth(updateDTO.getWidth());
    if (updateDTO.getHeight() != null) node.setHeight(updateDTO.getHeight());
    if (updateDTO.getColor() != null) node.setColor(updateDTO.getColor());
    if (updateDTO.getBorderColor() != null) node.setBorderColor(updateDTO.getBorderColor());
    if (updateDTO.getBorderWidth() != null) node.setBorderWidth(updateDTO.getBorderWidth());
    if (updateDTO.getBorderOpacity() != null) node.setBorderOpacity(updateDTO.getBorderOpacity());
    if (updateDTO.getOpacity() != null) node.setOpacity(updateDTO.getOpacity());
    if (updateDTO.getTextColor() != null) node.setTextColor(updateDTO.getTextColor());
    if (updateDTO.getFontSize() != null) node.setFontSize(updateDTO.getFontSize());
    if (updateDTO.getFontFamily() != null) node.setFontFamily(updateDTO.getFontFamily());
    if (updateDTO.getIsBold() != null) node.setBold(updateDTO.getIsBold());
    if (updateDTO.getIsItalic() != null) node.setItalic(updateDTO.getIsItalic());
    if (updateDTO.getIsStrikethrough() != null)
      node.setStrikethrough(updateDTO.getIsStrikethrough());
    if (updateDTO.getIsUnderline() != null) node.setUnderline(updateDTO.getIsUnderline());

    nodeRepository.save(node);
    return ResponseEntity.ok(node);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteNode(@PathVariable String id) {
    if (!nodeRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }
    nodeRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
