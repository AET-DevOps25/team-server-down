package de.tum.cit.aet.devops.teamserverdown.services;

import de.tum.cit.aet.devops.teamserverdown.model.User;
import de.tum.cit.aet.devops.teamserverdown.model.UserWhiteboardAccess;
import de.tum.cit.aet.devops.teamserverdown.model.Whiteboard;
import de.tum.cit.aet.devops.teamserverdown.repository.UserRepository;
import de.tum.cit.aet.devops.teamserverdown.repository.UserWhiteboardAccessRepository;
import de.tum.cit.aet.devops.teamserverdown.repository.WhiteboardRepository;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserWhiteboardAccessService {
  private static final Logger logger = LoggerFactory.getLogger(UserWhiteboardAccessService.class);

  private final UserWhiteboardAccessRepository userWhiteboardAccessRepository;
  private final UserRepository userRepository;
  private final WhiteboardRepository whiteboardRepository;

  @Autowired
  public UserWhiteboardAccessService(
      UserWhiteboardAccessRepository userWhiteboardAccessRepository,
      UserRepository userRepository,
      WhiteboardRepository whiteboardRepository) {
    this.userWhiteboardAccessRepository = userWhiteboardAccessRepository;
    this.userRepository = userRepository;
    this.whiteboardRepository = whiteboardRepository;
  }

  public void inviteUsersToWhiteboard(List<String> emails, Long whiteboardId) {
    Whiteboard whiteboard =
        whiteboardRepository
            .findById(whiteboardId)
            .orElseThrow(() -> new IllegalArgumentException("Whiteboard not found"));

    for (String email : emails) {
      Optional<User> user = userRepository.findByEmail(email);
      if (user.isEmpty()) {
          logger.warn("User with email {} not found. Skipping invitation.", email);
          continue;
      }
      UserWhiteboardAccess access = new UserWhiteboardAccess(user.get(), whiteboard);
      userWhiteboardAccessRepository.save(access);
    }
  }
}
