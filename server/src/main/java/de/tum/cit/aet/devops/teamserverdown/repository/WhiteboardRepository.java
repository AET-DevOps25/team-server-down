package de.tum.cit.aet.devops.teamserverdown.repository;

import de.tum.cit.aet.devops.teamserverdown.model.Whiteboard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface WhiteboardRepository extends JpaRepository<Whiteboard, Long> {
    Optional<Whiteboard> findByIdAndUserId(Long id, Long userId);
    List<Whiteboard> findByUserId(Long userId);
}
