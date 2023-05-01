package uk.ac.bham.teamproject.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import uk.ac.bham.teamproject.domain.ExtendedEvents;
import uk.ac.bham.teamproject.repository.ExtendedEventsRepository;
import uk.ac.bham.teamproject.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uk.ac.bham.teamproject.domain.ExtendedEvents}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ExtendedEventsResource {

    private final Logger log = LoggerFactory.getLogger(ExtendedEventsResource.class);

    private static final String ENTITY_NAME = "extendedEvents";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExtendedEventsRepository extendedEventsRepository;

    public ExtendedEventsResource(ExtendedEventsRepository extendedEventsRepository) {
        this.extendedEventsRepository = extendedEventsRepository;
    }

    /**
     * {@code POST  /extended-events} : Create a new extendedEvents.
     *
     * @param extendedEvents the extendedEvents to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new extendedEvents, or with status {@code 400 (Bad Request)} if the extendedEvents has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/extended-events")
    public ResponseEntity<ExtendedEvents> createExtendedEvents(@Valid @RequestBody ExtendedEvents extendedEvents)
        throws URISyntaxException {
        log.debug("REST request to save ExtendedEvents : {}", extendedEvents);
        if (extendedEvents.getId() != null) {
            throw new BadRequestAlertException("A new extendedEvents cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExtendedEvents result = extendedEventsRepository.save(extendedEvents);
        return ResponseEntity
            .created(new URI("/api/extended-events/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /extended-events/:id} : Updates an existing extendedEvents.
     *
     * @param id the id of the extendedEvents to save.
     * @param extendedEvents the extendedEvents to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated extendedEvents,
     * or with status {@code 400 (Bad Request)} if the extendedEvents is not valid,
     * or with status {@code 500 (Internal Server Error)} if the extendedEvents couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/extended-events/{id}")
    public ResponseEntity<ExtendedEvents> updateExtendedEvents(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ExtendedEvents extendedEvents
    ) throws URISyntaxException {
        log.debug("REST request to update ExtendedEvents : {}, {}", id, extendedEvents);
        if (extendedEvents.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, extendedEvents.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!extendedEventsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ExtendedEvents result = extendedEventsRepository.save(extendedEvents);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, extendedEvents.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /extended-events/:id} : Partial updates given fields of an existing extendedEvents, field will ignore if it is null
     *
     * @param id the id of the extendedEvents to save.
     * @param extendedEvents the extendedEvents to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated extendedEvents,
     * or with status {@code 400 (Bad Request)} if the extendedEvents is not valid,
     * or with status {@code 404 (Not Found)} if the extendedEvents is not found,
     * or with status {@code 500 (Internal Server Error)} if the extendedEvents couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/extended-events/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ExtendedEvents> partialUpdateExtendedEvents(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ExtendedEvents extendedEvents
    ) throws URISyntaxException {
        log.debug("REST request to partial update ExtendedEvents partially : {}, {}", id, extendedEvents);
        if (extendedEvents.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, extendedEvents.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!extendedEventsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ExtendedEvents> result = extendedEventsRepository
            .findById(extendedEvents.getId())
            .map(existingExtendedEvents -> {
                if (extendedEvents.getEvent() != null) {
                    existingExtendedEvents.setEvent(extendedEvents.getEvent());
                }
                if (extendedEvents.getDate() != null) {
                    existingExtendedEvents.setDate(extendedEvents.getDate());
                }
                if (extendedEvents.getLocation() != null) {
                    existingExtendedEvents.setLocation(extendedEvents.getLocation());
                }
                if (extendedEvents.getEventdescription() != null) {
                    existingExtendedEvents.setEventdescription(extendedEvents.getEventdescription());
                }
                if (extendedEvents.getCategory() != null) {
                    existingExtendedEvents.setCategory(extendedEvents.getCategory());
                }

                return existingExtendedEvents;
            })
            .map(extendedEventsRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, extendedEvents.getId().toString())
        );
    }

    /**
     * {@code GET  /extended-events} : get all the extendedEvents.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of extendedEvents in body.
     */
    @GetMapping("/extended-events")
    public List<ExtendedEvents> getAllExtendedEvents(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all ExtendedEvents");
        if (eagerload) {
            return extendedEventsRepository.findAllWithEagerRelationships();
        } else {
            return extendedEventsRepository.findAll();
        }
    }

    /**
     * {@code GET  /extended-events/:id} : get the "id" extendedEvents.
     *
     * @param id the id of the extendedEvents to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the extendedEvents, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/extended-events/{id}")
    public ResponseEntity<ExtendedEvents> getExtendedEvents(@PathVariable Long id) {
        log.debug("REST request to get ExtendedEvents : {}", id);
        Optional<ExtendedEvents> extendedEvents = extendedEventsRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(extendedEvents);
    }

    /**
     * {@code DELETE  /extended-events/:id} : delete the "id" extendedEvents.
     *
     * @param id the id of the extendedEvents to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/extended-events/{id}")
    public ResponseEntity<Void> deleteExtendedEvents(@PathVariable Long id) {
        log.debug("REST request to delete ExtendedEvents : {}", id);
        extendedEventsRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
