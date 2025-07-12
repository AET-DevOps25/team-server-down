package de.tum.cit.aet.devops.teamserverdown.model;

import jakarta.persistence.*;

@Entity
@Table(name = "viewports")
public class Viewport {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "x", nullable = false)
  private double x;

  @Column(name = "y", nullable = false)
  private double y;

  @Column(name = "zoom", nullable = false)
  private double zoom;

  @Column(name = "whiteboard_id", nullable = false)
  private long whiteboardId;

  public Viewport() {}

  public Viewport(double x, double y, double zoom, long whiteboardId) {
    this.x = x;
    this.y = y;
    this.zoom = zoom;
    this.whiteboardId = whiteboardId;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

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

  public long getWhiteboardId() {
    return whiteboardId;
  }

  public void setWhiteboardId(long whiteboardId) {
    this.whiteboardId = whiteboardId;
  }
}
