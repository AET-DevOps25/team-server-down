package de.tum.cit.aet.devops.teamserverdown.services;

import com.auth0.jwt.interfaces.DecodedJWT;
import de.tum.cit.aet.devops.teamserverdown.model.User;
import de.tum.cit.aet.devops.teamserverdown.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public User getOrCreateUser(DecodedJWT decoded) {
      String email = decoded.getClaim("email").asString();
      String firstName = decoded.getClaim("given_name").asString();
      String lastName = decoded.getClaim("family_name").asString();
      String userName = decoded.getClaim("preferred_username").asString();

      return userRepository
        .findByEmail(email)
        .orElseGet(
            () -> {
              User newUser = new User(
                      firstName,
                      lastName,
                      userName,
                      email
              );

              return userRepository.save(newUser);
            });
  }
}
