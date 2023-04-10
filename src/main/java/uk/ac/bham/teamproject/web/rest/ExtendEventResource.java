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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;
import uk.ac.bham.teamproject.domain.ExtendEvent;
import uk.ac.bham.teamproject.repository.ExtendEventRepository;
import uk.ac.bham.teamproject.service.ExtendEventService;
import uk.ac.bham.teamproject.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uk.ac.bham.teamproject.domain.ExtendEvent}.
 */
@RestController
@RequestMapping("/api")
public class ExtendEventResource {

    private final Logger log = LoggerFactory.getLogger(ExtendEventResource.class);

    private static final String ENTITY_NAME = "extendEvent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExtendEventService extendEventService;

    private final ExtendEventRepository extendEventRepository;

    public ExtendEventResource(ExtendEventService extendEventService, ExtendEventRepository extendEventRepository) {
        this.extendEventService = extendEventService;
        this.extendEventRepository = extendEventRepository;
    }

    /**
     * {@code POST  /extend-events} : Create a new extendEvent.
     *
     * @param extendEvent the extendEvent to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new extendEvent, or with status {@code 400 (Bad Request)} if the extendEvent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/extend-events")
    public ResponseEntity<ExtendEvent> createExtendEvent(@Valid @RequestBody ExtendEvent extendEvent) throws URISyntaxException {
        log.debug("REST request to save ExtendEvent : {}", extendEvent);
        if (extendEvent.getId() != null) {
            throw new BadRequestAlertException("A new extendEvent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExtendEvent result = extendEventService.save(extendEvent);
        return ResponseEntity
            .created(new URI("/api/extend-events/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /extend-events/:id} : Updates an existing extendEvent.
     *
     * @param id the id of the extendEvent to save.
     * @param extendEvent the extendEvent to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated extendEvent,
     * or with status {@code 400 (Bad Request)} if the extendEvent is not valid,
     * or with status {@code 500 (Internal Server Error)} if the extendEvent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/extend-events/{id}")
    public ResponseEntity<ExtendEvent> updateExtendEvent(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ExtendEvent extendEvent
    ) throws URISyntaxException {
        log.debug("REST request to update ExtendEvent : {}, {}", id, extendEvent);
        if (extendEvent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, extendEvent.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!extendEventRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ExtendEvent result = extendEventService.update(extendEvent);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, extendEvent.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /extend-events/:id} : Partial updates given fields of an existing extendEvent, field will ignore if it is null
     *
     * @param id the id of the extendEvent to save.
     * @param extendEvent the extendEvent to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated extendEvent,
     * or with status {@code 400 (Bad Request)} if the extendEvent is not valid,
     * or with status {@code 404 (Not Found)} if the extendEvent is not found,
     * or with status {@code 500 (Internal Server Error)} if the extendEvent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/extend-events/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ExtendEvent> partialUpdateExtendEvent(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ExtendEvent extendEvent
    ) throws URISyntaxException {
        log.debug("REST request to partial update ExtendEvent partially : {}, {}", id, extendEvent);
        if (extendEvent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, extendEvent.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!extendEventRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ExtendEvent> result = extendEventService.partialUpdate(extendEvent);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, extendEvent.getId().toString())
        );
    }

    /**
     * {@code GET  /extend-events} : get all the extendEvents.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of extendEvents in body.
     */
    @GetMapping("/extend-events")
    public ResponseEntity<List<ExtendEvent>> getAllExtendEvents(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of ExtendEvents");
        Page<ExtendEvent> page = extendEventService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /extend-events/:id} : get the "id" extendEvent.
     *
     * @param id the id of the extendEvent to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the extendEvent, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/extend-events/{id}")
    public ResponseEntity<ExtendEvent> getExtendEvent(@PathVariable Long id) {
        log.debug("REST request to get ExtendEvent : {}", id);
        Optional<ExtendEvent> extendEvent = extendEventService.findOne(id);
        return ResponseUtil.wrapOrNotFound(extendEvent);
    }

    /**
     * {@code DELETE  /extend-events/:id} : delete the "id" extendEvent.
     *
     * @param id the id of the extendEvent to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/extend-events/{id}")
    public ResponseEntity<Void> deleteExtendEvent(@PathVariable Long id) {
        log.debug("REST request to delete ExtendEvent : {}", id);
        extendEventService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
