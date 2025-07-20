package de.tum.cit.aet.devops.teamserverdown.services;

import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.tum.cit.aet.devops.teamserverdown.controller.dtos.SaveWhiteboardStateRequest;
import de.tum.cit.aet.devops.teamserverdown.controller.dtos.ViewportResponse;
import de.tum.cit.aet.devops.teamserverdown.model.*;
import de.tum.cit.aet.devops.teamserverdown.repository.*;
import de.tum.cit.aet.devops.teamserverdown.services.config.AuthTestConfig;
import java.time.Instant;
import java.util.*;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
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
public class WhiteboardTest {

  @Autowired private MockMvc mockMvc;
  @Autowired private ObjectMapper objectMapper;
  @MockitoBean private WhiteboardRepository whiteboardRepository;
  @MockitoBean private UserWhiteboardAccessService userWhiteboardAccessService;
  @MockitoBean private UserWhiteboardAccessRepository userWhiteboardAccessRepository;
  @MockitoBean private ViewportRepository viewportRepository;
  @MockitoBean private NodeRepository nodeRepository;
  @MockitoBean private EdgeRepository edgeRepository;
  @Autowired private UserService userService;

  // Helpers
  private Whiteboard createWhiteboard(Long id, String title, User user) {
    Whiteboard whiteboard = new Whiteboard(title, user);
    whiteboard.setId(id);
    whiteboard.setCreatedAt(Instant.now());
    whiteboard.setLastUpdatedAt(Instant.now());
    return whiteboard;
  }

  private Node createTestNode(String id, Long whiteboardId) {
    Node node = new Node();
    node.setId(id);
    node.setWhiteboardId(whiteboardId);
    node.setType("rectangle");
    node.setPositionX(0.0);
    node.setPositionY(0.0);
    node.setWidth(100.0);
    node.setHeight(100.0);
    return node;
  }

  private Edge createTestEdge(String id, Long whiteboardId, String source, String target) {
    Edge edge = new Edge();
    edge.setId(id);
    edge.setWhiteboardId(whiteboardId);
    edge.setSource(source);
    edge.setTarget(target);
    edge.setSourceHandle("handle1");
    edge.setTargetHandle("handle2");
    return edge;
  }

  @Test
  void testCreateWhiteboard() throws Exception {
    // Given
    String title = "New Whiteboard";
    User user = userService.getOrCreateUser(any());
    ArgumentCaptor<Whiteboard> whiteboardCaptor = ArgumentCaptor.forClass(Whiteboard.class);

    when(whiteboardRepository.save(any(Whiteboard.class)))
        .thenAnswer(
            invocation -> {
              Whiteboard savedWhiteboard = invocation.getArgument(0);
              savedWhiteboard.setId(1L);
              savedWhiteboard.setCreatedAt(Instant.now());
              savedWhiteboard.setLastUpdatedAt(Instant.now());
              return savedWhiteboard;
            });

    // When & Then
    mockMvc
        .perform(post("/whiteboards").header("Authorization", "Bearer Token").param("title", title))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.title").value(title))
        .andExpect(jsonPath("$.user.id").value(user.getId()));

    verify(whiteboardRepository).save(whiteboardCaptor.capture());
    Whiteboard capturedWhiteboard = whiteboardCaptor.getValue();
    assertEquals(title, capturedWhiteboard.getTitle());
    assertEquals(user.getId(), capturedWhiteboard.getUser().getId());
  }

  @Test
  void testGetWhiteboardById_Found() throws Exception {
    // Given
    Long whiteboardId = 1L;
    User user = userService.getOrCreateUser(any());
    Whiteboard whiteboard = createWhiteboard(whiteboardId, "Test Whiteboard", user);

    when(userWhiteboardAccessService.getUserWhiteboardById(user.getId(), whiteboardId))
        .thenReturn(Optional.of(whiteboard));

    // When & Then
    mockMvc
        .perform(get("/whiteboards/{id}", whiteboardId).header("Authorization", "Bearer Token"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(whiteboardId))
        .andExpect(jsonPath("$.title").value("Test Whiteboard"))
        .andExpect(jsonPath("$.user.id").value(user.getId()));

    verify(userWhiteboardAccessService).getUserWhiteboardById(user.getId(), whiteboardId);
  }

  @Test
  void testGetWhiteboardById_NotFound() throws Exception {
    // Given
    Long whiteboardId = 999L;
    User user = userService.getOrCreateUser(any());

    when(userWhiteboardAccessService.getUserWhiteboardById(user.getId(), whiteboardId))
        .thenReturn(Optional.empty());

    // When & Then
    mockMvc
        .perform(get("/whiteboards/{id}", whiteboardId).header("Authorization", "Bearer Token"))
        .andExpect(status().isNotFound());

    verify(userWhiteboardAccessService).getUserWhiteboardById(user.getId(), whiteboardId);
  }

  @Test
  void testGetUserWhiteboards() throws Exception {
    // Given
    User user = userService.getOrCreateUser(any());
    List<Whiteboard> ownedWhiteboards =
        Arrays.asList(
            createWhiteboard(1L, "First Board", user), createWhiteboard(2L, "Second Board", user));
    List<Whiteboard> collaborativeWhiteboards = List.of(createWhiteboard(3L, "Shared Board", user));

    Set<Whiteboard> allAccessible = new HashSet<>(ownedWhiteboards);
    allAccessible.addAll(collaborativeWhiteboards);
    when(userWhiteboardAccessService.getUserWhiteboards(user.getId())).thenReturn(allAccessible);

    // When & Then
    mockMvc
        .perform(get("/whiteboards").header("Authorization", "Bearer Token"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(3)))
        .andExpect(jsonPath("$[*].id").value(containsInAnyOrder(1, 2, 3)))
        .andExpect(
            jsonPath("$[*].title")
                .value(containsInAnyOrder("First Board", "Second Board", "Shared Board")));

    verify(userWhiteboardAccessService).getUserWhiteboards(user.getId());
  }

  @Test
  void testGetUserWhiteboards_Empty() throws Exception {
    // Given
    User user = userService.getOrCreateUser(any());
    when(userWhiteboardAccessService.getUserWhiteboards(user.getId())).thenReturn(new HashSet<>());

    // When & Then
    mockMvc
        .perform(get("/whiteboards").header("Authorization", "Bearer Token"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(0)));

    verify(userWhiteboardAccessService).getUserWhiteboards(user.getId());
  }

  @Test
  void testGetWhiteboardTitle_Found() throws Exception {
    // Given
    Long whiteboardId = 1L;
    User user = userService.getOrCreateUser(any());
    Whiteboard whiteboard = createWhiteboard(whiteboardId, "Test Title", user);

    when(userWhiteboardAccessService.getUserWhiteboardById(user.getId(), whiteboardId))
        .thenReturn(Optional.of(whiteboard));

    // When & Then
    mockMvc
        .perform(
            get("/whiteboards/{id}/title", whiteboardId).header("Authorization", "Bearer Token"))
        .andExpect(status().isOk())
        .andExpect(content().string("Test Title"));

    verify(userWhiteboardAccessService).getUserWhiteboardById(user.getId(), whiteboardId);
  }

  @Test
  void testGetWhiteboardTitle_NotFound() throws Exception {
    // Given
    Long whiteboardId = 999L;
    User user = userService.getOrCreateUser(any());

    when(userWhiteboardAccessService.getUserWhiteboardById(user.getId(), whiteboardId))
        .thenReturn(Optional.empty());

    // When & Then
    mockMvc
        .perform(
            get("/whiteboards/{id}/title", whiteboardId).header("Authorization", "Bearer Token"))
        .andExpect(status().isNotFound());

    verify(userWhiteboardAccessService).getUserWhiteboardById(user.getId(), whiteboardId);
  }

  @Test
  void testGetCollaborators_Success() throws Exception {
    // Given
    Long whiteboardId = 1L;
    User owner = userService.getOrCreateUser(any());
    Whiteboard whiteboard = createWhiteboard(whiteboardId, "Test Whiteboard", owner);
    List<User> collaborators =
        Arrays.asList(
            new User(2L, "Jane", "Doe", "jane", "jane@example.com"),
            new User(3L, "Bob", "Smith", "bob", "bob@example.com"));

    when(whiteboardRepository.findById(whiteboardId)).thenReturn(Optional.of(whiteboard));
    when(userWhiteboardAccessRepository.findUsersByWhiteboardId(whiteboardId))
        .thenReturn(collaborators);

    // When & Then
    mockMvc
        .perform(
            get("/whiteboards/{id}/collaborators", whiteboardId)
                .header("Authorization", "Bearer Token"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(3)))
        .andExpect(jsonPath("$[*].id").value(containsInAnyOrder(owner.getId().intValue(), 2, 3)))
        .andExpect(
            jsonPath("$[*].email")
                .value(
                    containsInAnyOrder(owner.getEmail(), "jane@example.com", "bob@example.com")));

    verify(whiteboardRepository).findById(whiteboardId);
    verify(userWhiteboardAccessRepository).findUsersByWhiteboardId(whiteboardId);
  }

  @Test
  void testGetCollaborators_NotFound() throws Exception {
    // Given
    Long whiteboardId = 999L;
    when(whiteboardRepository.findById(whiteboardId)).thenReturn(Optional.empty());

    // When & Then
    mockMvc
        .perform(
            get("/whiteboards/{id}/collaborators", whiteboardId)
                .header("Authorization", "Bearer Token"))
        .andExpect(status().isNotFound());

    verify(whiteboardRepository).findById(whiteboardId);
    verify(userWhiteboardAccessRepository, never()).findUsersByWhiteboardId(any());
  }

  @Test
  void testInviteCollaborators_Success() throws Exception {
    // Given
    Long whiteboardId = 1L;
    User user = userService.getOrCreateUser(any());
    Whiteboard whiteboard = createWhiteboard(whiteboardId, "Test Whiteboard", user);
    List<String> emails = Arrays.asList("user1@example.com", "user2@example.com");

    when(whiteboardRepository.findByIdAndUserId(whiteboardId, user.getId()))
        .thenReturn(Optional.of(whiteboard));
    doNothing().when(userWhiteboardAccessService).inviteUsersToWhiteboard(emails, whiteboardId);

    // When & Then
    mockMvc
        .perform(
            post("/whiteboards/{id}/invitations", whiteboardId)
                .header("Authorization", "Bearer Token")
                .contentType("application/json")
                .content("{\"emails\":[\"user1@example.com\",\"user2@example.com\"]}"))
        .andExpect(status().isNoContent());

    verify(whiteboardRepository).findByIdAndUserId(whiteboardId, user.getId());
    verify(userWhiteboardAccessService).inviteUsersToWhiteboard(emails, whiteboardId);
  }

  @Test
  void testRemoveCollaborators_Success() throws Exception {
    // Given
    Long whiteboardId = 1L;
    User user = userService.getOrCreateUser(any());
    Whiteboard whiteboard = createWhiteboard(whiteboardId, "Test Whiteboard", user);
    List<Long> userIds = Arrays.asList(2L, 3L);

    when(whiteboardRepository.findByIdAndUserId(whiteboardId, user.getId()))
        .thenReturn(Optional.of(whiteboard));
    doNothing().when(userWhiteboardAccessService).removeUsersFromWhiteboard(userIds, whiteboardId);

    // When & Then
    mockMvc
        .perform(
            delete("/whiteboards/{id}/invitations", whiteboardId)
                .header("Authorization", "Bearer Token")
                .contentType("application/json")
                .content("{\"userIds\":[2,3]}"))
        .andExpect(status().isNoContent());

    verify(whiteboardRepository).findByIdAndUserId(whiteboardId, user.getId());
    verify(userWhiteboardAccessService).removeUsersFromWhiteboard(userIds, whiteboardId);
  }

  @Test
  void testSaveWhiteboardState() throws Exception {
    // Given
    Long whiteboardId = 1L;

    List<Node> nodes =
        Arrays.asList(createTestNode("node1", whiteboardId), createTestNode("node2", whiteboardId));

    List<Edge> edges =
        Arrays.asList(
            createTestEdge("edge1", whiteboardId, "node1", "node2"),
            createTestEdge("edge2", whiteboardId, "node2", "node1"));

    ViewportResponse viewportResponse = new ViewportResponse();
    viewportResponse.setX(100.0);
    viewportResponse.setY(200.0);
    viewportResponse.setZoom(1.5);

    SaveWhiteboardStateRequest saveRequest = new SaveWhiteboardStateRequest();
    saveRequest.setNodes(nodes);
    saveRequest.setEdges(edges);
    saveRequest.setViewportResponse(viewportResponse);

    // Mock repository behaviors
    doNothing().when(nodeRepository).deleteByWhiteboardId(whiteboardId);
    doNothing().when(edgeRepository).deleteByWhiteboardId(whiteboardId);
    when(nodeRepository.saveAll(anyList())).thenReturn(nodes);
    when(edgeRepository.saveAll(anyList())).thenReturn(edges);
    when(viewportRepository.findByWhiteboardId(whiteboardId)).thenReturn(Optional.empty());
    when(viewportRepository.save(any(Viewport.class)))
        .thenAnswer(invocation -> invocation.getArgument(0));

    // When & Then
    mockMvc
        .perform(
            post("/whiteboards/{whiteboardId}/save", whiteboardId)
                .header("Authorization", "Bearer Token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(saveRequest)))
        .andExpect(status().isOk());

    verify(nodeRepository).deleteByWhiteboardId(whiteboardId);
    verify(edgeRepository).deleteByWhiteboardId(whiteboardId);
    verify(nodeRepository)
        .saveAll(
            argThat(
                savedNodes -> {
                  List<Node> nodeList = new ArrayList<>((Collection<Node>) savedNodes);
                  return nodeList.stream().allMatch(node -> node.getWhiteboardId() == whiteboardId);
                }));
    verify(edgeRepository)
        .saveAll(
            argThat(
                savedEdges -> {
                  List<Edge> edgeList = new ArrayList<>((Collection<Edge>) savedEdges);
                  return edgeList.stream().allMatch(edge -> edge.getWhiteboardId() == whiteboardId);
                }));
    verify(viewportRepository).findByWhiteboardId(whiteboardId);
    verify(viewportRepository)
        .save(
            argThat(
                viewport ->
                    viewport.getWhiteboardId() == whiteboardId
                        && viewport.getX() == 100.0
                        && viewport.getY() == 200.0
                        && viewport.getZoom() == 1.5));
  }

  @Test
  void testSaveWhiteboardState_ExistingViewport() throws Exception {
    // Given
    Long whiteboardId = 1L;

    List<Node> nodes = List.of(createTestNode("node1", whiteboardId));
    List<Edge> edges = List.of(createTestEdge("edge1", whiteboardId, "node1", "node2"));

    ViewportResponse viewportResponse = new ViewportResponse();
    viewportResponse.setX(100.0);
    viewportResponse.setY(200.0);
    viewportResponse.setZoom(1.5);

    SaveWhiteboardStateRequest saveRequest = new SaveWhiteboardStateRequest();
    saveRequest.setNodes(nodes);
    saveRequest.setEdges(edges);
    saveRequest.setViewportResponse(viewportResponse);

    Viewport existingViewport = new Viewport(0.0, 0.0, 1.0, whiteboardId);
    existingViewport.setId(1L);

    when(viewportRepository.findByWhiteboardId(whiteboardId))
        .thenReturn(Optional.of(existingViewport));
    when(viewportRepository.save(any(Viewport.class)))
        .thenAnswer(invocation -> invocation.getArgument(0));

    // When & Then
    mockMvc
        .perform(
            post("/whiteboards/{whiteboardId}/save", whiteboardId)
                .header("Authorization", "Bearer Token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(saveRequest)))
        .andExpect(status().isOk());

    verify(viewportRepository)
        .save(
            argThat(
                viewport ->
                    viewport.getId().equals(existingViewport.getId())
                        && viewport.getX() == 100.0
                        && viewport.getY() == 200.0
                        && viewport.getZoom() == 1.5));
  }
}
