package uk.ac.bham.teamproject.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uk.ac.bham.teamproject.domain.ExtendEvent;

/**
 * Spring Data JPA repository for the ExtendEvent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendEventRepository extends JpaRepository<ExtendEvent, Long> {}
