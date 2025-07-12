package de.tum.cit.aet.devops.teamserverdown.controller.dtos;

import de.tum.cit.aet.devops.teamserverdown.model.User;
import de.tum.cit.aet.devops.teamserverdown.model.Whiteboard;
import java.time.Instant;

public class WhiteboardResponse {
  private Long id;
  private String title;
  private User user;
  private Instant createdAt;
  private Instant lastUpdatedAt;

  public static WhiteboardResponse fromEntity(Whiteboard whiteboard) {
    WhiteboardResponse dto = new WhiteboardResponse();
    dto.id = whiteboard.getId();
    dto.title = whiteboard.getTitle();
    dto.createdAt = whiteboard.getCreatedAt();
    dto.lastUpdatedAt = whiteboard.getLastUpdatedAt();
    dto.user = whiteboard.getUser();
    return dto;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Instant createdAt) {
    this.createdAt = createdAt;
  }

  public Instant getLastUpdatedAt() {
    return lastUpdatedAt;
  }

  public void setLastUpdatedAt(Instant lastUpdatedAt) {
    this.lastUpdatedAt = lastUpdatedAt;
  }
}
