package de.tum.cit.aet.devops.teamserverdown.dto;

import de.tum.cit.aet.devops.teamserverdown.model.Edge;
import de.tum.cit.aet.devops.teamserverdown.model.Node;
import java.util.List;

public class WhiteboardStateDto {

  private List<Node> nodes;
  private List<Edge> edges;
  private ViewportDto viewport;

  public List<Node> getNodes() {
    return nodes;
  }

  public void setNodes(List<Node> nodes) {
    this.nodes = nodes;
  }

  public List<Edge> getEdges() {
    return edges;
  }

  public void setEdges(List<Edge> edges) {
    this.edges = edges;
  }

  public ViewportDto getViewportDto() {
    return viewport;
  }

  public void setViewportDto(ViewportDto viewport) {
    this.viewport = viewport;
  }
}
