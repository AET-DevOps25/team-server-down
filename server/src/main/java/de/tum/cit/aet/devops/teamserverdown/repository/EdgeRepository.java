package de.tum.cit.aet.devops.teamserverdown.repository;

import de.tum.cit.aet.devops.teamserverdown.model.Edge;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EdgeRepository extends JpaRepository<Edge, String> {
  List<Edge> findAllByWhiteboardId(long whiteboardId);

  @Transactional
  @Modifying
  @Query("DELETE FROM Edge e WHERE e.whiteboardId = :whiteboardId")
  void deleteByWhiteboardId(@Param("whiteboardId") Long whiteboardId);
}
