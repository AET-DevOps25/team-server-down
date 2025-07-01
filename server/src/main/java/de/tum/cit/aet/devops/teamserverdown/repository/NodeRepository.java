package de.tum.cit.aet.devops.teamserverdown.repository;

import de.tum.cit.aet.devops.teamserverdown.model.Node;
import java.util.List;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NodeRepository extends JpaRepository<Node, String> {
  List<Node> findByWhiteboardId(long whiteboardId);


  @Transactional
  @Modifying
  @Query("DELETE FROM Node n WHERE n.whiteboardId = :whiteboardId")
  void deleteByWhiteboardId(@Param("whiteboardId") Long whiteboardId);
}
