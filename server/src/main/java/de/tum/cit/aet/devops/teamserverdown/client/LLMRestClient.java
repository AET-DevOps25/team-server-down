package de.tum.cit.aet.devops.teamserverdown.client;

import de.tum.cit.aet.devops.teamserverdown.dto.Request;
import de.tum.cit.aet.devops.teamserverdown.dto.Response;
import de.tum.cit.aet.devops.teamserverdown.exception.LLMServiceException;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class LLMRestClient {

  private static final Logger logger = LoggerFactory.getLogger(LLMRestClient.class);
  private static final String ERROR_PREFIX = "Error calling LLM REST service: ";
  private final ObjectMapper objectMapper = new ObjectMapper();

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

  private Response sendPostRequest(String endpoint, @RequestBody Request request) {
    try {
        // Log request details
        logger.info("Sending POST request to endpoint: {}", endpoint);
        logger.info("Request body: userText={}", request);
        
        Response response = restClient.post()
            .uri(endpoint)
            .body(request) 
            .retrieve()
            .body(Response.class);
            
        // Log response
        logger.info("Received response: {}", response);
        return response;
    } catch (Exception ex) {
        logger.error("Failed to send POST request. Endpoint: {}, Request: {}", endpoint, request, ex);
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
