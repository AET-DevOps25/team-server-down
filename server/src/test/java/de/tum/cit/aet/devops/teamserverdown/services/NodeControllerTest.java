package de.tum.cit.aet.devops.teamserverdown.services;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.tum.cit.aet.devops.teamserverdown.controller.dtos.UpdateNodeRequest;
import de.tum.cit.aet.devops.teamserverdown.model.Node;
import de.tum.cit.aet.devops.teamserverdown.repository.NodeRepository;
import de.tum.cit.aet.devops.teamserverdown.services.config.AuthTestConfig;
import java.util.Arrays;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@Import(AuthTestConfig.class)
class NodeControllerTest {

  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @MockitoBean private NodeRepository nodeRepository;

  private Node createTestNode() {
    return new Node(
        "test-id",
        1L,
        "rectangle",
        100.0,
        100.0,
        "Test Node",
        200.0,
        150.0,
        "#ffffff",
        "#000000",
        1,
        1.0,
        1.0,
        "#000000",
        12,
        "Arial",
        false,
        false,
        false,
        false);
  }

  @Test
  void testGetAllByWhiteboardId() throws Exception {
    // Given
    long whiteboardId = 1L;
    Node node1 = createTestNode();
    Node node2 = createTestNode();
    node2.setId("test-id-2");

    when(nodeRepository.findByWhiteboardId(whiteboardId)).thenReturn(Arrays.asList(node1, node2));

    // When & Then
    mockMvc
        .perform(
            get("/nodes/whiteboard/{whiteboardId}", whiteboardId)
                .header("Authorization", "Bearer Token"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(2)))
        .andExpect(jsonPath("$[0].id").value("test-id"))
        .andExpect(jsonPath("$[1].id").value("test-id-2"));

    verify(nodeRepository).findByWhiteboardId(whiteboardId);
  }

  @Test
  void testCreateNode() throws Exception {
    // Given
    Node node = createTestNode();
    when(nodeRepository.save(any(Node.class))).thenReturn(node);

    // When & Then
    mockMvc
        .perform(
            post("/nodes")
                .header("Authorization", "Bearer Token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(node)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value("test-id"))
        .andExpect(jsonPath("$.type").value("rectangle"));

    verify(nodeRepository).save(any(Node.class));
  }

  @Test
  void testPatchNode_Success() throws Exception {
    // Given
    String nodeId = "test-id";
    Node existingNode = createTestNode();
    UpdateNodeRequest updateRequest = new UpdateNodeRequest();
    updateRequest.setLabel("Updated Label");
    updateRequest.setColor("#000000");

    when(nodeRepository.findById(nodeId)).thenReturn(Optional.of(existingNode));
    when(nodeRepository.save(any(Node.class))).thenReturn(existingNode);

    // When & Then
    mockMvc
        .perform(
            patch("/nodes/nodes/{id}", nodeId)
                .header("Authorization", "Bearer Token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateRequest)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.label").value("Updated Label"))
        .andExpect(jsonPath("$.color").value("#000000"));

    verify(nodeRepository).findById(nodeId);
    verify(nodeRepository).save(any(Node.class));
  }

  @Test
  void testPatchNode_NotFound() throws Exception {
    // Given
    String nodeId = "non-existent-id";
    UpdateNodeRequest updateRequest = new UpdateNodeRequest();
    updateRequest.setLabel("Updated Label");

    when(nodeRepository.findById(nodeId)).thenReturn(Optional.empty());

    // When & Then
    mockMvc
        .perform(
            patch("/nodes/nodes/{id}", nodeId)
                .header("Authorization", "Bearer Token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateRequest)))
        .andExpect(status().isNotFound());

    verify(nodeRepository).findById(nodeId);
    verify(nodeRepository, never()).save(any(Node.class));
  }

  @Test
  void testDeleteNode_Success() throws Exception {
    // Given
    String nodeId = "test-id";
    when(nodeRepository.existsById(nodeId)).thenReturn(true);
    doNothing().when(nodeRepository).deleteById(nodeId);

    // When & Then
    mockMvc
        .perform(delete("/nodes/{id}", nodeId).header("Authorization", "Bearer Token"))
        .andExpect(status().isNoContent());

    verify(nodeRepository).existsById(nodeId);
    verify(nodeRepository).deleteById(nodeId);
  }

  @Test
  void testDeleteNode_NotFound() throws Exception {
    // Given
    String nodeId = "non-existent-id";
    when(nodeRepository.existsById(nodeId)).thenReturn(false);

    // When & Then
    mockMvc
        .perform(delete("/nodes/{id}", nodeId).header("Authorization", "Bearer Token"))
        .andExpect(status().isNotFound());

    verify(nodeRepository).existsById(nodeId);
    verify(nodeRepository, never()).deleteById(anyString());
  }
}
