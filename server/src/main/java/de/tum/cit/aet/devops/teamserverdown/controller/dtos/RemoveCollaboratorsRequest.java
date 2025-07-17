package de.tum.cit.aet.devops.teamserverdown.controller.dtos;

import java.util.List;

public class RemoveCollaboratorsRequest {
  private List<Long> userIds;

  public List<Long> getUserIds() {
    return userIds;
  }

  public void setUserIds(List<Long> userIds) {
    this.userIds = userIds;
  }
}
