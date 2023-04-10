package uk.ac.bham.teamproject.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uk.ac.bham.teamproject.domain.Clubs;

/**
 * Spring Data JPA repository for the Clubs entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClubsRepository extends JpaRepository<Clubs, Long> {}
