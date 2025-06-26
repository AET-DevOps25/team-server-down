package de.tum.cit.aet.devops.teamserverdown.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class Request {
  @JsonProperty("user_text")
  private List<String> userText;

  public Request(@JsonProperty("user_text") List<String> userText) {
    this.userText = userText;
  }

  public List<String> getUserText() {
    return userText;
  }

  public void setUserText(List<String> userText) {
    this.userText = userText;
  }

  @Override
  public String toString() {
      return String.format("{userText=%s}", userText);
  }
}
