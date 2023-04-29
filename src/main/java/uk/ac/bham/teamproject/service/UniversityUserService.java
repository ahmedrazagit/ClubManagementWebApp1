package uk.ac.bham.teamproject.service;

import java.util.List;
import java.util.Optional;
import uk.ac.bham.teamproject.domain.UniversityUser;

/**
 * Service Interface for managing {@link UniversityUser}.
 */
public interface UniversityUserService {
    /**
     * Save a universityUser.
     *
     * @param universityUser the entity to save.
     * @return the persisted entity.
     */
    UniversityUser save(UniversityUser universityUser);

    /**
     * Updates a universityUser.
     *
     * @param universityUser the entity to update.
     * @return the persisted entity.
     */
    UniversityUser update(UniversityUser universityUser);

    /**
     * Partially updates a universityUser.
     *
     * @param universityUser the entity to update partially.
     * @return the persisted entity.
     */
    Optional<UniversityUser> partialUpdate(UniversityUser universityUser);

    /**
     * Get all the universityUsers.
     *
     * @return the list of entities.
     */
    List<UniversityUser> findAll();

    /**
     * Get the "id" universityUser.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UniversityUser> findOne(Long id);

    /**
     * Delete the "id" universityUser.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
