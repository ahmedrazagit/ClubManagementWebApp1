package uk.ac.bham.teamproject.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uk.ac.bham.teamproject.domain.GDPR;

/**
 * Spring Data JPA repository for the GDPR entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GDPRRepository extends JpaRepository<GDPR, Long> {}
