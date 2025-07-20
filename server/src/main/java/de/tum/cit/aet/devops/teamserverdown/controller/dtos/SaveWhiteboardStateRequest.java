package de.tum.cit.aet.devops.teamserverdown.controller.dtos;

import de.tum.cit.aet.devops.teamserverdown.model.Edge;
import de.tum.cit.aet.devops.teamserverdown.model.Node;
import java.util.List;

public class SaveWhiteboardStateRequest {

  private List<Node> nodes;
  private List<Edge> edges;
  private ViewportResponse viewport;

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

  public ViewportResponse getViewportResponse() {
    return viewport;
  }

  public void setViewportResponse(ViewportResponse viewport) {
    this.viewport = viewport;
  }
}
