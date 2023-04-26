package uk.ac.bham.teamproject.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uk.ac.bham.teamproject.domain.UniversityUser;

/**
 * Spring Data JPA repository for the UniversityUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UniversityUserRepository extends JpaRepository<UniversityUser, Long> {}
