package de.tum.cit.aet.devops.teamserverdown.model;

import jakarta.persistence.*;

@Entity
@Table(name = "edges")
public class Edge {

  @Id private String id;

  @Column(name = "whiteboard_id", nullable = false)
  private long whiteboardId;

  @Column(name = "source")
  private String source;

  @Column(name = "source_handle")
  private String sourceHandle;

  @Column(name = "target")
  private String target;

  @Column(name = "target_handle")
  private String targetHandle;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getSource() {
    return source;
  }

  public void setSource(String source) {
    this.source = source;
  }

  public String getSourceHandle() {
    return sourceHandle;
  }

  public void setSourceHandle(String sourceHandle) {
    this.sourceHandle = sourceHandle;
  }

  public String getTarget() {
    return target;
  }

  public void setTarget(String target) {
    this.target = target;
  }

  public String getTargetHandle() {
    return targetHandle;
  }

  public void setTargetHandle(String targetHandle) {
    this.targetHandle = targetHandle;
  }

  public long getWhiteboardId() {
    return whiteboardId;
  }

  public void setWhiteboardId(long whiteboardId) {
    this.whiteboardId = whiteboardId;
  }
}
