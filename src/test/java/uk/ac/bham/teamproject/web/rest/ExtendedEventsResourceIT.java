package uk.ac.bham.teamproject.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uk.ac.bham.teamproject.web.rest.TestUtil.sameInstant;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import uk.ac.bham.teamproject.IntegrationTest;
import uk.ac.bham.teamproject.domain.ExtendedEvents;
import uk.ac.bham.teamproject.domain.enumeration.CategoryType;
import uk.ac.bham.teamproject.repository.ExtendedEventsRepository;

/**
 * Integration tests for the {@link ExtendedEventsResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class ExtendedEventsResourceIT {

    private static final String DEFAULT_EVENT = "AAAAAAAAAA";
    private static final String UPDATED_EVENT = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final String DEFAULT_EVENTDESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_EVENTDESCRIPTION = "BBBBBBBBBB";

    private static final CategoryType DEFAULT_CATEGORY = CategoryType.Fest;
    private static final CategoryType UPDATED_CATEGORY = CategoryType.Culture;

    private static final String ENTITY_API_URL = "/api/extended-events";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ExtendedEventsRepository extendedEventsRepository;

    @Mock
    private ExtendedEventsRepository extendedEventsRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restExtendedEventsMockMvc;

    private ExtendedEvents extendedEvents;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExtendedEvents createEntity(EntityManager em) {
        ExtendedEvents extendedEvents = new ExtendedEvents()
            .event(DEFAULT_EVENT)
            .date(DEFAULT_DATE)
            .location(DEFAULT_LOCATION)
            .eventdescription(DEFAULT_EVENTDESCRIPTION)
            .category(DEFAULT_CATEGORY);
        return extendedEvents;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExtendedEvents createUpdatedEntity(EntityManager em) {
        ExtendedEvents extendedEvents = new ExtendedEvents()
            .event(UPDATED_EVENT)
            .date(UPDATED_DATE)
            .location(UPDATED_LOCATION)
            .eventdescription(UPDATED_EVENTDESCRIPTION)
            .category(UPDATED_CATEGORY);
        return extendedEvents;
    }

    @BeforeEach
    public void initTest() {
        extendedEvents = createEntity(em);
    }

    @Test
    @Transactional
    void createExtendedEvents() throws Exception {
        int databaseSizeBeforeCreate = extendedEventsRepository.findAll().size();
        // Create the ExtendedEvents
        restExtendedEventsMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendedEvents))
            )
            .andExpect(status().isCreated());

        // Validate the ExtendedEvents in the database
        List<ExtendedEvents> extendedEventsList = extendedEventsRepository.findAll();
        assertThat(extendedEventsList).hasSize(databaseSizeBeforeCreate + 1);
        ExtendedEvents testExtendedEvents = extendedEventsList.get(extendedEventsList.size() - 1);
        assertThat(testExtendedEvents.getEvent()).isEqualTo(DEFAULT_EVENT);
        assertThat(testExtendedEvents.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testExtendedEvents.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testExtendedEvents.getEventdescription()).isEqualTo(DEFAULT_EVENTDESCRIPTION);
        assertThat(testExtendedEvents.getCategory()).isEqualTo(DEFAULT_CATEGORY);
    }

    @Test
    @Transactional
    void createExtendedEventsWithExistingId() throws Exception {
        // Create the ExtendedEvents with an existing ID
        extendedEvents.setId(1L);

        int databaseSizeBeforeCreate = extendedEventsRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restExtendedEventsMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendedEvents))
            )
            .andExpect(status().isBadRequest());

        // Validate the ExtendedEvents in the database
        List<ExtendedEvents> extendedEventsList = extendedEventsRepository.findAll();
        assertThat(extendedEventsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkEventIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendedEventsRepository.findAll().size();
        // set the field null
        extendedEvents.setEvent(null);

        // Create the ExtendedEvents, which fails.

        restExtendedEventsMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendedEvents))
            )
            .andExpect(status().isBadRequest());

        List<ExtendedEvents> extendedEventsList = extendedEventsRepository.findAll();
        assertThat(extendedEventsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendedEventsRepository.findAll().size();
        // set the field null
        extendedEvents.setDate(null);

        // Create the ExtendedEvents, which fails.

        restExtendedEventsMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendedEvents))
            )
            .andExpect(status().isBadRequest());

        List<ExtendedEvents> extendedEventsList = extendedEventsRepository.findAll();
        assertThat(extendedEventsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkLocationIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendedEventsRepository.findAll().size();
        // set the field null
        extendedEvents.setLocation(null);

        // Create the ExtendedEvents, which fails.

        restExtendedEventsMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendedEvents))
            )
            .andExpect(status().isBadRequest());

        List<ExtendedEvents> extendedEventsList = extendedEventsRepository.findAll();
        assertThat(extendedEventsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEventdescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendedEventsRepository.findAll().size();
        // set the field null
        extendedEvents.setEventdescription(null);

        // Create the ExtendedEvents, which fails.

        restExtendedEventsMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendedEvents))
            )
            .andExpect(status().isBadRequest());

        List<ExtendedEvents> extendedEventsList = extendedEventsRepository.findAll();
        assertThat(extendedEventsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllExtendedEvents() throws Exception {
        // Initialize the database
        extendedEventsRepository.saveAndFlush(extendedEvents);

        // Get all the extendedEventsList
        restExtendedEventsMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(extendedEvents.getId().intValue())))
            .andExpect(jsonPath("$.[*].event").value(hasItem(DEFAULT_EVENT)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION)))
            .andExpect(jsonPath("$.[*].eventdescription").value(hasItem(DEFAULT_EVENTDESCRIPTION)))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllExtendedEventsWithEagerRelationshipsIsEnabled() throws Exception {
        when(extendedEventsRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restExtendedEventsMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(extendedEventsRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllExtendedEventsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(extendedEventsRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restExtendedEventsMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(extendedEventsRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getExtendedEvents() throws Exception {
        // Initialize the database
        extendedEventsRepository.saveAndFlush(extendedEvents);

        // Get the extendedEvents
        restExtendedEventsMockMvc
            .perform(get(ENTITY_API_URL_ID, extendedEvents.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(extendedEvents.getId().intValue()))
            .andExpect(jsonPath("$.event").value(DEFAULT_EVENT))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION))
            .andExpect(jsonPath("$.eventdescription").value(DEFAULT_EVENTDESCRIPTION))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()));
    }

    @Test
    @Transactional
    void getNonExistingExtendedEvents() throws Exception {
        // Get the extendedEvents
        restExtendedEventsMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingExtendedEvents() throws Exception {
        // Initialize the database
        extendedEventsRepository.saveAndFlush(extendedEvents);

        int databaseSizeBeforeUpdate = extendedEventsRepository.findAll().size();

        // Update the extendedEvents
        ExtendedEvents updatedExtendedEvents = extendedEventsRepository.findById(extendedEvents.getId()).get();
        // Disconnect from session so that the updates on updatedExtendedEvents are not directly saved in db
        em.detach(updatedExtendedEvents);
        updatedExtendedEvents
            .event(UPDATED_EVENT)
            .date(UPDATED_DATE)
            .location(UPDATED_LOCATION)
            .eventdescription(UPDATED_EVENTDESCRIPTION)
            .category(UPDATED_CATEGORY);

        restExtendedEventsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedExtendedEvents.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedExtendedEvents))
            )
            .andExpect(status().isOk());

        // Validate the ExtendedEvents in the database
        List<ExtendedEvents> extendedEventsList = extendedEventsRepository.findAll();
        assertThat(extendedEventsList).hasSize(databaseSizeBeforeUpdate);
        ExtendedEvents testExtendedEvents = extendedEventsList.get(extendedEventsList.size() - 1);
        assertThat(testExtendedEvents.getEvent()).isEqualTo(UPDATED_EVENT);
        assertThat(testExtendedEvents.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testExtendedEvents.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testExtendedEvents.getEventdescription()).isEqualTo(UPDATED_EVENTDESCRIPTION);
        assertThat(testExtendedEvents.getCategory()).isEqualTo(UPDATED_CATEGORY);
    }

    @Test
    @Transactional
    void putNonExistingExtendedEvents() throws Exception {
        int databaseSizeBeforeUpdate = extendedEventsRepository.findAll().size();
        extendedEvents.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExtendedEventsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, extendedEvents.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(extendedEvents))
            )
            .andExpect(status().isBadRequest());

        // Validate the ExtendedEvents in the database
        List<ExtendedEvents> extendedEventsList = extendedEventsRepository.findAll();
        assertThat(extendedEventsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchExtendedEvents() throws Exception {
        int databaseSizeBeforeUpdate = extendedEventsRepository.findAll().size();
        extendedEvents.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restExtendedEventsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(extendedEvents))
            )
            .andExpect(status().isBadRequest());

        // Validate the ExtendedEvents in the database
        List<ExtendedEvents> extendedEventsList = extendedEventsRepository.findAll();
        assertThat(extendedEventsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamExtendedEvents() throws Exception {
        int databaseSizeBeforeUpdate = extendedEventsRepository.findAll().size();
        extendedEvents.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restExtendedEventsMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendedEvents)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ExtendedEvents in the database
        List<ExtendedEvents> extendedEventsList = extendedEventsRepository.findAll();
        assertThat(extendedEventsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateExtendedEventsWithPatch() throws Exception {
        // Initialize the database
        extendedEventsRepository.saveAndFlush(extendedEvents);

        int databaseSizeBeforeUpdate = extendedEventsRepository.findAll().size();

        // Update the extendedEvents using partial update
        ExtendedEvents partialUpdatedExtendedEvents = new ExtendedEvents();
        partialUpdatedExtendedEvents.setId(extendedEvents.getId());

        partialUpdatedExtendedEvents.date(UPDATED_DATE).location(UPDATED_LOCATION);

        restExtendedEventsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedExtendedEvents.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedExtendedEvents))
            )
            .andExpect(status().isOk());

        // Validate the ExtendedEvents in the database
        List<ExtendedEvents> extendedEventsList = extendedEventsRepository.findAll();
        assertThat(extendedEventsList).hasSize(databaseSizeBeforeUpdate);
        ExtendedEvents testExtendedEvents = extendedEventsList.get(extendedEventsList.size() - 1);
        assertThat(testExtendedEvents.getEvent()).isEqualTo(DEFAULT_EVENT);
        assertThat(testExtendedEvents.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testExtendedEvents.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testExtendedEvents.getEventdescription()).isEqualTo(DEFAULT_EVENTDESCRIPTION);
        assertThat(testExtendedEvents.getCategory()).isEqualTo(DEFAULT_CATEGORY);
    }

    @Test
    @Transactional
    void fullUpdateExtendedEventsWithPatch() throws Exception {
        // Initialize the database
        extendedEventsRepository.saveAndFlush(extendedEvents);

        int databaseSizeBeforeUpdate = extendedEventsRepository.findAll().size();

        // Update the extendedEvents using partial update
        ExtendedEvents partialUpdatedExtendedEvents = new ExtendedEvents();
        partialUpdatedExtendedEvents.setId(extendedEvents.getId());

        partialUpdatedExtendedEvents
            .event(UPDATED_EVENT)
            .date(UPDATED_DATE)
            .location(UPDATED_LOCATION)
            .eventdescription(UPDATED_EVENTDESCRIPTION)
            .category(UPDATED_CATEGORY);

        restExtendedEventsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedExtendedEvents.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedExtendedEvents))
            )
            .andExpect(status().isOk());

        // Validate the ExtendedEvents in the database
        List<ExtendedEvents> extendedEventsList = extendedEventsRepository.findAll();
        assertThat(extendedEventsList).hasSize(databaseSizeBeforeUpdate);
        ExtendedEvents testExtendedEvents = extendedEventsList.get(extendedEventsList.size() - 1);
        assertThat(testExtendedEvents.getEvent()).isEqualTo(UPDATED_EVENT);
        assertThat(testExtendedEvents.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testExtendedEvents.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testExtendedEvents.getEventdescription()).isEqualTo(UPDATED_EVENTDESCRIPTION);
        assertThat(testExtendedEvents.getCategory()).isEqualTo(UPDATED_CATEGORY);
    }

    @Test
    @Transactional
    void patchNonExistingExtendedEvents() throws Exception {
        int databaseSizeBeforeUpdate = extendedEventsRepository.findAll().size();
        extendedEvents.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExtendedEventsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, extendedEvents.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(extendedEvents))
            )
            .andExpect(status().isBadRequest());

        // Validate the ExtendedEvents in the database
        List<ExtendedEvents> extendedEventsList = extendedEventsRepository.findAll();
        assertThat(extendedEventsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchExtendedEvents() throws Exception {
        int databaseSizeBeforeUpdate = extendedEventsRepository.findAll().size();
        extendedEvents.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restExtendedEventsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(extendedEvents))
            )
            .andExpect(status().isBadRequest());

        // Validate the ExtendedEvents in the database
        List<ExtendedEvents> extendedEventsList = extendedEventsRepository.findAll();
        assertThat(extendedEventsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamExtendedEvents() throws Exception {
        int databaseSizeBeforeUpdate = extendedEventsRepository.findAll().size();
        extendedEvents.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restExtendedEventsMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(extendedEvents))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ExtendedEvents in the database
        List<ExtendedEvents> extendedEventsList = extendedEventsRepository.findAll();
        assertThat(extendedEventsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteExtendedEvents() throws Exception {
        // Initialize the database
        extendedEventsRepository.saveAndFlush(extendedEvents);

        int databaseSizeBeforeDelete = extendedEventsRepository.findAll().size();

        // Delete the extendedEvents
        restExtendedEventsMockMvc
            .perform(delete(ENTITY_API_URL_ID, extendedEvents.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ExtendedEvents> extendedEventsList = extendedEventsRepository.findAll();
        assertThat(extendedEventsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
