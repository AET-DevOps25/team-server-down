package de.tum.cit.aet.devops.teamserverdown.repository;

import de.tum.cit.aet.devops.teamserverdown.model.User;
import de.tum.cit.aet.devops.teamserverdown.model.UserWhiteboardAccess;
import de.tum.cit.aet.devops.teamserverdown.model.Whiteboard;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserWhiteboardAccessRepository extends JpaRepository<UserWhiteboardAccess, Long> {
  @Query("SELECT uwa.whiteboard FROM UserWhiteboardAccess uwa WHERE uwa.user.id = :userId")
  List<Whiteboard> findWhiteboardsByUserId(@Param("userId") Long userId);

  @Query("SELECT uwa.user FROM UserWhiteboardAccess uwa WHERE uwa.whiteboard.id = :whiteboardId")
  List<User> findUsersByWhiteboardId(@Param("whiteboardId") Long whiteboardId);

  @Query(
      "SELECT uwa.whiteboard FROM UserWhiteboardAccess uwa WHERE uwa.whiteboard.id = :whiteboardId AND  uwa.user.id = :userId")
  Optional<Whiteboard> findUserWhiteboardById(
      @Param("userId") Long userId, @Param("whiteboardId") Long whiteboardId);

  @Modifying
  @Query(
      "DELETE FROM UserWhiteboardAccess uwa WHERE uwa.user.id = :userId AND uwa.whiteboard.id = :whiteboardId")
  void deleteByUserIdAndWhiteboardId(
      @Param("userId") Long userId, @Param("whiteboardId") Long whiteboardId);
}
