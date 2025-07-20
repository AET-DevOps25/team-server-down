package de.tum.cit.aet.devops.teamserverdown.services;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import de.tum.cit.aet.devops.teamserverdown.services.config.AuthTestConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@Import(AuthTestConfig.class)
class RootControllerTest {

  @Autowired private MockMvc mockMvc;

  @Test
  void testRoot() throws Exception {
    mockMvc
        .perform(get("/").header("Authorization", "Bearer Token"))
        .andExpect(status().isOk())
        .andExpect(content().string("Hello World!"));
  }
}
