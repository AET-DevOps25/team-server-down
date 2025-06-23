package de.tum.cit.aet.devops.teamserverdown.services;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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
public class AccountTest {
  @Autowired private MockMvc mockMvc;

  @Test
  void testGetCurrentUser() throws Exception {
    mockMvc
        .perform(get("/me").header("Authorization", "Bearer Token"))
        .andExpect(status().isOk())
        .andExpect(content().string("john.doe"));
  }
}
