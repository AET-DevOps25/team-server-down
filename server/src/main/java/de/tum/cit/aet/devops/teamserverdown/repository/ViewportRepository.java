package de.tum.cit.aet.devops.teamserverdown.repository;

import de.tum.cit.aet.devops.teamserverdown.model.Viewport;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ViewportRepository extends JpaRepository<Viewport, Long> {
  Optional<Viewport> findByWhiteboardId(Long whiteboardId);
}
