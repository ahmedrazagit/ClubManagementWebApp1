package uk.ac.bham.teamproject.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uk.ac.bham.teamproject.domain.ExtendEvent;

/**
 * Service Interface for managing {@link ExtendEvent}.
 */
public interface ExtendEventService {
    /**
     * Save a extendEvent.
     *
     * @param extendEvent the entity to save.
     * @return the persisted entity.
     */
    ExtendEvent save(ExtendEvent extendEvent);

    /**
     * Updates a extendEvent.
     *
     * @param extendEvent the entity to update.
     * @return the persisted entity.
     */
    ExtendEvent update(ExtendEvent extendEvent);

    /**
     * Partially updates a extendEvent.
     *
     * @param extendEvent the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ExtendEvent> partialUpdate(ExtendEvent extendEvent);

    /**
     * Get all the extendEvents.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ExtendEvent> findAll(Pageable pageable);

    /**
     * Get the "id" extendEvent.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ExtendEvent> findOne(Long id);

    /**
     * Delete the "id" extendEvent.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
