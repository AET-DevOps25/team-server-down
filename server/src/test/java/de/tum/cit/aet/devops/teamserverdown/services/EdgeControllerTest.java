package de.tum.cit.aet.devops.teamserverdown.services;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.tum.cit.aet.devops.teamserverdown.model.Edge;
import de.tum.cit.aet.devops.teamserverdown.repository.EdgeRepository;
import de.tum.cit.aet.devops.teamserverdown.services.config.AuthTestConfig;
import java.util.Arrays;
import java.util.List;
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
class EdgeControllerTest {

  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @MockitoBean private EdgeRepository edgeRepository;

  private Edge createTestEdge() {
    Edge edge = new Edge();
    edge.setId("test-edge-1");
    edge.setWhiteboardId(1L);
    edge.setSource("node-1");
    edge.setSourceHandle("handle-1");
    edge.setTarget("node-2");
    edge.setTargetHandle("handle-2");
    return edge;
  }

  @Test
  void testGetEdgesByWhiteboard() throws Exception {
    // Given
    long whiteboardId = 1L;
    List<Edge> edges = Arrays.asList(createTestEdge(), createTestEdge());
    edges.get(1).setId("test-edge-2");

    when(edgeRepository.findAllByWhiteboardId(whiteboardId)).thenReturn(edges);

    // When & Then
    mockMvc
        .perform(
            get("/edge/whiteboard/{whiteboardId}", whiteboardId)
                .header("Authorization", "Bearer Token"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(2)))
        .andExpect(jsonPath("$[0].id").value("test-edge-1"))
        .andExpect(jsonPath("$[1].id").value("test-edge-2"))
        .andExpect(jsonPath("$[0].whiteboardId").value(whiteboardId))
        .andExpect(jsonPath("$[0].source").value("node-1"))
        .andExpect(jsonPath("$[0].target").value("node-2"));

    verify(edgeRepository).findAllByWhiteboardId(whiteboardId);
  }

  @Test
  void testAddEdge() throws Exception {
    // Given
    Edge edge = createTestEdge();
    when(edgeRepository.save(any(Edge.class))).thenReturn(edge);

    // When & Then
    mockMvc
        .perform(
            post("/edge")
                .header("Authorization", "Bearer Token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(edge)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").value(edge.getId()))
        .andExpect(jsonPath("$.whiteboardId").value(edge.getWhiteboardId()))
        .andExpect(jsonPath("$.source").value(edge.getSource()))
        .andExpect(jsonPath("$.target").value(edge.getTarget()))
        .andExpect(jsonPath("$.sourceHandle").value(edge.getSourceHandle()))
        .andExpect(jsonPath("$.targetHandle").value(edge.getTargetHandle()));

    verify(edgeRepository).save(any(Edge.class));
  }

  @Test
  void testDeleteEdge_Success() throws Exception {
    // Given
    String edgeId = "test-edge-1";
    when(edgeRepository.existsById(edgeId)).thenReturn(true);
    doNothing().when(edgeRepository).deleteById(edgeId);

    // When & Then
    mockMvc
        .perform(delete("/edge/{id}", edgeId).header("Authorization", "Bearer Token"))
        .andExpect(status().isNoContent());

    verify(edgeRepository).existsById(edgeId);
    verify(edgeRepository).deleteById(edgeId);
  }

  @Test
  void testDeleteEdge_NotFound() throws Exception {
    // Given
    String edgeId = "non-existent-edge";
    when(edgeRepository.existsById(edgeId)).thenReturn(false);

    // When & Then
    mockMvc
        .perform(delete("/edge/{id}", edgeId).header("Authorization", "Bearer Token"))
        .andExpect(status().isNotFound());

    verify(edgeRepository).existsById(edgeId);
    verify(edgeRepository, never()).deleteById(anyString());
  }
}
