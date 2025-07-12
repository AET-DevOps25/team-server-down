package de.tum.cit.aet.devops.teamserverdown.model;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(
    name = "user_whiteboard_access",
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "whiteboard_id"}))
public class UserWhiteboardAccess {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  @OnDelete(action = OnDeleteAction.CASCADE)
  private User user;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "whiteboard_id", nullable = false)
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Whiteboard whiteboard;

  public UserWhiteboardAccess() {}

  public UserWhiteboardAccess(User user, Whiteboard whiteboard) {
    this.user = user;
    this.whiteboard = whiteboard;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Whiteboard getWhiteboard() {
    return whiteboard;
  }

  public void setWhiteboard(Whiteboard whiteboard) {
    this.whiteboard = whiteboard;
  }
}
