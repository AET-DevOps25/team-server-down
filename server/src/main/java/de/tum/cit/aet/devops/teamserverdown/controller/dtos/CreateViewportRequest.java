package de.tum.cit.aet.devops.teamserverdown.controller.dtos;

public class CreateViewportRequest {
  private double x;
  private double y;
  private double zoom;
  private Long whiteboardId;

  public double getX() {
    return x;
  }

  public void setX(double x) {
    this.x = x;
  }

  public double getY() {
    return y;
  }

  public void setY(double y) {
    this.y = y;
  }

  public double getZoom() {
    return zoom;
  }

  public void setZoom(double zoom) {
    this.zoom = zoom;
  }

  public Long getWhiteboardId() {
    return whiteboardId;
  }

  public void setWhiteboardId(Long whiteboardId) {
    this.whiteboardId = whiteboardId;
  }
}
