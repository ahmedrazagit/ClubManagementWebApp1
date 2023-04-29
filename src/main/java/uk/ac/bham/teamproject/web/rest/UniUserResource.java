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
import uk.ac.bham.teamproject.domain.UniUser;
import uk.ac.bham.teamproject.repository.UniUserRepository;
import uk.ac.bham.teamproject.service.UniUserService;
import uk.ac.bham.teamproject.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uk.ac.bham.teamproject.domain.UniUser}.
 */
@RestController
@RequestMapping("/api")
public class UniUserResource {

    private final Logger log = LoggerFactory.getLogger(UniUserResource.class);

    private static final String ENTITY_NAME = "uniUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UniUserService uniUserService;

    private final UniUserRepository uniUserRepository;

    public UniUserResource(UniUserService uniUserService, UniUserRepository uniUserRepository) {
        this.uniUserService = uniUserService;
        this.uniUserRepository = uniUserRepository;
    }

    /**
     * {@code POST  /uni-users} : Create a new uniUser.
     *
     * @param uniUser the uniUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new uniUser, or with status {@code 400 (Bad Request)} if the uniUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/uni-users")
    public ResponseEntity<UniUser> createUniUser(@Valid @RequestBody UniUser uniUser) throws URISyntaxException {
        log.debug("REST request to save UniUser : {}", uniUser);
        if (uniUser.getId() != null) {
            throw new BadRequestAlertException("A new uniUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UniUser result = uniUserService.save(uniUser);
        return ResponseEntity
            .created(new URI("/api/uni-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /uni-users/:id} : Updates an existing uniUser.
     *
     * @param id the id of the uniUser to save.
     * @param uniUser the uniUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated uniUser,
     * or with status {@code 400 (Bad Request)} if the uniUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the uniUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/uni-users/{id}")
    public ResponseEntity<UniUser> updateUniUser(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody UniUser uniUser
    ) throws URISyntaxException {
        log.debug("REST request to update UniUser : {}, {}", id, uniUser);
        if (uniUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, uniUser.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!uniUserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        UniUser result = uniUserService.update(uniUser);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, uniUser.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /uni-users/:id} : Partial updates given fields of an existing uniUser, field will ignore if it is null
     *
     * @param id the id of the uniUser to save.
     * @param uniUser the uniUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated uniUser,
     * or with status {@code 400 (Bad Request)} if the uniUser is not valid,
     * or with status {@code 404 (Not Found)} if the uniUser is not found,
     * or with status {@code 500 (Internal Server Error)} if the uniUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/uni-users/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<UniUser> partialUpdateUniUser(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody UniUser uniUser
    ) throws URISyntaxException {
        log.debug("REST request to partial update UniUser partially : {}, {}", id, uniUser);
        if (uniUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, uniUser.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!uniUserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<UniUser> result = uniUserService.partialUpdate(uniUser);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, uniUser.getId().toString())
        );
    }

    /**
     * {@code GET  /uni-users} : get all the uniUsers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of uniUsers in body.
     */
    @GetMapping("/uni-users")
    public List<UniUser> getAllUniUsers() {
        log.debug("REST request to get all UniUsers");
        return uniUserService.findAll();
    }

    /**
     * {@code GET  /uni-users/:id} : get the "id" uniUser.
     *
     * @param id the id of the uniUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the uniUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/uni-users/{id}")
    public ResponseEntity<UniUser> getUniUser(@PathVariable Long id) {
        log.debug("REST request to get UniUser : {}", id);
        Optional<UniUser> uniUser = uniUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(uniUser);
    }

    /**
     * {@code DELETE  /uni-users/:id} : delete the "id" uniUser.
     *
     * @param id the id of the uniUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/uni-users/{id}")
    public ResponseEntity<Void> deleteUniUser(@PathVariable Long id) {
        log.debug("REST request to delete UniUser : {}", id);
        uniUserService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
