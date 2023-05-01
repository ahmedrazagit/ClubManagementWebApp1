package uk.ac.bham.teamproject.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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
import uk.ac.bham.teamproject.domain.ExtendClub;
import uk.ac.bham.teamproject.repository.ExtendClubRepository;

/**
 * Integration tests for the {@link ExtendClubResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class ExtendClubResourceIT {

    private static final String DEFAULT_CLUBNAME = "AAAAAAAAAA";
    private static final String UPDATED_CLUBNAME = "BBBBBBBBBB";

    private static final String DEFAULT_CLUBDESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_CLUBDESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUMBEROFMEMBERS = 1;
    private static final Integer UPDATED_NUMBEROFMEMBERS = 2;

    private static final Integer DEFAULT_NUMBEROFEVENTS = 1;
    private static final Integer UPDATED_NUMBEROFEVENTS = 2;

    private static final String DEFAULT_UNIVERSITY = "UniversityD";
    private static final String UPDATED_UNIVERSITY = "7}zaUniversityW(i";

    private static final String ENTITY_API_URL = "/api/extend-clubs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ExtendClubRepository extendClubRepository;

    @Mock
    private ExtendClubRepository extendClubRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restExtendClubMockMvc;

    private ExtendClub extendClub;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExtendClub createEntity(EntityManager em) {
        ExtendClub extendClub = new ExtendClub()
            .clubname(DEFAULT_CLUBNAME)
            .clubdescription(DEFAULT_CLUBDESCRIPTION)
            .numberofmembers(DEFAULT_NUMBEROFMEMBERS)
            .numberofevents(DEFAULT_NUMBEROFEVENTS)
            .university(DEFAULT_UNIVERSITY);
        return extendClub;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExtendClub createUpdatedEntity(EntityManager em) {
        ExtendClub extendClub = new ExtendClub()
            .clubname(UPDATED_CLUBNAME)
            .clubdescription(UPDATED_CLUBDESCRIPTION)
            .numberofmembers(UPDATED_NUMBEROFMEMBERS)
            .numberofevents(UPDATED_NUMBEROFEVENTS)
            .university(UPDATED_UNIVERSITY);
        return extendClub;
    }

    @BeforeEach
    public void initTest() {
        extendClub = createEntity(em);
    }

    @Test
    @Transactional
    void createExtendClub() throws Exception {
        int databaseSizeBeforeCreate = extendClubRepository.findAll().size();
        // Create the ExtendClub
        restExtendClubMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendClub)))
            .andExpect(status().isCreated());

        // Validate the ExtendClub in the database
        List<ExtendClub> extendClubList = extendClubRepository.findAll();
        assertThat(extendClubList).hasSize(databaseSizeBeforeCreate + 1);
        ExtendClub testExtendClub = extendClubList.get(extendClubList.size() - 1);
        assertThat(testExtendClub.getClubname()).isEqualTo(DEFAULT_CLUBNAME);
        assertThat(testExtendClub.getClubdescription()).isEqualTo(DEFAULT_CLUBDESCRIPTION);
        assertThat(testExtendClub.getNumberofmembers()).isEqualTo(DEFAULT_NUMBEROFMEMBERS);
        assertThat(testExtendClub.getNumberofevents()).isEqualTo(DEFAULT_NUMBEROFEVENTS);
        assertThat(testExtendClub.getUniversity()).isEqualTo(DEFAULT_UNIVERSITY);
    }

    @Test
    @Transactional
    void createExtendClubWithExistingId() throws Exception {
        // Create the ExtendClub with an existing ID
        extendClub.setId(1L);

        int databaseSizeBeforeCreate = extendClubRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restExtendClubMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendClub)))
            .andExpect(status().isBadRequest());

        // Validate the ExtendClub in the database
        List<ExtendClub> extendClubList = extendClubRepository.findAll();
        assertThat(extendClubList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkClubnameIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendClubRepository.findAll().size();
        // set the field null
        extendClub.setClubname(null);

        // Create the ExtendClub, which fails.

        restExtendClubMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendClub)))
            .andExpect(status().isBadRequest());

        List<ExtendClub> extendClubList = extendClubRepository.findAll();
        assertThat(extendClubList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkClubdescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendClubRepository.findAll().size();
        // set the field null
        extendClub.setClubdescription(null);

        // Create the ExtendClub, which fails.

        restExtendClubMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendClub)))
            .andExpect(status().isBadRequest());

        List<ExtendClub> extendClubList = extendClubRepository.findAll();
        assertThat(extendClubList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkNumberofmembersIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendClubRepository.findAll().size();
        // set the field null
        extendClub.setNumberofmembers(null);

        // Create the ExtendClub, which fails.

        restExtendClubMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendClub)))
            .andExpect(status().isBadRequest());

        List<ExtendClub> extendClubList = extendClubRepository.findAll();
        assertThat(extendClubList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkNumberofeventsIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendClubRepository.findAll().size();
        // set the field null
        extendClub.setNumberofevents(null);

        // Create the ExtendClub, which fails.

        restExtendClubMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendClub)))
            .andExpect(status().isBadRequest());

        List<ExtendClub> extendClubList = extendClubRepository.findAll();
        assertThat(extendClubList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkUniversityIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendClubRepository.findAll().size();
        // set the field null
        extendClub.setUniversity(null);

        // Create the ExtendClub, which fails.

        restExtendClubMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendClub)))
            .andExpect(status().isBadRequest());

        List<ExtendClub> extendClubList = extendClubRepository.findAll();
        assertThat(extendClubList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllExtendClubs() throws Exception {
        // Initialize the database
        extendClubRepository.saveAndFlush(extendClub);

        // Get all the extendClubList
        restExtendClubMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(extendClub.getId().intValue())))
            .andExpect(jsonPath("$.[*].clubname").value(hasItem(DEFAULT_CLUBNAME)))
            .andExpect(jsonPath("$.[*].clubdescription").value(hasItem(DEFAULT_CLUBDESCRIPTION)))
            .andExpect(jsonPath("$.[*].numberofmembers").value(hasItem(DEFAULT_NUMBEROFMEMBERS)))
            .andExpect(jsonPath("$.[*].numberofevents").value(hasItem(DEFAULT_NUMBEROFEVENTS)))
            .andExpect(jsonPath("$.[*].university").value(hasItem(DEFAULT_UNIVERSITY)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllExtendClubsWithEagerRelationshipsIsEnabled() throws Exception {
        when(extendClubRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restExtendClubMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(extendClubRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllExtendClubsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(extendClubRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restExtendClubMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(extendClubRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getExtendClub() throws Exception {
        // Initialize the database
        extendClubRepository.saveAndFlush(extendClub);

        // Get the extendClub
        restExtendClubMockMvc
            .perform(get(ENTITY_API_URL_ID, extendClub.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(extendClub.getId().intValue()))
            .andExpect(jsonPath("$.clubname").value(DEFAULT_CLUBNAME))
            .andExpect(jsonPath("$.clubdescription").value(DEFAULT_CLUBDESCRIPTION))
            .andExpect(jsonPath("$.numberofmembers").value(DEFAULT_NUMBEROFMEMBERS))
            .andExpect(jsonPath("$.numberofevents").value(DEFAULT_NUMBEROFEVENTS))
            .andExpect(jsonPath("$.university").value(DEFAULT_UNIVERSITY));
    }

    @Test
    @Transactional
    void getNonExistingExtendClub() throws Exception {
        // Get the extendClub
        restExtendClubMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingExtendClub() throws Exception {
        // Initialize the database
        extendClubRepository.saveAndFlush(extendClub);

        int databaseSizeBeforeUpdate = extendClubRepository.findAll().size();

        // Update the extendClub
        ExtendClub updatedExtendClub = extendClubRepository.findById(extendClub.getId()).get();
        // Disconnect from session so that the updates on updatedExtendClub are not directly saved in db
        em.detach(updatedExtendClub);
        updatedExtendClub
            .clubname(UPDATED_CLUBNAME)
            .clubdescription(UPDATED_CLUBDESCRIPTION)
            .numberofmembers(UPDATED_NUMBEROFMEMBERS)
            .numberofevents(UPDATED_NUMBEROFEVENTS)
            .university(UPDATED_UNIVERSITY);

        restExtendClubMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedExtendClub.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedExtendClub))
            )
            .andExpect(status().isOk());

        // Validate the ExtendClub in the database
        List<ExtendClub> extendClubList = extendClubRepository.findAll();
        assertThat(extendClubList).hasSize(databaseSizeBeforeUpdate);
        ExtendClub testExtendClub = extendClubList.get(extendClubList.size() - 1);
        assertThat(testExtendClub.getClubname()).isEqualTo(UPDATED_CLUBNAME);
        assertThat(testExtendClub.getClubdescription()).isEqualTo(UPDATED_CLUBDESCRIPTION);
        assertThat(testExtendClub.getNumberofmembers()).isEqualTo(UPDATED_NUMBEROFMEMBERS);
        assertThat(testExtendClub.getNumberofevents()).isEqualTo(UPDATED_NUMBEROFEVENTS);
        assertThat(testExtendClub.getUniversity()).isEqualTo(UPDATED_UNIVERSITY);
    }

    @Test
    @Transactional
    void putNonExistingExtendClub() throws Exception {
        int databaseSizeBeforeUpdate = extendClubRepository.findAll().size();
        extendClub.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExtendClubMockMvc
            .perform(
                put(ENTITY_API_URL_ID, extendClub.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(extendClub))
            )
            .andExpect(status().isBadRequest());

        // Validate the ExtendClub in the database
        List<ExtendClub> extendClubList = extendClubRepository.findAll();
        assertThat(extendClubList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchExtendClub() throws Exception {
        int databaseSizeBeforeUpdate = extendClubRepository.findAll().size();
        extendClub.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restExtendClubMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(extendClub))
            )
            .andExpect(status().isBadRequest());

        // Validate the ExtendClub in the database
        List<ExtendClub> extendClubList = extendClubRepository.findAll();
        assertThat(extendClubList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamExtendClub() throws Exception {
        int databaseSizeBeforeUpdate = extendClubRepository.findAll().size();
        extendClub.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restExtendClubMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(extendClub)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ExtendClub in the database
        List<ExtendClub> extendClubList = extendClubRepository.findAll();
        assertThat(extendClubList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateExtendClubWithPatch() throws Exception {
        // Initialize the database
        extendClubRepository.saveAndFlush(extendClub);

        int databaseSizeBeforeUpdate = extendClubRepository.findAll().size();

        // Update the extendClub using partial update
        ExtendClub partialUpdatedExtendClub = new ExtendClub();
        partialUpdatedExtendClub.setId(extendClub.getId());

        partialUpdatedExtendClub.clubname(UPDATED_CLUBNAME).university(UPDATED_UNIVERSITY);

        restExtendClubMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedExtendClub.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedExtendClub))
            )
            .andExpect(status().isOk());

        // Validate the ExtendClub in the database
        List<ExtendClub> extendClubList = extendClubRepository.findAll();
        assertThat(extendClubList).hasSize(databaseSizeBeforeUpdate);
        ExtendClub testExtendClub = extendClubList.get(extendClubList.size() - 1);
        assertThat(testExtendClub.getClubname()).isEqualTo(UPDATED_CLUBNAME);
        assertThat(testExtendClub.getClubdescription()).isEqualTo(DEFAULT_CLUBDESCRIPTION);
        assertThat(testExtendClub.getNumberofmembers()).isEqualTo(DEFAULT_NUMBEROFMEMBERS);
        assertThat(testExtendClub.getNumberofevents()).isEqualTo(DEFAULT_NUMBEROFEVENTS);
        assertThat(testExtendClub.getUniversity()).isEqualTo(UPDATED_UNIVERSITY);
    }

    @Test
    @Transactional
    void fullUpdateExtendClubWithPatch() throws Exception {
        // Initialize the database
        extendClubRepository.saveAndFlush(extendClub);

        int databaseSizeBeforeUpdate = extendClubRepository.findAll().size();

        // Update the extendClub using partial update
        ExtendClub partialUpdatedExtendClub = new ExtendClub();
        partialUpdatedExtendClub.setId(extendClub.getId());

        partialUpdatedExtendClub
            .clubname(UPDATED_CLUBNAME)
            .clubdescription(UPDATED_CLUBDESCRIPTION)
            .numberofmembers(UPDATED_NUMBEROFMEMBERS)
            .numberofevents(UPDATED_NUMBEROFEVENTS)
            .university(UPDATED_UNIVERSITY);

        restExtendClubMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedExtendClub.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedExtendClub))
            )
            .andExpect(status().isOk());

        // Validate the ExtendClub in the database
        List<ExtendClub> extendClubList = extendClubRepository.findAll();
        assertThat(extendClubList).hasSize(databaseSizeBeforeUpdate);
        ExtendClub testExtendClub = extendClubList.get(extendClubList.size() - 1);
        assertThat(testExtendClub.getClubname()).isEqualTo(UPDATED_CLUBNAME);
        assertThat(testExtendClub.getClubdescription()).isEqualTo(UPDATED_CLUBDESCRIPTION);
        assertThat(testExtendClub.getNumberofmembers()).isEqualTo(UPDATED_NUMBEROFMEMBERS);
        assertThat(testExtendClub.getNumberofevents()).isEqualTo(UPDATED_NUMBEROFEVENTS);
        assertThat(testExtendClub.getUniversity()).isEqualTo(UPDATED_UNIVERSITY);
    }

    @Test
    @Transactional
    void patchNonExistingExtendClub() throws Exception {
        int databaseSizeBeforeUpdate = extendClubRepository.findAll().size();
        extendClub.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExtendClubMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, extendClub.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(extendClub))
            )
            .andExpect(status().isBadRequest());

        // Validate the ExtendClub in the database
        List<ExtendClub> extendClubList = extendClubRepository.findAll();
        assertThat(extendClubList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchExtendClub() throws Exception {
        int databaseSizeBeforeUpdate = extendClubRepository.findAll().size();
        extendClub.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restExtendClubMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(extendClub))
            )
            .andExpect(status().isBadRequest());

        // Validate the ExtendClub in the database
        List<ExtendClub> extendClubList = extendClubRepository.findAll();
        assertThat(extendClubList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamExtendClub() throws Exception {
        int databaseSizeBeforeUpdate = extendClubRepository.findAll().size();
        extendClub.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restExtendClubMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(extendClub))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ExtendClub in the database
        List<ExtendClub> extendClubList = extendClubRepository.findAll();
        assertThat(extendClubList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteExtendClub() throws Exception {
        // Initialize the database
        extendClubRepository.saveAndFlush(extendClub);

        int databaseSizeBeforeDelete = extendClubRepository.findAll().size();

        // Delete the extendClub
        restExtendClubMockMvc
            .perform(delete(ENTITY_API_URL_ID, extendClub.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ExtendClub> extendClubList = extendClubRepository.findAll();
        assertThat(extendClubList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
