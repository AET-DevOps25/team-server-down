package de.tum.cit.aet.devops.teamserverdown.security;

public class AuthenticatedUser {
  private final String userId;

  public AuthenticatedUser(String userId) {
    this.userId = userId;
  }

  public String getUserId() {
    return userId;
  }
}
