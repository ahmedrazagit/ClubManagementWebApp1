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
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import uk.ac.bham.teamproject.domain.UniversityUser;
import uk.ac.bham.teamproject.repository.UniversityUserRepository;
import uk.ac.bham.teamproject.service.UniversityUserService;
import uk.ac.bham.teamproject.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uk.ac.bham.teamproject.domain.UniversityUser}.
 */
@RestController
@RequestMapping("/api")
//shall I add this?
@CrossOrigin("http://localhost:8080")
public class UniversityUserResource {

    private final Logger log = LoggerFactory.getLogger(UniversityUserResource.class);

    private static final String ENTITY_NAME = "universityUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UniversityUserService universityUserService;

    private final UniversityUserRepository universityUserRepository;

    public UniversityUserResource(UniversityUserService universityUserService, UniversityUserRepository universityUserRepository) {
        this.universityUserService = universityUserService;
        this.universityUserRepository = universityUserRepository;
    }

    /**
     * {@code POST  /university-users} : Create a new universityUser.
     *
     * @param universityUser the universityUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new universityUser, or with status {@code 400 (Bad Request)} if the universityUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/university-users")
    public ResponseEntity<UniversityUser> createUniversityUser(@Valid @RequestBody UniversityUser universityUser)
        throws URISyntaxException {
        log.debug("REST request to save UniversityUser : {}", universityUser);
        if (universityUser.getId() != null) {
            throw new BadRequestAlertException("A new universityUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UniversityUser result = universityUserService.save(universityUser);
        return ResponseEntity
            .created(new URI("/api/university-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /university-users/:id} : Updates an existing universityUser.
     *
     * @param id the id of the universityUser to save.
     * @param universityUser the universityUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated universityUser,
     * or with status {@code 400 (Bad Request)} if the universityUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the universityUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/university-users/{id}")
    public ResponseEntity<UniversityUser> updateUniversityUser(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody UniversityUser universityUser
    ) throws URISyntaxException {
        log.debug("REST request to update UniversityUser : {}, {}", id, universityUser);
        if (universityUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, universityUser.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!universityUserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        UniversityUser result = universityUserService.update(universityUser);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, universityUser.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /university-users/:id} : Partial updates given fields of an existing universityUser, field will ignore if it is null
     *
     * @param id the id of the universityUser to save.
     * @param universityUser the universityUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated universityUser,
     * or with status {@code 400 (Bad Request)} if the universityUser is not valid,
     * or with status {@code 404 (Not Found)} if the universityUser is not found,
     * or with status {@code 500 (Internal Server Error)} if the universityUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/university-users/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<UniversityUser> partialUpdateUniversityUser(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody UniversityUser universityUser
    ) throws URISyntaxException {
        log.debug("REST request to partial update UniversityUser partially : {}, {}", id, universityUser);
        if (universityUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, universityUser.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!universityUserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<UniversityUser> result = universityUserService.partialUpdate(universityUser);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, universityUser.getId().toString())
        );
    }

    /**
     * {@code GET  /university-users} : get all the universityUsers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of universityUsers in body.
     */
    @GetMapping("/university-users")
    public List<UniversityUser> getAllUniversityUsers() {
        log.debug("REST request to get all UniversityUsers");
        return universityUserService.findAll();
    }

    /**
     * {@code GET  /university-users/:id} : get the "id" universityUser.
     *
     * @param id the id of the universityUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the universityUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/university-users/{id}")
    public ResponseEntity<UniversityUser> getUniversityUser(@PathVariable Long id) {
        log.debug("REST request to get UniversityUser : {}", id);
        Optional<UniversityUser> universityUser = universityUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(universityUser);
    }

    /**
     * {@code DELETE  /university-users/:id} : delete the "id" universityUser.
     *
     * @param id the id of the universityUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/university-users/{id}")
    public ResponseEntity<Void> deleteUniversityUser(@PathVariable Long id) {
        log.debug("REST request to delete UniversityUser : {}", id);
        universityUserService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
