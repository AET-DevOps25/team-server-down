package de.tum.cit.aet.devops.teamserverdown.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import java.time.LocalDateTime;

@Entity
public class Whiteboard {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;

  private LocalDateTime creationTime;

  private LocalDateTime lastEditedTime;

  private Long userId;

  public Whiteboard() {}

  public Whiteboard(String title, Long userId) {
    this.title = title;
    this.userId = userId;
    this.creationTime = LocalDateTime.now();
    this.lastEditedTime = this.creationTime;
  }

  @PrePersist
  protected void onCreate() {
    this.creationTime = LocalDateTime.now();
    this.lastEditedTime = this.creationTime;
  }

  @PreUpdate
  protected void onUpdate() {
    this.lastEditedTime = LocalDateTime.now();
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

  public LocalDateTime getCreationTime() {
    return creationTime;
  }

  public void setCreationTime(LocalDateTime creationTime) {
    this.creationTime = creationTime;
  }

  public LocalDateTime getLastEditedTime() {
    return lastEditedTime;
  }

  public void setLastEditedTime(LocalDateTime lastEditedTime) {
    this.lastEditedTime = lastEditedTime;
  }

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }
}
