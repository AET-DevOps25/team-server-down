package de.tum.cit.aet.devops.teamserverdown.repository;

import de.tum.cit.aet.devops.teamserverdown.model.User;
import de.tum.cit.aet.devops.teamserverdown.model.UserWhiteboardAccess;
import de.tum.cit.aet.devops.teamserverdown.model.Whiteboard;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserWhiteboardAccessRepository extends JpaRepository<UserWhiteboardAccess, Long> {
  @Query("SELECT uwa.whiteboard FROM UserWhiteboardAccess uwa WHERE uwa.user.id = :userId")
  List<Whiteboard> findWhiteboardsByUserId(@Param("userId") Long userId);

  @Query("SELECT uwa.user FROM UserWhiteboardAccess uwa WHERE uwa.whiteboard.id = :whiteboardId")
  List<User> findUsersByWhiteboardId(@Param("whiteboardId") Long whiteboardId);
}
