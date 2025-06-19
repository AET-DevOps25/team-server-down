package de.tum.cit.aet.devops.teamserverdown.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import de.tum.cit.aet.devops.teamserverdown.service.LLMServices;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/llm")
@CrossOrigin(origins = "http://localhost:3000")
public class LLMServiceController {
    private final LLMServices llmServiceObj;

    public LLMServiceController(LLMServices llmServiceObj) {
        this.llmServiceObj = llmServiceObj;
    }

    @PostMapping("/completion")
    public ResponseEntity<Map<String, String>> completeText(@RequestBody Map<String, String[]> request) {
        try {
            String text = String.join(" ", request.get("user_text"));
            String completion = llmServiceObj.getCompletionFromLLM(text);
            
            Map<String, String> response = new HashMap<>();
            response.put("llm_response", completion);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    @PostMapping("/summarization")
    public ResponseEntity<Map<String, String>> summarizeText(@RequestBody Map<String, String[]> request) {
        try {
            String text = String.join(" ", request.get("user_text"));
            String summary = llmServiceObj.getSummarizationFromLLM(text);
            
            Map<String, String> response = new HashMap<>();
            response.put("llm_response", summary);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    @PostMapping("/rephrase")
    public ResponseEntity<Map<String, String>> rephraseText(@RequestBody Map<String, String[]> request) {
        try {
            String text = String.join(" ", request.get("user_text"));
            String rephrased = llmServiceObj.getRephraseFromLLM(text);
            
            Map<String, String> response = new HashMap<>();
            response.put("llm_response", rephrased);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
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
