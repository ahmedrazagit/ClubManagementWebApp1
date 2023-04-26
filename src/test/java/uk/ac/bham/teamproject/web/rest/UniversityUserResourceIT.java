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
import uk.ac.bham.teamproject.domain.UniversityUser;
import uk.ac.bham.teamproject.repository.UniversityUserRepository;

/**
 * Integration tests for the {@link UniversityUserResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class UniversityUserResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_NICKNAME = "AAAAAAAAAA";
    private static final String UPDATED_NICKNAME = "BBBBBBBBBB";

    private static final String DEFAULT_ROLE = "AAAAAAAAAA";
    private static final String UPDATED_ROLE = "BBBBBBBBBB";

    private static final String DEFAULT_STUDENT_ID = "AAAAAAAAAA";
    private static final String UPDATED_STUDENT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_GENDER = "AAAAAAAAAA";
    private static final String UPDATED_GENDER = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_BIRTHDAY = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_BIRTHDAY = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CLUBS = "AAAAAAAAAA";
    private static final String UPDATED_CLUBS = "BBBBBBBBBB";

    private static final String DEFAULT_UNI = "AAAAAAAAAA";
    private static final String UPDATED_UNI = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Long DEFAULT_BALANCE = 1L;
    private static final Long UPDATED_BALANCE = 2L;

    private static final String ENTITY_API_URL = "/api/university-users";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private UniversityUserRepository universityUserRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUniversityUserMockMvc;

    private UniversityUser universityUser;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UniversityUser createEntity(EntityManager em) {
        UniversityUser universityUser = new UniversityUser()
            .name(DEFAULT_NAME)
            .nickname(DEFAULT_NICKNAME)
            .role(DEFAULT_ROLE)
            .studentId(DEFAULT_STUDENT_ID)
            .gender(DEFAULT_GENDER)
            .birthday(DEFAULT_BIRTHDAY)
            .clubs(DEFAULT_CLUBS)
            .uni(DEFAULT_UNI)
            .email(DEFAULT_EMAIL)
            .balance(DEFAULT_BALANCE);
        return universityUser;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UniversityUser createUpdatedEntity(EntityManager em) {
        UniversityUser universityUser = new UniversityUser()
            .name(UPDATED_NAME)
            .nickname(UPDATED_NICKNAME)
            .role(UPDATED_ROLE)
            .studentId(UPDATED_STUDENT_ID)
            .gender(UPDATED_GENDER)
            .birthday(UPDATED_BIRTHDAY)
            .clubs(UPDATED_CLUBS)
            .uni(UPDATED_UNI)
            .email(UPDATED_EMAIL)
            .balance(UPDATED_BALANCE);
        return universityUser;
    }

    @BeforeEach
    public void initTest() {
        universityUser = createEntity(em);
    }

    @Test
    @Transactional
    void createUniversityUser() throws Exception {
        int databaseSizeBeforeCreate = universityUserRepository.findAll().size();
        // Create the UniversityUser
        restUniversityUserMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(universityUser))
            )
            .andExpect(status().isCreated());

        // Validate the UniversityUser in the database
        List<UniversityUser> universityUserList = universityUserRepository.findAll();
        assertThat(universityUserList).hasSize(databaseSizeBeforeCreate + 1);
        UniversityUser testUniversityUser = universityUserList.get(universityUserList.size() - 1);
        assertThat(testUniversityUser.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUniversityUser.getNickname()).isEqualTo(DEFAULT_NICKNAME);
        assertThat(testUniversityUser.getRole()).isEqualTo(DEFAULT_ROLE);
        assertThat(testUniversityUser.getStudentId()).isEqualTo(DEFAULT_STUDENT_ID);
        assertThat(testUniversityUser.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testUniversityUser.getBirthday()).isEqualTo(DEFAULT_BIRTHDAY);
        assertThat(testUniversityUser.getClubs()).isEqualTo(DEFAULT_CLUBS);
        assertThat(testUniversityUser.getUni()).isEqualTo(DEFAULT_UNI);
        assertThat(testUniversityUser.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testUniversityUser.getBalance()).isEqualTo(DEFAULT_BALANCE);
    }

    @Test
    @Transactional
    void createUniversityUserWithExistingId() throws Exception {
        // Create the UniversityUser with an existing ID
        universityUser.setId(1L);

        int databaseSizeBeforeCreate = universityUserRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUniversityUserMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(universityUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the UniversityUser in the database
        List<UniversityUser> universityUserList = universityUserRepository.findAll();
        assertThat(universityUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllUniversityUsers() throws Exception {
        // Initialize the database
        universityUserRepository.saveAndFlush(universityUser);

        // Get all the universityUserList
        restUniversityUserMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(universityUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].nickname").value(hasItem(DEFAULT_NICKNAME)))
            .andExpect(jsonPath("$.[*].role").value(hasItem(DEFAULT_ROLE)))
            .andExpect(jsonPath("$.[*].studentId").value(hasItem(DEFAULT_STUDENT_ID)))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER)))
            .andExpect(jsonPath("$.[*].birthday").value(hasItem(sameInstant(DEFAULT_BIRTHDAY))))
            .andExpect(jsonPath("$.[*].clubs").value(hasItem(DEFAULT_CLUBS)))
            .andExpect(jsonPath("$.[*].uni").value(hasItem(DEFAULT_UNI)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].balance").value(hasItem(DEFAULT_BALANCE.intValue())));
    }

    @Test
    @Transactional
    void getUniversityUser() throws Exception {
        // Initialize the database
        universityUserRepository.saveAndFlush(universityUser);

        // Get the universityUser
        restUniversityUserMockMvc
            .perform(get(ENTITY_API_URL_ID, universityUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(universityUser.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.nickname").value(DEFAULT_NICKNAME))
            .andExpect(jsonPath("$.role").value(DEFAULT_ROLE))
            .andExpect(jsonPath("$.studentId").value(DEFAULT_STUDENT_ID))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER))
            .andExpect(jsonPath("$.birthday").value(sameInstant(DEFAULT_BIRTHDAY)))
            .andExpect(jsonPath("$.clubs").value(DEFAULT_CLUBS))
            .andExpect(jsonPath("$.uni").value(DEFAULT_UNI))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.balance").value(DEFAULT_BALANCE.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingUniversityUser() throws Exception {
        // Get the universityUser
        restUniversityUserMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingUniversityUser() throws Exception {
        // Initialize the database
        universityUserRepository.saveAndFlush(universityUser);

        int databaseSizeBeforeUpdate = universityUserRepository.findAll().size();

        // Update the universityUser
        UniversityUser updatedUniversityUser = universityUserRepository.findById(universityUser.getId()).get();
        // Disconnect from session so that the updates on updatedUniversityUser are not directly saved in db
        em.detach(updatedUniversityUser);
        updatedUniversityUser
            .name(UPDATED_NAME)
            .nickname(UPDATED_NICKNAME)
            .role(UPDATED_ROLE)
            .studentId(UPDATED_STUDENT_ID)
            .gender(UPDATED_GENDER)
            .birthday(UPDATED_BIRTHDAY)
            .clubs(UPDATED_CLUBS)
            .uni(UPDATED_UNI)
            .email(UPDATED_EMAIL)
            .balance(UPDATED_BALANCE);

        restUniversityUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUniversityUser.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUniversityUser))
            )
            .andExpect(status().isOk());

        // Validate the UniversityUser in the database
        List<UniversityUser> universityUserList = universityUserRepository.findAll();
        assertThat(universityUserList).hasSize(databaseSizeBeforeUpdate);
        UniversityUser testUniversityUser = universityUserList.get(universityUserList.size() - 1);
        assertThat(testUniversityUser.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUniversityUser.getNickname()).isEqualTo(UPDATED_NICKNAME);
        assertThat(testUniversityUser.getRole()).isEqualTo(UPDATED_ROLE);
        assertThat(testUniversityUser.getStudentId()).isEqualTo(UPDATED_STUDENT_ID);
        assertThat(testUniversityUser.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testUniversityUser.getBirthday()).isEqualTo(UPDATED_BIRTHDAY);
        assertThat(testUniversityUser.getClubs()).isEqualTo(UPDATED_CLUBS);
        assertThat(testUniversityUser.getUni()).isEqualTo(UPDATED_UNI);
        assertThat(testUniversityUser.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testUniversityUser.getBalance()).isEqualTo(UPDATED_BALANCE);
    }

    @Test
    @Transactional
    void putNonExistingUniversityUser() throws Exception {
        int databaseSizeBeforeUpdate = universityUserRepository.findAll().size();
        universityUser.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUniversityUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, universityUser.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(universityUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the UniversityUser in the database
        List<UniversityUser> universityUserList = universityUserRepository.findAll();
        assertThat(universityUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUniversityUser() throws Exception {
        int databaseSizeBeforeUpdate = universityUserRepository.findAll().size();
        universityUser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUniversityUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(universityUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the UniversityUser in the database
        List<UniversityUser> universityUserList = universityUserRepository.findAll();
        assertThat(universityUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUniversityUser() throws Exception {
        int databaseSizeBeforeUpdate = universityUserRepository.findAll().size();
        universityUser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUniversityUserMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(universityUser)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the UniversityUser in the database
        List<UniversityUser> universityUserList = universityUserRepository.findAll();
        assertThat(universityUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUniversityUserWithPatch() throws Exception {
        // Initialize the database
        universityUserRepository.saveAndFlush(universityUser);

        int databaseSizeBeforeUpdate = universityUserRepository.findAll().size();

        // Update the universityUser using partial update
        UniversityUser partialUpdatedUniversityUser = new UniversityUser();
        partialUpdatedUniversityUser.setId(universityUser.getId());

        partialUpdatedUniversityUser
            .nickname(UPDATED_NICKNAME)
            .role(UPDATED_ROLE)
            .gender(UPDATED_GENDER)
            .birthday(UPDATED_BIRTHDAY)
            .clubs(UPDATED_CLUBS)
            .email(UPDATED_EMAIL);

        restUniversityUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUniversityUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUniversityUser))
            )
            .andExpect(status().isOk());

        // Validate the UniversityUser in the database
        List<UniversityUser> universityUserList = universityUserRepository.findAll();
        assertThat(universityUserList).hasSize(databaseSizeBeforeUpdate);
        UniversityUser testUniversityUser = universityUserList.get(universityUserList.size() - 1);
        assertThat(testUniversityUser.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUniversityUser.getNickname()).isEqualTo(UPDATED_NICKNAME);
        assertThat(testUniversityUser.getRole()).isEqualTo(UPDATED_ROLE);
        assertThat(testUniversityUser.getStudentId()).isEqualTo(DEFAULT_STUDENT_ID);
        assertThat(testUniversityUser.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testUniversityUser.getBirthday()).isEqualTo(UPDATED_BIRTHDAY);
        assertThat(testUniversityUser.getClubs()).isEqualTo(UPDATED_CLUBS);
        assertThat(testUniversityUser.getUni()).isEqualTo(DEFAULT_UNI);
        assertThat(testUniversityUser.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testUniversityUser.getBalance()).isEqualTo(DEFAULT_BALANCE);
    }

    @Test
    @Transactional
    void fullUpdateUniversityUserWithPatch() throws Exception {
        // Initialize the database
        universityUserRepository.saveAndFlush(universityUser);

        int databaseSizeBeforeUpdate = universityUserRepository.findAll().size();

        // Update the universityUser using partial update
        UniversityUser partialUpdatedUniversityUser = new UniversityUser();
        partialUpdatedUniversityUser.setId(universityUser.getId());

        partialUpdatedUniversityUser
            .name(UPDATED_NAME)
            .nickname(UPDATED_NICKNAME)
            .role(UPDATED_ROLE)
            .studentId(UPDATED_STUDENT_ID)
            .gender(UPDATED_GENDER)
            .birthday(UPDATED_BIRTHDAY)
            .clubs(UPDATED_CLUBS)
            .uni(UPDATED_UNI)
            .email(UPDATED_EMAIL)
            .balance(UPDATED_BALANCE);

        restUniversityUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUniversityUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUniversityUser))
            )
            .andExpect(status().isOk());

        // Validate the UniversityUser in the database
        List<UniversityUser> universityUserList = universityUserRepository.findAll();
        assertThat(universityUserList).hasSize(databaseSizeBeforeUpdate);
        UniversityUser testUniversityUser = universityUserList.get(universityUserList.size() - 1);
        assertThat(testUniversityUser.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUniversityUser.getNickname()).isEqualTo(UPDATED_NICKNAME);
        assertThat(testUniversityUser.getRole()).isEqualTo(UPDATED_ROLE);
        assertThat(testUniversityUser.getStudentId()).isEqualTo(UPDATED_STUDENT_ID);
        assertThat(testUniversityUser.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testUniversityUser.getBirthday()).isEqualTo(UPDATED_BIRTHDAY);
        assertThat(testUniversityUser.getClubs()).isEqualTo(UPDATED_CLUBS);
        assertThat(testUniversityUser.getUni()).isEqualTo(UPDATED_UNI);
        assertThat(testUniversityUser.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testUniversityUser.getBalance()).isEqualTo(UPDATED_BALANCE);
    }

    @Test
    @Transactional
    void patchNonExistingUniversityUser() throws Exception {
        int databaseSizeBeforeUpdate = universityUserRepository.findAll().size();
        universityUser.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUniversityUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, universityUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(universityUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the UniversityUser in the database
        List<UniversityUser> universityUserList = universityUserRepository.findAll();
        assertThat(universityUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUniversityUser() throws Exception {
        int databaseSizeBeforeUpdate = universityUserRepository.findAll().size();
        universityUser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUniversityUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(universityUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the UniversityUser in the database
        List<UniversityUser> universityUserList = universityUserRepository.findAll();
        assertThat(universityUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUniversityUser() throws Exception {
        int databaseSizeBeforeUpdate = universityUserRepository.findAll().size();
        universityUser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUniversityUserMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(universityUser))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the UniversityUser in the database
        List<UniversityUser> universityUserList = universityUserRepository.findAll();
        assertThat(universityUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUniversityUser() throws Exception {
        // Initialize the database
        universityUserRepository.saveAndFlush(universityUser);

        int databaseSizeBeforeDelete = universityUserRepository.findAll().size();

        // Delete the universityUser
        restUniversityUserMockMvc
            .perform(delete(ENTITY_API_URL_ID, universityUser.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UniversityUser> universityUserList = universityUserRepository.findAll();
        assertThat(universityUserList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
