package de.tum.cit.aet.devops.teamserverdown.dto;

public class CreateWhiteboardRequest {
    public Long userId;
    public String title;

    // Optional: Constructors, Getters, Setters (for serialization frameworks like Jackson)
    public CreateWhiteboardRequest() {}

    public CreateWhiteboardRequest(Long userId, String title) {
        this.userId = userId;
        this.title = title;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
