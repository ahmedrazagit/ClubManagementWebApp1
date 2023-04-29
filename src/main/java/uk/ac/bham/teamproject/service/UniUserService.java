package uk.ac.bham.teamproject.service;

import java.util.List;
import java.util.Optional;
import uk.ac.bham.teamproject.domain.UniUser;

/**
 * Service Interface for managing {@link UniUser}.
 */
public interface UniUserService {
    /**
     * Save a uniUser.
     *
     * @param uniUser the entity to save.
     * @return the persisted entity.
     */
    UniUser save(UniUser uniUser);

    /**
     * Updates a uniUser.
     *
     * @param uniUser the entity to update.
     * @return the persisted entity.
     */
    UniUser update(UniUser uniUser);

    /**
     * Partially updates a uniUser.
     *
     * @param uniUser the entity to update partially.
     * @return the persisted entity.
     */
    Optional<UniUser> partialUpdate(UniUser uniUser);

    /**
     * Get all the uniUsers.
     *
     * @return the list of entities.
     */
    List<UniUser> findAll();

    /**
     * Get the "id" uniUser.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UniUser> findOne(Long id);

    /**
     * Delete the "id" uniUser.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
