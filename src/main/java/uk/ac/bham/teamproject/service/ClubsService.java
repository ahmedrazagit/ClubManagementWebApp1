package uk.ac.bham.teamproject.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uk.ac.bham.teamproject.domain.Clubs;

/**
 * Service Interface for managing {@link Clubs}.
 */
public interface ClubsService {
    /**
     * Save a clubs.
     *
     * @param clubs the entity to save.
     * @return the persisted entity.
     */
    Clubs save(Clubs clubs);

    /**
     * Updates a clubs.
     *
     * @param clubs the entity to update.
     * @return the persisted entity.
     */
    Clubs update(Clubs clubs);

    /**
     * Partially updates a clubs.
     *
     * @param clubs the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Clubs> partialUpdate(Clubs clubs);

    /**
     * Get all the clubs.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Clubs> findAll(Pageable pageable);

    /**
     * Get the "id" clubs.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Clubs> findOne(Long id);

    /**
     * Delete the "id" clubs.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
