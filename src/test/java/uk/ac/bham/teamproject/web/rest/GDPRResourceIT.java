package uk.ac.bham.teamproject.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import uk.ac.bham.teamproject.IntegrationTest;
import uk.ac.bham.teamproject.domain.GDPR;
import uk.ac.bham.teamproject.repository.GDPRRepository;

/**
 * Integration tests for the {@link GDPRResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class GDPRResourceIT {

    private static final String ENTITY_API_URL = "/api/gdprs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private GDPRRepository gDPRRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGDPRMockMvc;

    private GDPR gDPR;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GDPR createEntity(EntityManager em) {
        GDPR gDPR = new GDPR();
        return gDPR;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GDPR createUpdatedEntity(EntityManager em) {
        GDPR gDPR = new GDPR();
        return gDPR;
    }

    @BeforeEach
    public void initTest() {
        gDPR = createEntity(em);
    }

    @Test
    @Transactional
    void getAllGDPRS() throws Exception {
        // Initialize the database
        gDPRRepository.saveAndFlush(gDPR);

        // Get all the gDPRList
        restGDPRMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gDPR.getId().intValue())));
    }

    @Test
    @Transactional
    void getGDPR() throws Exception {
        // Initialize the database
        gDPRRepository.saveAndFlush(gDPR);

        // Get the gDPR
        restGDPRMockMvc
            .perform(get(ENTITY_API_URL_ID, gDPR.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(gDPR.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingGDPR() throws Exception {
        // Get the gDPR
        restGDPRMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }
}
