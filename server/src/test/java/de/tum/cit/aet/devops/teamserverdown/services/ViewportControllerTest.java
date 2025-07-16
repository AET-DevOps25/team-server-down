package de.tum.cit.aet.devops.teamserverdown.services;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import de.tum.cit.aet.devops.teamserverdown.model.Viewport;
import de.tum.cit.aet.devops.teamserverdown.repository.ViewportRepository;
import de.tum.cit.aet.devops.teamserverdown.services.config.AuthTestConfig;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@Import(AuthTestConfig.class)
class ViewportControllerTest {

  @Autowired private MockMvc mockMvc;

  @MockitoBean private ViewportRepository viewportRepository;

  private Viewport createTestViewport() {
    Viewport viewport = new Viewport(100.0, 200.0, 1.5, 1L);
    viewport.setId(1L);
    return viewport;
  }

  @Test
  void testGetViewportByWhiteboardId_Found() throws Exception {
    // Given
    Long whiteboardId = 1L;
    Viewport viewport = createTestViewport();

    when(viewportRepository.findByWhiteboardId(whiteboardId)).thenReturn(Optional.of(viewport));

    // When & Then
    mockMvc
        .perform(
            get("/api/viewports/whiteboard/{whiteboardId}", whiteboardId)
                .header("Authorization", "Bearer Token"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(viewport.getId()))
        .andExpect(jsonPath("$.x").value(viewport.getX()))
        .andExpect(jsonPath("$.y").value(viewport.getY()))
        .andExpect(jsonPath("$.zoom").value(viewport.getZoom()))
        .andExpect(jsonPath("$.whiteboardId").value(viewport.getWhiteboardId()));

    verify(viewportRepository).findByWhiteboardId(whiteboardId);
  }

  @Test
  void testGetViewportByWhiteboardId_NotFound() throws Exception {
    // Given
    Long whiteboardId = 999L;
    when(viewportRepository.findByWhiteboardId(whiteboardId)).thenReturn(Optional.empty());

    // When & Then
    mockMvc
        .perform(
            get("/api/viewports/whiteboard/{whiteboardId}", whiteboardId)
                .header("Authorization", "Bearer Token"))
        .andExpect(status().isNotFound());

    verify(viewportRepository).findByWhiteboardId(whiteboardId);
  }

  @Test
  void testDeleteViewport_Success() throws Exception {
    // Given
    Long viewportId = 1L;
    when(viewportRepository.existsById(viewportId)).thenReturn(true);
    doNothing().when(viewportRepository).deleteById(viewportId);

    // When & Then
    mockMvc
        .perform(delete("/api/viewports/{id}", viewportId).header("Authorization", "Bearer Token"))
        .andExpect(status().isNoContent());

    verify(viewportRepository).existsById(viewportId);
    verify(viewportRepository).deleteById(viewportId);
  }

  @Test
  void testDeleteViewport_NotFound() throws Exception {
    // Given
    Long viewportId = 999L;
    when(viewportRepository.existsById(viewportId)).thenReturn(false);

    // When & Then
    mockMvc
        .perform(delete("/api/viewports/{id}", viewportId).header("Authorization", "Bearer Token"))
        .andExpect(status().isNotFound());

    verify(viewportRepository).existsById(viewportId);
    verify(viewportRepository, never()).deleteById(any());
  }
}
