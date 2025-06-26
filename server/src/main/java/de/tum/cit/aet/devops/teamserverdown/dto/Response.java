package de.tum.cit.aet.devops.teamserverdown.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Response {
  @JsonProperty("llm_response")
  private String llmResponse;

  public Response() {}

  public Response(@JsonProperty("llm_response") String llmResponse) {
    this.llmResponse = llmResponse;
  }

  public String getLlmResponse() {
    return llmResponse;
  }

  public void setLlmResponse(String llmResponse) {
    this.llmResponse = llmResponse;
  }
}
