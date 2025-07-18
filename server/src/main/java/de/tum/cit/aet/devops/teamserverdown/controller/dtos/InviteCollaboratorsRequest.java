package de.tum.cit.aet.devops.teamserverdown.controller.dtos;

import java.util.List;

public class InviteCollaboratorsRequest {
  private List<String> emails;

  public List<String> getEmails() {
    return emails;
  }

  public void setEmails(List<String> emails) {
    this.emails = emails;
  }
}
