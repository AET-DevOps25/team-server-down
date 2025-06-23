package de.tum.cit.aet.devops.teamserverdown.services.config;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import de.tum.cit.aet.devops.teamserverdown.model.User;
import de.tum.cit.aet.devops.teamserverdown.security.JWTValidator;
import de.tum.cit.aet.devops.teamserverdown.services.UserService;
import org.mockito.Mockito;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

@TestConfiguration
public class AuthTestConfig {

  @Bean
  @Primary
  public JWTValidator jwtValidator() {
    JWTValidator mockValidator = mock(JWTValidator.class);
    DecodedJWT mockJWT = mock(DecodedJWT.class);

    Claim emailClaim = Mockito.mock(Claim.class);
    Claim givenNameClaim = Mockito.mock(Claim.class);
    Claim familyNameClaim = Mockito.mock(Claim.class);
    Claim preferredUsernameClaim = Mockito.mock(Claim.class);

    Mockito.when(mockJWT.getClaim("email")).thenReturn(emailClaim);
    Mockito.when(mockJWT.getClaim("given_name")).thenReturn(givenNameClaim);
    Mockito.when(mockJWT.getClaim("family_name")).thenReturn(familyNameClaim);
    Mockito.when(mockJWT.getClaim("preferred_username")).thenReturn(preferredUsernameClaim);

    Mockito.when(emailClaim.asString()).thenReturn("john.doe@tum.de");
    Mockito.when(givenNameClaim.asString()).thenReturn("John");
    Mockito.when(familyNameClaim.asString()).thenReturn("Doe");
    Mockito.when(preferredUsernameClaim.asString()).thenReturn("john.doe");

    when(mockValidator.validateToken(Mockito.anyString())).thenReturn(mockJWT);
    return mockValidator;
  }

  @Bean
  @Primary
  public UserService userService() {
    UserService mockUserService = Mockito.mock(UserService.class);

    User testUser = new User();
    testUser.setEmail("john.doe@tum.de");
    testUser.setFirstName("John");
    testUser.setLastName("Doe");
    testUser.setUsername("john.doe");
    testUser.setId(1L);

    Mockito.when(mockUserService.getOrCreateUser(Mockito.any())).thenReturn(testUser);

    return mockUserService;
  }
}
