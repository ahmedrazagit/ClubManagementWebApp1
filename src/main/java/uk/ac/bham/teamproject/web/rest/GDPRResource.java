package uk.ac.bham.teamproject.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;
import uk.ac.bham.teamproject.domain.GDPR;
import uk.ac.bham.teamproject.repository.GDPRRepository;
import uk.ac.bham.teamproject.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uk.ac.bham.teamproject.domain.GDPR}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GDPRResource {

    private final Logger log = LoggerFactory.getLogger(GDPRResource.class);

    private final GDPRRepository gDPRRepository;

    public GDPRResource(GDPRRepository gDPRRepository) {
        this.gDPRRepository = gDPRRepository;
    }

    /**
     * {@code GET  /gdprs} : get all the gDPRS.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of gDPRS in body.
     */
    @GetMapping("/gdprs")
    public ResponseEntity<List<GDPR>> getAllGDPRS(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of GDPRS");
        Page<GDPR> page = gDPRRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /gdprs/:id} : get the "id" gDPR.
     *
     * @param id the id of the gDPR to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the gDPR, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/gdprs/{id}")
    public ResponseEntity<GDPR> getGDPR(@PathVariable Long id) {
        log.debug("REST request to get GDPR : {}", id);
        Optional<GDPR> gDPR = gDPRRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(gDPR);
    }
}
