package de.tum.cit.aet.devops.teamserverdown.client;

import de.tum.cit.aet.devops.teamserverdown.dto.Request;
import de.tum.cit.aet.devops.teamserverdown.dto.Response;
import de.tum.cit.aet.devops.teamserverdown.exception.LLMServiceException;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class LLMRestClient {

  private static final Logger logger = LoggerFactory.getLogger(LLMRestClient.class);
  private static final String ERROR_PREFIX = "Error calling LLM REST service: ";

  private final RestClient restClient;

  public LLMRestClient(
      RestClient.Builder builder,
      @Value("${llm.service.url:http://genai:8000}") String llmServiceUrl) {
    logger.info("Initializing LLM client with URL: {}", llmServiceUrl);
    this.restClient = builder.baseUrl(llmServiceUrl).build();
  }

  public String generateCompletion(String text) {
    try {
      Request request = new Request(List.of(text));
      Response response = sendPostRequest("/completion", request);

      validateResponse(response);
      return response.getLlmResponse();

    } catch (Exception e) {
      logger.error(ERROR_PREFIX + e.getMessage(), e);
      return "";
    }
  }

  public String generateRephrase(String text) {
    try {
      Request request = new Request(List.of(text));
      Response response = sendPostRequest("/rephrase", request);

      validateResponse(response);
      return response.getLlmResponse();

    } catch (Exception e) {
      logger.error(
          ERROR_PREFIX + "Failed to generate rephrase. Input length: {}. Message: {}",
          text.length(),
          e.getMessage(),
          e);
      return "";
    }
  }

  public String generateSummarization(String text) {
    try {
      Request request = new Request(List.of(text));
      Response response = sendPostRequest("/summarization", request);

      return response != null ? response.getLlmResponse() : "";

    } catch (Exception e) {
      logger.error(ERROR_PREFIX + e.getMessage(), e);
      return "";
    }
  }

  private Response sendPostRequest(String endpoint, Request request) {
    try {
      return restClient
          .get()
          .uri(endpoint)
          .retrieve()
          .body(Response.class);
    } catch (Exception ex) {
      throw new LLMServiceException("Error retrieving response from LLM service", ex);
    }
  }

  private void validateResponse(Response response) {
    if (response == null
        || response.getLlmResponse() == null
        || response.getLlmResponse().isEmpty()) {
      throw new LLMServiceException("Invalid or empty response from LLM service");
    }
  }
}
