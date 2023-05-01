package uk.ac.bham.teamproject.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import uk.ac.bham.teamproject.domain.ExtendClub;
import uk.ac.bham.teamproject.domain.User;
import uk.ac.bham.teamproject.repository.ExtendClubRepository;
import uk.ac.bham.teamproject.repository.ExtendedEventsRepository;
import uk.ac.bham.teamproject.service.UserService;
import uk.ac.bham.teamproject.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uk.ac.bham.teamproject.domain.ExtendClub}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ExtendClubResource {

    private final Logger log = LoggerFactory.getLogger(ExtendClubResource.class);

    private static final String ENTITY_NAME = "extendClub";

    private final ExtendedEventsRepository extendedEventsRepository;

    @Autowired
    private UserService userService;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExtendClubRepository extendClubRepository;

    public ExtendClubResource(ExtendedEventsRepository extendedEventsRepository, ExtendClubRepository extendClubRepository) {
        this.extendedEventsRepository = extendedEventsRepository;
        this.extendClubRepository = extendClubRepository;
    }

    /**
     * {@code POST  /extend-clubs} : Create a new extendClub.
     *
     * @param extendClub the extendClub to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new extendClub, or with status {@code 400 (Bad Request)} if the extendClub has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/extend-clubs")
    public ResponseEntity<ExtendClub> createExtendClub(@Valid @RequestBody ExtendClub extendClub) throws URISyntaxException {
        log.debug("REST request to save ExtendClub : {}", extendClub);
        if (extendClub.getId() != null) {
            throw new BadRequestAlertException("A new extendClub cannot already have an ID", ENTITY_NAME, "idexists");
        }

        final Optional<User> isUser = userService.getUserWithAuthorities();
        if (!isUser.isPresent()) {
            log.error("User is not logged in");
            throw new BadRequestAlertException("User is not logged in", ENTITY_NAME, "usernotloggedin");
        }

        final User user = isUser.get();

        extendClub.setUser(user);

        int eventCount = extendClubRepository.countEventsByClubId(extendClub.getId());
        extendClub.setNumberofevents(eventCount);
        ExtendClub result = extendClubRepository.save(extendClub);
        return ResponseEntity
            .created(new URI("/api/extend-clubs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /extend-clubs/:id} : Updates an existing extendClub.
     *
     * @param id the id of the extendClub to save.
     * @param extendClub the extendClub to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated extendClub,
     * or with status {@code 400 (Bad Request)} if the extendClub is not valid,
     * or with status {@code 500 (Internal Server Error)} if the extendClub couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/extend-clubs/{id}")
    public ResponseEntity<ExtendClub> updateExtendClub(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ExtendClub extendClub
    ) throws URISyntaxException {
        log.debug("REST request to update ExtendClub : {}, {}", id, extendClub);
        if (extendClub.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, extendClub.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!extendClubRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        int eventCount = extendClubRepository.countEventsByClubId(extendClub.getId());
        extendClub.setNumberofevents(eventCount);

        ExtendClub result = extendClubRepository.save(extendClub);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, extendClub.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /extend-clubs/:id} : Partial updates given fields of an existing extendClub, field will ignore if it is null
     *
     * @param id the id of the extendClub to save.
     * @param extendClub the extendClub to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated extendClub,
     * or with status {@code 400 (Bad Request)} if the extendClub is not valid,
     * or with status {@code 404 (Not Found)} if the extendClub is not found,
     * or with status {@code 500 (Internal Server Error)} if the extendClub couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */

    //@PatchMapping(value = "/extend-clubs/{id}", consumes = { "application/json", "application/merge-patch+json" })
    /*public ResponseEntity<ExtendClub> partialUpdateExtendClub(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ExtendClub extendClub
    ) throws URISyntaxException {
        log.debug("REST request to partial update ExtendClub partially : {}, {}", id, extendClub);
        if (extendClub.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, extendClub.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!extendClubRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ExtendClub> result = extendClubRepository
            .findById(extendClub.getId())
            .map(existingExtendClub -> {
                if (extendClub.getClubname() != null) {
                    existingExtendClub.setClubname(extendClub.getClubname());
                }
                if (extendClub.getClubdescription() != null) {
                    existingExtendClub.setClubdescription(extendClub.getClubdescription());
                }
                if (extendClub.getNumberofmembers() != null) {
                    existingExtendClub.setNumberofmembers(extendClub.getNumberofmembers());
                }
                if (extendClub.getNumberofevents() != null) {
                    existingExtendClub.setNumberofevents(extendClub.getNumberofevents());
                }
                if (extendClub.getUniversity() != null) {
                    existingExtendClub.setUniversity(extendClub.getUniversity());
                }

                return existingExtendClub;
            })
            .map(extendClubRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, extendClub.getId().toString())
        );
    }
    */

    @PatchMapping(value = "/extend-clubs/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ExtendClub> partialUpdateExtendClub(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ExtendClub extendClub
    ) throws URISyntaxException {
        log.debug("REST request to partial update ExtendClub partially : {}, {}", id, extendClub);
        if (extendClub.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, extendClub.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!extendClubRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        // Update the existing ExtendClub object with the new values
        ExtendClub updatedExtendClub = extendClubRepository
            .findById(id)
            .map(existingExtendClub -> {
                if (extendClub.getClubname() != null) {
                    existingExtendClub.setClubname(extendClub.getClubname());
                }
                if (extendClub.getClubdescription() != null) {
                    existingExtendClub.setClubdescription(extendClub.getClubdescription());
                }
                if (extendClub.getNumberofmembers() != null) {
                    //existingExtendClub.setNumberofmembers(extendClub.getNumberofmembers());
                    existingExtendClub.setNumberofevents(extendClubRepository.countEventsByClubId(id));
                }
                if (extendClub.getUniversity() != null) {
                    existingExtendClub.setUniversity(extendClub.getUniversity());
                }

                // Update the numberofevents field with the count of associated ExtendedEvents objects
                //int eventCount = extendClubRepository.countEventsByClubId(id).intValue();
                //existingExtendClub.setNumberofevents(eventCount);

                return existingExtendClub;
            })
            .orElseThrow(() -> new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));

        // Save the updated ExtendClub object to the database
        ExtendClub result = extendClubRepository.save(updatedExtendClub);

        // Return the updated ExtendClub object in the response
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /*@GetMapping("/extend-clubs/{id}/event-count")
    public Long countEventsByClubId(@PathVariable Long id) {
        return extendClubRepository.countEventsByClubId(id);
    }*/

    /**
     * {@code GET  /extend-clubs} : get all the extendClubs.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of extendClubs in body.
     */
    @GetMapping("/extend-clubs")
    public List<ExtendClub> getAllExtendClubs(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all ExtendClubs");
        if (eagerload) {
            return extendClubRepository.findAllWithEagerRelationships();
        } else {
            return extendClubRepository.findAll();
        }
    }

    /**
     * {@code GET  /extend-clubs/:id} : get the "id" extendClub.
     *
     * @param id the id of the extendClub to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the extendClub, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/extend-clubs/{id}")
    public ResponseEntity<ExtendClub> getExtendClub(@PathVariable Long id) {
        log.debug("REST request to get ExtendClub : {}", id);
        Optional<ExtendClub> extendClub = extendClubRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(extendClub);
    }

    /**
     * {@code DELETE  /extend-clubs/:id} : delete the "id" extendClub.
     *
     * @param id the id of the extendClub to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/extend-clubs/{id}")
    public ResponseEntity<Void> deleteExtendClub(@PathVariable Long id) {
        log.debug("REST request to delete ExtendClub : {}", id);

        ExtendClub club = extendClubRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Club not found"));

        extendedEventsRepository.deleteEventsByClub(club);
        extendClubRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
