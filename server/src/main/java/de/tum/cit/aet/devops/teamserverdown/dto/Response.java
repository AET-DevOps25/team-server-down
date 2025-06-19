package de.tum.cit.aet.devops.teamserverdown.dto;

public class Response { 
    private String llm_response;

    public Response() {
    }

    public Response(String llm_response) {
        this.llm_response = llm_response;
    }

    public String getLlm_response() {
        return llm_response;
    }

    public void setLlm_response(String llm_response) {
        this.llm_response = llm_response;
    }
}