package de.tum.cit.aet.devops.teamserverdown.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import de.tum.cit.aet.devops.teamserverdown.client.LLMRestClient;

@Service
public class LLMServices {
    private static final Logger logger = LoggerFactory.getLogger(LLMServices.class);
    private final LLMRestClient llmRestClient;

    public LLMServices(LLMRestClient llmRestClient) {
        this.llmRestClient = llmRestClient;
        logger.info("LLMServices initialized");
    }

    public String getCompletionFromLLM(String userText) {
        try {
            logger.info("Processing completion request for text: {}", userText);
            String result = llmRestClient.generateCompletion(userText);
            logger.info("Received completion result: {}", result);
            return result;
        } catch (Exception e) {
            logger.error("Error fetching completion from LLM service: {}", e.getMessage());
            return "";
        }
    }

    public String getRephraseFromLLM(String userText) {
        try {
            logger.info("Processing rephrase request for text: {}", userText);
            logger.info("hind", llmRestClient.generateRephrase(userText));
            String result = llmRestClient.generateRephrase(userText);
            logger.info("Received rephrase result: {}", result);
            return result;
        } catch (Exception e) {
            logger.error("Error fetching rephrase from LLM service: {}", e.getMessage());
            return "";
        }
    }

    public String getSummarizationFromLLM(String userText) {
        try {
            logger.info("Processing summarization request for text: {}", userText);
            String result = llmRestClient.generateSummarization(userText);
            logger.info("Received summarization result: {}", result);
            return result;
        } catch (Exception e) {
            logger.error("Error fetching summarization from LLM service: {}", e.getMessage());
            return "";
        }
    }
}