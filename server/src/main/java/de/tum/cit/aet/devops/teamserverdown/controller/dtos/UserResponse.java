package de.tum.cit.aet.devops.teamserverdown.controller.dtos;

import de.tum.cit.aet.devops.teamserverdown.model.User;

public class UserResponse {
  private Long id;
  private String firstName;
  private String lastName;
  private String username;
  private String email;

  public static UserResponse fromEntity(User user) {
    UserResponse dto = new UserResponse();
    dto.id = user.getId();
    dto.firstName = user.getFirstName();
    dto.lastName = user.getLastName();
    dto.username = user.getUsername();
    dto.email = user.getEmail();
    return dto;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
}
