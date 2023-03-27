package uk.ac.bham.teamproject.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uk.ac.bham.teamproject.web.rest.TestUtil.sameInstant;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
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
import uk.ac.bham.teamproject.domain.ExtendEvent;
import uk.ac.bham.teamproject.repository.ExtendEventRepository;

/**
 * Integration tests for the {@link ExtendEventResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ExtendEventResourceIT {

    private static final String DEFAULT_EVENTNAME = "AAAAAAAAAA";
    private static final String UPDATED_EVENTNAME = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final String DEFAULT_EVENTDESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_EVENTDESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_CLUB = "AAAAAAAAAA";
    private static final String UPDATED_CLUB = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/extend-events";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ExtendEventRepository extendEventRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restExtendEventMockMvc;

    private ExtendEvent extendEvent;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExtendEvent createEntity(EntityManager em) {
        ExtendEvent extendEvent = new ExtendEvent()
            .eventname(DEFAULT_EVENTNAME)
            .date(DEFAULT_DATE)
            .location(DEFAULT_LOCATION)
            .eventdescription(DEFAULT_EVENTDESCRIPTION)
            .club(DEFAULT_CLUB);
        return extendEvent;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExtendEvent createUpdatedEntity(EntityManager em) {
        ExtendEvent extendEvent = new ExtendEvent()
            .eventname(UPDATED_EVENTNAME)
            .date(UPDATED_DATE)
            .location(UPDATED_LOCATION)
            .eventdescription(UPDATED_EVENTDESCRIPTION)
            .club(UPDATED_CLUB);
        return extendEvent;
    }

    @BeforeEach
    public void initTest() {
        extendEvent = createEntity(em);
    }

    @Test
    @Transactional
    void createExtendEvent() throws Exception {
        int databaseSizeBeforeCreate = extendEventRepository.findAll().size();
        // Create the ExtendEvent
        restExtendEventMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendEvent)))
            .andExpect(status().isCreated());

        // Validate the ExtendEvent in the database
        List<ExtendEvent> extendEventList = extendEventRepository.findAll();
        assertThat(extendEventList).hasSize(databaseSizeBeforeCreate + 1);
        ExtendEvent testExtendEvent = extendEventList.get(extendEventList.size() - 1);
        assertThat(testExtendEvent.getEventname()).isEqualTo(DEFAULT_EVENTNAME);
        assertThat(testExtendEvent.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testExtendEvent.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testExtendEvent.getEventdescription()).isEqualTo(DEFAULT_EVENTDESCRIPTION);
        assertThat(testExtendEvent.getClub()).isEqualTo(DEFAULT_CLUB);
    }

    @Test
    @Transactional
    void createExtendEventWithExistingId() throws Exception {
        // Create the ExtendEvent with an existing ID
        extendEvent.setId(1L);

        int databaseSizeBeforeCreate = extendEventRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restExtendEventMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendEvent)))
            .andExpect(status().isBadRequest());

        // Validate the ExtendEvent in the database
        List<ExtendEvent> extendEventList = extendEventRepository.findAll();
        assertThat(extendEventList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkEventnameIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendEventRepository.findAll().size();
        // set the field null
        extendEvent.setEventname(null);

        // Create the ExtendEvent, which fails.

        restExtendEventMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendEvent)))
            .andExpect(status().isBadRequest());

        List<ExtendEvent> extendEventList = extendEventRepository.findAll();
        assertThat(extendEventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendEventRepository.findAll().size();
        // set the field null
        extendEvent.setDate(null);

        // Create the ExtendEvent, which fails.

        restExtendEventMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendEvent)))
            .andExpect(status().isBadRequest());

        List<ExtendEvent> extendEventList = extendEventRepository.findAll();
        assertThat(extendEventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkLocationIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendEventRepository.findAll().size();
        // set the field null
        extendEvent.setLocation(null);

        // Create the ExtendEvent, which fails.

        restExtendEventMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendEvent)))
            .andExpect(status().isBadRequest());

        List<ExtendEvent> extendEventList = extendEventRepository.findAll();
        assertThat(extendEventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEventdescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendEventRepository.findAll().size();
        // set the field null
        extendEvent.setEventdescription(null);

        // Create the ExtendEvent, which fails.

        restExtendEventMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendEvent)))
            .andExpect(status().isBadRequest());

        List<ExtendEvent> extendEventList = extendEventRepository.findAll();
        assertThat(extendEventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkClubIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendEventRepository.findAll().size();
        // set the field null
        extendEvent.setClub(null);

        // Create the ExtendEvent, which fails.

        restExtendEventMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendEvent)))
            .andExpect(status().isBadRequest());

        List<ExtendEvent> extendEventList = extendEventRepository.findAll();
        assertThat(extendEventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllExtendEvents() throws Exception {
        // Initialize the database
        extendEventRepository.saveAndFlush(extendEvent);

        // Get all the extendEventList
        restExtendEventMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(extendEvent.getId().intValue())))
            .andExpect(jsonPath("$.[*].eventname").value(hasItem(DEFAULT_EVENTNAME)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION)))
            .andExpect(jsonPath("$.[*].eventdescription").value(hasItem(DEFAULT_EVENTDESCRIPTION)))
            .andExpect(jsonPath("$.[*].club").value(hasItem(DEFAULT_CLUB)));
    }

    @Test
    @Transactional
    void getExtendEvent() throws Exception {
        // Initialize the database
        extendEventRepository.saveAndFlush(extendEvent);

        // Get the extendEvent
        restExtendEventMockMvc
            .perform(get(ENTITY_API_URL_ID, extendEvent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(extendEvent.getId().intValue()))
            .andExpect(jsonPath("$.eventname").value(DEFAULT_EVENTNAME))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION))
            .andExpect(jsonPath("$.eventdescription").value(DEFAULT_EVENTDESCRIPTION))
            .andExpect(jsonPath("$.club").value(DEFAULT_CLUB));
    }

    @Test
    @Transactional
    void getNonExistingExtendEvent() throws Exception {
        // Get the extendEvent
        restExtendEventMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingExtendEvent() throws Exception {
        // Initialize the database
        extendEventRepository.saveAndFlush(extendEvent);

        int databaseSizeBeforeUpdate = extendEventRepository.findAll().size();

        // Update the extendEvent
        ExtendEvent updatedExtendEvent = extendEventRepository.findById(extendEvent.getId()).get();
        // Disconnect from session so that the updates on updatedExtendEvent are not directly saved in db
        em.detach(updatedExtendEvent);
        updatedExtendEvent
            .eventname(UPDATED_EVENTNAME)
            .date(UPDATED_DATE)
            .location(UPDATED_LOCATION)
            .eventdescription(UPDATED_EVENTDESCRIPTION)
            .club(UPDATED_CLUB);

        restExtendEventMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedExtendEvent.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedExtendEvent))
            )
            .andExpect(status().isOk());

        // Validate the ExtendEvent in the database
        List<ExtendEvent> extendEventList = extendEventRepository.findAll();
        assertThat(extendEventList).hasSize(databaseSizeBeforeUpdate);
        ExtendEvent testExtendEvent = extendEventList.get(extendEventList.size() - 1);
        assertThat(testExtendEvent.getEventname()).isEqualTo(UPDATED_EVENTNAME);
        assertThat(testExtendEvent.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testExtendEvent.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testExtendEvent.getEventdescription()).isEqualTo(UPDATED_EVENTDESCRIPTION);
        assertThat(testExtendEvent.getClub()).isEqualTo(UPDATED_CLUB);
    }

    @Test
    @Transactional
    void putNonExistingExtendEvent() throws Exception {
        int databaseSizeBeforeUpdate = extendEventRepository.findAll().size();
        extendEvent.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExtendEventMockMvc
            .perform(
                put(ENTITY_API_URL_ID, extendEvent.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(extendEvent))
            )
            .andExpect(status().isBadRequest());

        // Validate the ExtendEvent in the database
        List<ExtendEvent> extendEventList = extendEventRepository.findAll();
        assertThat(extendEventList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchExtendEvent() throws Exception {
        int databaseSizeBeforeUpdate = extendEventRepository.findAll().size();
        extendEvent.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restExtendEventMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(extendEvent))
            )
            .andExpect(status().isBadRequest());

        // Validate the ExtendEvent in the database
        List<ExtendEvent> extendEventList = extendEventRepository.findAll();
        assertThat(extendEventList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamExtendEvent() throws Exception {
        int databaseSizeBeforeUpdate = extendEventRepository.findAll().size();
        extendEvent.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restExtendEventMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendEvent)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ExtendEvent in the database
        List<ExtendEvent> extendEventList = extendEventRepository.findAll();
        assertThat(extendEventList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateExtendEventWithPatch() throws Exception {
        // Initialize the database
        extendEventRepository.saveAndFlush(extendEvent);

        int databaseSizeBeforeUpdate = extendEventRepository.findAll().size();

        // Update the extendEvent using partial update
        ExtendEvent partialUpdatedExtendEvent = new ExtendEvent();
        partialUpdatedExtendEvent.setId(extendEvent.getId());

        partialUpdatedExtendEvent.date(UPDATED_DATE);

        restExtendEventMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedExtendEvent.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedExtendEvent))
            )
            .andExpect(status().isOk());

        // Validate the ExtendEvent in the database
        List<ExtendEvent> extendEventList = extendEventRepository.findAll();
        assertThat(extendEventList).hasSize(databaseSizeBeforeUpdate);
        ExtendEvent testExtendEvent = extendEventList.get(extendEventList.size() - 1);
        assertThat(testExtendEvent.getEventname()).isEqualTo(DEFAULT_EVENTNAME);
        assertThat(testExtendEvent.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testExtendEvent.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testExtendEvent.getEventdescription()).isEqualTo(DEFAULT_EVENTDESCRIPTION);
        assertThat(testExtendEvent.getClub()).isEqualTo(DEFAULT_CLUB);
    }

    @Test
    @Transactional
    void fullUpdateExtendEventWithPatch() throws Exception {
        // Initialize the database
        extendEventRepository.saveAndFlush(extendEvent);

        int databaseSizeBeforeUpdate = extendEventRepository.findAll().size();

        // Update the extendEvent using partial update
        ExtendEvent partialUpdatedExtendEvent = new ExtendEvent();
        partialUpdatedExtendEvent.setId(extendEvent.getId());

        partialUpdatedExtendEvent
            .eventname(UPDATED_EVENTNAME)
            .date(UPDATED_DATE)
            .location(UPDATED_LOCATION)
            .eventdescription(UPDATED_EVENTDESCRIPTION)
            .club(UPDATED_CLUB);

        restExtendEventMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedExtendEvent.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedExtendEvent))
            )
            .andExpect(status().isOk());

        // Validate the ExtendEvent in the database
        List<ExtendEvent> extendEventList = extendEventRepository.findAll();
        assertThat(extendEventList).hasSize(databaseSizeBeforeUpdate);
        ExtendEvent testExtendEvent = extendEventList.get(extendEventList.size() - 1);
        assertThat(testExtendEvent.getEventname()).isEqualTo(UPDATED_EVENTNAME);
        assertThat(testExtendEvent.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testExtendEvent.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testExtendEvent.getEventdescription()).isEqualTo(UPDATED_EVENTDESCRIPTION);
        assertThat(testExtendEvent.getClub()).isEqualTo(UPDATED_CLUB);
    }

    @Test
    @Transactional
    void patchNonExistingExtendEvent() throws Exception {
        int databaseSizeBeforeUpdate = extendEventRepository.findAll().size();
        extendEvent.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExtendEventMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, extendEvent.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(extendEvent))
            )
            .andExpect(status().isBadRequest());

        // Validate the ExtendEvent in the database
        List<ExtendEvent> extendEventList = extendEventRepository.findAll();
        assertThat(extendEventList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchExtendEvent() throws Exception {
        int databaseSizeBeforeUpdate = extendEventRepository.findAll().size();
        extendEvent.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restExtendEventMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(extendEvent))
            )
            .andExpect(status().isBadRequest());

        // Validate the ExtendEvent in the database
        List<ExtendEvent> extendEventList = extendEventRepository.findAll();
        assertThat(extendEventList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamExtendEvent() throws Exception {
        int databaseSizeBeforeUpdate = extendEventRepository.findAll().size();
        extendEvent.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restExtendEventMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(extendEvent))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ExtendEvent in the database
        List<ExtendEvent> extendEventList = extendEventRepository.findAll();
        assertThat(extendEventList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteExtendEvent() throws Exception {
        // Initialize the database
        extendEventRepository.saveAndFlush(extendEvent);

        int databaseSizeBeforeDelete = extendEventRepository.findAll().size();

        // Delete the extendEvent
        restExtendEventMockMvc
            .perform(delete(ENTITY_API_URL_ID, extendEvent.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ExtendEvent> extendEventList = extendEventRepository.findAll();
        assertThat(extendEventList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
