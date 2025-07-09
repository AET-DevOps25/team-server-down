package de.tum.cit.aet.devops.teamserverdown.services;

import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.tum.cit.aet.devops.teamserverdown.controller.WhiteboardController;
import de.tum.cit.aet.devops.teamserverdown.model.User;
import de.tum.cit.aet.devops.teamserverdown.model.Whiteboard;
import de.tum.cit.aet.devops.teamserverdown.repository.WhiteboardRepository;
import de.tum.cit.aet.devops.teamserverdown.services.config.AuthTestConfig;

import java.time.Instant;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

@SpringBootTest
@AutoConfigureMockMvc
@Import(AuthTestConfig.class)
public class WhiteboardTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private WhiteboardRepository whiteboardRepository;

    @Autowired
    private UserService userService;

    private User testUser;
    private Whiteboard testWhiteboard;

    private static final Logger logger = LoggerFactory.getLogger(WhiteboardTest.class);

    private Whiteboard createWhiteboard(Long id, String title, Long userId) {
        Whiteboard whiteboard = new Whiteboard(title, userId);
        whiteboard.setId(id);
        whiteboard.setCreatedAt(Instant.now());
        whiteboard.setLastUpdatedAt(Instant.now());
        return whiteboard;
    }


    @BeforeEach
    void setUp() {
        testUser = userService.getOrCreateUser(null);

        // Set up test whiteboard using the test user's ID
        testWhiteboard = new Whiteboard("Test Whiteboard", testUser.getId());
        testWhiteboard.setId(1L);
        testWhiteboard.setCreatedAt(Instant.now());
        testWhiteboard.setLastUpdatedAt(Instant.now());
    }

    @Test
    void testCreateWhiteboard() throws Exception {
        // Given
        String title = "New Whiteboard";

        ArgumentCaptor<Whiteboard> whiteboardCaptor = ArgumentCaptor.forClass(Whiteboard.class);

        when(whiteboardRepository.save(any(Whiteboard.class))).thenAnswer(invocation -> {
            Whiteboard savedWhiteboard = invocation.getArgument(0);
            savedWhiteboard.setId(1L);
            savedWhiteboard.setCreatedAt(Instant.now());
            savedWhiteboard.setLastUpdatedAt(Instant.now());
            return savedWhiteboard;
        });

        // When
        mockMvc.perform(post("/whiteboards")
                        .header("Authorization", "Bearer Token")
                        .param("title", title))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value(title))
                .andExpect(jsonPath("$.userId").value(testUser.getId()));

        // Then
        verify(whiteboardRepository).save(whiteboardCaptor.capture());
        Whiteboard capturedWhiteboard = whiteboardCaptor.getValue();

        assertEquals(title, capturedWhiteboard.getTitle(), "The whiteboard should be created with the provided title");
        assertEquals(testUser.getId(), capturedWhiteboard.getUserId(), "The whiteboard should be associated with the current user");
    }

    @Test
    void testGetWhiteboardById_Found() throws Exception {
        // Given
        Long whiteboardId = 1L;

        Whiteboard whiteboard = new Whiteboard("Test Whiteboard", testUser.getId());
        whiteboard.setId(whiteboardId);
        whiteboard.setCreatedAt(Instant.now());
        whiteboard.setLastUpdatedAt(Instant.now());

        when(whiteboardRepository.findByIdAndUserId(whiteboardId, testUser.getId()))
                .thenReturn(Optional.of(whiteboard));

        // When & Then
        mockMvc.perform(get("/whiteboards/{id}", whiteboardId)
                        .header("Authorization", "Bearer Token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(whiteboardId))
                .andExpect(jsonPath("$.title").value("Test Whiteboard"))
                .andExpect(jsonPath("$.userId").value(testUser.getId()));

        verify(whiteboardRepository).findByIdAndUserId(whiteboardId, testUser.getId());
    }

    @Test
    void testGetWhiteboardById_NotFound() throws Exception {
        // Given
        Long whiteboardId = 999L;

        when(whiteboardRepository.findByIdAndUserId(whiteboardId, testUser.getId()))
                .thenReturn(Optional.empty());

        // When & Then
        mockMvc.perform(get("/whiteboards/{id}", whiteboardId)
                        .header("Authorization", "Bearer Token"))
                .andExpect(status().isNotFound());

        verify(whiteboardRepository).findByIdAndUserId(whiteboardId, testUser.getId());
    }

    @Test
    void testGetUserWhiteboards() throws Exception {
        // Given
        List<Whiteboard> userWhiteboards = Arrays.asList(
                createWhiteboard(1L, "First Board", testUser.getId()),
                createWhiteboard(2L, "Second Board", testUser.getId())
        );

        when(whiteboardRepository.findByUserId(testUser.getId())).thenReturn(userWhiteboards);

        // When & Then
        mockMvc.perform(get("/whiteboards")
                        .header("Authorization", "Bearer Token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].title").value("First Board"))
                .andExpect(jsonPath("$[1].id").value(2L))
                .andExpect(jsonPath("$[1].title").value("Second Board"));

        verify(whiteboardRepository).findByUserId(testUser.getId());
    }

    @Test
    void testGetUserWhiteboards_Empty() throws Exception {
        // Given
        when(whiteboardRepository.findByUserId(testUser.getId())).thenReturn(Collections.emptyList());

        // When & Then
        mockMvc.perform(get("/whiteboards")
                        .header("Authorization", "Bearer Token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));

        verify(whiteboardRepository).findByUserId(testUser.getId());
    }

    @Test
    void testGetWhiteboardTitle_Found() throws Exception {
        // Given
        Long whiteboardId = 1L;
        Whiteboard whiteboard = createWhiteboard(whiteboardId, "Test Title", testUser.getId());

        when(whiteboardRepository.findByIdAndUserId(whiteboardId, testUser.getId()))
                .thenReturn(Optional.of(whiteboard));

        // When & Then
        mockMvc.perform(get("/whiteboards/{id}/title", whiteboardId)
                        .header("Authorization", "Bearer Token"))
                .andExpect(status().isOk())
                .andExpect(content().string("Test Title"));

        verify(whiteboardRepository).findByIdAndUserId(whiteboardId, testUser.getId());
    }

    @Test
    void testGetWhiteboardTitle_NotFound() throws Exception {
        // Given
        Long whiteboardId = 999L;

        when(whiteboardRepository.findByIdAndUserId(whiteboardId, testUser.getId()))
                .thenReturn(Optional.empty());

        // When & Then
        mockMvc.perform(get("/whiteboards/{id}/title", whiteboardId)
                        .header("Authorization", "Bearer Token"))
                .andExpect(status().isNotFound());

        verify(whiteboardRepository).findByIdAndUserId(whiteboardId, testUser.getId());
    }


    @Test
    void testUpdateTitle_Success() throws Exception {
        // Given
        Long whiteboardId = 1L;
        String newTitle = "Updated Title";

        Whiteboard existingWhiteboard = createWhiteboard(whiteboardId, "Original Title", testUser.getId());
        Whiteboard updatedWhiteboard = createWhiteboard(whiteboardId, newTitle, testUser.getId());

        when(whiteboardRepository.findById(whiteboardId)).thenReturn(Optional.of(existingWhiteboard));
        when(whiteboardRepository.save(any(Whiteboard.class))).thenReturn(updatedWhiteboard);

        // When & Then
        mockMvc.perform(put("/whiteboards/{id}/title", whiteboardId)
                        .header("Authorization", "Bearer Token")
                        .param("title", newTitle))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(whiteboardId))
                .andExpect(jsonPath("$.title").value(newTitle));

        verify(whiteboardRepository).findById(whiteboardId);

        ArgumentCaptor<Whiteboard> whiteboardCaptor = ArgumentCaptor.forClass(Whiteboard.class);
        verify(whiteboardRepository).save(whiteboardCaptor.capture());

        Whiteboard capturedWhiteboard = whiteboardCaptor.getValue();
        assertEquals(whiteboardId, capturedWhiteboard.getId());
        assertEquals(newTitle, capturedWhiteboard.getTitle());
        assertEquals(testUser.getId(), capturedWhiteboard.getUserId());
    }

    @Test
    void testUpdateTitle_NotFound() throws Exception {
        // Given
        Long whiteboardId = 999L;
        String newTitle = "Updated Title";

        when(whiteboardRepository.findById(whiteboardId)).thenReturn(Optional.empty());

        // When & Then
        mockMvc.perform(put("/whiteboards/{id}/title", whiteboardId)
                        .header("Authorization", "Bearer Token")
                        .param("title", newTitle))
                .andExpect(status().is4xxClientError());

        verify(whiteboardRepository).findById(whiteboardId);
        verify(whiteboardRepository, never()).save(any(Whiteboard.class));
    }


    @Test
    void testDeleteWhiteboard_Success() throws Exception {
        // Given
        Long whiteboardId = 1L;
        Whiteboard whiteboard = createWhiteboard(whiteboardId, "To Be Deleted", testUser.getId());

        when(whiteboardRepository.findByIdAndUserId(whiteboardId, testUser.getId()))
                .thenReturn(Optional.of(whiteboard));
        doNothing().when(whiteboardRepository).delete(any(Whiteboard.class));

        // When & Then
        mockMvc.perform(delete("/whiteboards/{id}", whiteboardId)
                        .header("Authorization", "Bearer Token"))
                .andExpect(status().isNoContent());

        // Verify repository interactions
        verify(whiteboardRepository).findByIdAndUserId(whiteboardId, testUser.getId());
        verify(whiteboardRepository).delete(whiteboard);
    }

    @Test
    void testDeleteWhiteboard_NotFound() throws Exception {
        // Given
        Long whiteboardId = 999L;

        when(whiteboardRepository.findByIdAndUserId(whiteboardId, testUser.getId()))
                .thenReturn(Optional.empty());

        // When & Then
        mockMvc.perform(delete("/whiteboards/{id}", whiteboardId)
                        .header("Authorization", "Bearer Token"))
                .andExpect(status().isForbidden()); // Returns 403 for not found/unauthorized

        verify(whiteboardRepository).findByIdAndUserId(whiteboardId, testUser.getId());
        verify(whiteboardRepository, never()).delete(any(Whiteboard.class));
    }



}