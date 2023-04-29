package uk.ac.bham.teamproject.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uk.ac.bham.teamproject.domain.UniUser;

/**
 * Spring Data JPA repository for the UniUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UniUserRepository extends JpaRepository<UniUser, Long> {}
