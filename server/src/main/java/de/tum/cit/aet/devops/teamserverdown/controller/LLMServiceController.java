package de.tum.cit.aet.devops.teamserverdown.controller;

import de.tum.cit.aet.devops.teamserverdown.service.LLMServices;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3002")
public class LLMServiceController {
  private static final String USER_TEXT = "user_text";
  private static final String LLM_RESPONSE = "llm_response";
  private static final String ERROR = "error";

  private final LLMServices llmServiceObj;

  public LLMServiceController(LLMServices llmServiceObj) {
    this.llmServiceObj = llmServiceObj;
  }

  @GetMapping("/completion")
  public ResponseEntity<Map<String, String>> completeText(
      @RequestBody Map<String, String[]> request) {
    try {
      String text = String.join(" ", request.get(USER_TEXT));
      String completion = llmServiceObj.getCompletionFromLLM(text);

      Map<String, String> response = new HashMap<>();
      response.put(LLM_RESPONSE, completion);
      return ResponseEntity.ok(response);
    } catch (Exception e) {
      Map<String, String> error = new HashMap<>();
      error.put(ERROR, e.getMessage());
      return ResponseEntity.internalServerError().body(error);
    }
  }

  @GetMapping("/summarization")
  public ResponseEntity<Map<String, String>> summarizeText(
      @RequestBody Map<String, String[]> request) {
    try {
      String text = String.join(" ", request.get(USER_TEXT));
      String summary = llmServiceObj.getSummarizationFromLLM(text);

      Map<String, String> response = new HashMap<>();
      response.put(LLM_RESPONSE, summary);
      return ResponseEntity.ok(response);
    } catch (Exception e) {
      Map<String, String> error = new HashMap<>();
      error.put(ERROR, e.getMessage());
      return ResponseEntity.internalServerError().body(error);
    }
  }

  @GetMapping("/rephrase")
  public ResponseEntity<Map<String, String>> rephraseText(
      @RequestBody Map<String, String[]> request) {
    try {
      String text = String.join(" ", request.get(USER_TEXT));
      String rephrased = llmServiceObj.getRephraseFromLLM(text);

      Map<String, String> response = new HashMap<>();
      response.put(LLM_RESPONSE, rephrased);
      return ResponseEntity.ok(response);
    } catch (Exception e) {
      Map<String, String> error = new HashMap<>();
      error.put(ERROR, e.getMessage());
      return ResponseEntity.internalServerError().body(error);
    }
  }

  @GetMapping("/health")
  public ResponseEntity<Map<String, String>> healthCheck() {
    Map<String, String> status = new HashMap<>();
    status.put("status", "healthy");
    status.put("service", "LLM Service");
    return ResponseEntity.ok(status);
  }
}
