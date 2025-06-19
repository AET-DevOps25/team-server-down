package de.tum.cit.aet.devops.teamserverdown.dto;

import java.util.List;

public class Request { 
    private List<String> user_text;

    public Request(List<String> user_text) {
        this.user_text = user_text;
    }

    public List<String> getUser_text() {
        return user_text;
    }

    public void setUser_text(List<String> user_text) {
        this.user_text = user_text;
    }
}