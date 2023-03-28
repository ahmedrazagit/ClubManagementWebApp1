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
import uk.ac.bham.teamproject.domain.Clubs;
import uk.ac.bham.teamproject.repository.ClubsRepository;
import uk.ac.bham.teamproject.service.ClubsService;
import uk.ac.bham.teamproject.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uk.ac.bham.teamproject.domain.Clubs}.
 */
@RestController
@RequestMapping("/api")
public class ClubsResource {

    private final Logger log = LoggerFactory.getLogger(ClubsResource.class);

    private static final String ENTITY_NAME = "clubs";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ClubsService clubsService;

    private final ClubsRepository clubsRepository;

    public ClubsResource(ClubsService clubsService, ClubsRepository clubsRepository) {
        this.clubsService = clubsService;
        this.clubsRepository = clubsRepository;
    }

    /**
     * {@code POST  /clubs} : Create a new clubs.
     *
     * @param clubs the clubs to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new clubs, or with status {@code 400 (Bad Request)} if the clubs has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/clubs")
    public ResponseEntity<Clubs> createClubs(@Valid @RequestBody Clubs clubs) throws URISyntaxException {
        log.debug("REST request to save Clubs : {}", clubs);
        if (clubs.getId() != null) {
            throw new BadRequestAlertException("A new clubs cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Clubs result = clubsService.save(clubs);
        return ResponseEntity
            .created(new URI("/api/clubs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /clubs/:id} : Updates an existing clubs.
     *
     * @param id the id of the clubs to save.
     * @param clubs the clubs to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clubs,
     * or with status {@code 400 (Bad Request)} if the clubs is not valid,
     * or with status {@code 500 (Internal Server Error)} if the clubs couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/clubs/{id}")
    public ResponseEntity<Clubs> updateClubs(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Clubs clubs)
        throws URISyntaxException {
        log.debug("REST request to update Clubs : {}, {}", id, clubs);
        if (clubs.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, clubs.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!clubsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Clubs result = clubsService.update(clubs);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, clubs.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /clubs/:id} : Partial updates given fields of an existing clubs, field will ignore if it is null
     *
     * @param id the id of the clubs to save.
     * @param clubs the clubs to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clubs,
     * or with status {@code 400 (Bad Request)} if the clubs is not valid,
     * or with status {@code 404 (Not Found)} if the clubs is not found,
     * or with status {@code 500 (Internal Server Error)} if the clubs couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/clubs/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Clubs> partialUpdateClubs(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Clubs clubs
    ) throws URISyntaxException {
        log.debug("REST request to partial update Clubs partially : {}, {}", id, clubs);
        if (clubs.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, clubs.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!clubsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Clubs> result = clubsService.partialUpdate(clubs);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, clubs.getId().toString())
        );
    }

    /**
     * {@code GET  /clubs} : get all the clubs.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of clubs in body.
     */
    @GetMapping("/clubs")
    public ResponseEntity<List<Clubs>> getAllClubs(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Clubs");
        Page<Clubs> page = clubsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /clubs/:id} : get the "id" clubs.
     *
     * @param id the id of the clubs to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the clubs, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/clubs/{id}")
    public ResponseEntity<Clubs> getClubs(@PathVariable Long id) {
        log.debug("REST request to get Clubs : {}", id);
        Optional<Clubs> clubs = clubsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(clubs);
    }

    /**
     * {@code DELETE  /clubs/:id} : delete the "id" clubs.
     *
     * @param id the id of the clubs to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/clubs/{id}")
    public ResponseEntity<Void> deleteClubs(@PathVariable Long id) {
        log.debug("REST request to delete Clubs : {}", id);
        clubsService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
