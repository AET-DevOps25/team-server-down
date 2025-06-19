package de.tum.cit.aet.devops.teamserverdown.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import de.tum.cit.aet.devops.teamserverdown.dto.Request;
import de.tum.cit.aet.devops.teamserverdown.dto.Response;
import java.util.List;

@Component
public class LLMRestClient {

    private final RestClient restClient;

    public LLMRestClient(RestClient.Builder builder, @Value("${llm.service.url:http://localhost:5003}") String llmServiceUrl) {
        this.restClient = builder
                .baseUrl(llmServiceUrl)
                .build();
    }

    public String generateCompletion(String text) {
        try {
            Request request = new Request(List.of(text));
            Response response = restClient.post()
                .uri("/completion")
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(Response.class);

            if (response == null) {
                throw new RuntimeException("Null response from LLM service");
            }

            String result = response.getLlm_response();

            if (result == null || result.isEmpty()) {
                throw new RuntimeException("Empty response from LLM service");
            }

            return result;

        } catch (Exception e) {
            System.err.println("Error calling LLM REST service: " + e.getMessage());
            return "";
        }
    }

    public String generateRephrase(String text) {
        try {
            Request request = new Request(List.of(text));

            Response response;
            try {
                response = restClient.post()
                    .uri("/rephrase")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(request)
                    .retrieve()
                    .body(Response.class);

            } catch (Exception ex) {
                throw new RuntimeException("Error retrieving response from LLM service: " + ex.getMessage(), ex);
            }

            if (response == null || response.getLlm_response() == null || response.getLlm_response().isEmpty()) {
                throw new RuntimeException("Invalid or empty response from LLM service");
            }

            return response.getLlm_response();

        } catch (Exception e) {
            System.err.println("Error calling LLM REST service: " + e.getMessage());
            throw new RuntimeException("Failed to generate rephrase: " + e.getMessage(), e);
        }
    }

    public String generateSummarization(String text) {
        try {
            Request request = new Request(List.of(text));
            Response response = restClient.post()
                .uri("/summarization")
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(Response.class);

            return response != null ? response.getLlm_response() : "";

        } catch (Exception e) {
            System.err.println("Error calling LLM REST service: " + e.getMessage());
            return "";
        }
    }
}
