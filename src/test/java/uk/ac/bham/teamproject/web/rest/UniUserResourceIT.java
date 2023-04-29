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
import uk.ac.bham.teamproject.domain.UniUser;
import uk.ac.bham.teamproject.repository.UniUserRepository;

/**
 * Integration tests for the {@link UniUserResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class UniUserResourceIT {

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

    private static final String ENTITY_API_URL = "/api/uni-users";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private UniUserRepository uniUserRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUniUserMockMvc;

    private UniUser uniUser;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UniUser createEntity(EntityManager em) {
        UniUser uniUser = new UniUser()
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
        return uniUser;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UniUser createUpdatedEntity(EntityManager em) {
        UniUser uniUser = new UniUser()
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
        return uniUser;
    }

    @BeforeEach
    public void initTest() {
        uniUser = createEntity(em);
    }

    @Test
    @Transactional
    void createUniUser() throws Exception {
        int databaseSizeBeforeCreate = uniUserRepository.findAll().size();
        // Create the UniUser
        restUniUserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(uniUser)))
            .andExpect(status().isCreated());

        // Validate the UniUser in the database
        List<UniUser> uniUserList = uniUserRepository.findAll();
        assertThat(uniUserList).hasSize(databaseSizeBeforeCreate + 1);
        UniUser testUniUser = uniUserList.get(uniUserList.size() - 1);
        assertThat(testUniUser.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUniUser.getNickname()).isEqualTo(DEFAULT_NICKNAME);
        assertThat(testUniUser.getRole()).isEqualTo(DEFAULT_ROLE);
        assertThat(testUniUser.getStudentId()).isEqualTo(DEFAULT_STUDENT_ID);
        assertThat(testUniUser.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testUniUser.getBirthday()).isEqualTo(DEFAULT_BIRTHDAY);
        assertThat(testUniUser.getClubs()).isEqualTo(DEFAULT_CLUBS);
        assertThat(testUniUser.getUni()).isEqualTo(DEFAULT_UNI);
        assertThat(testUniUser.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testUniUser.getBalance()).isEqualTo(DEFAULT_BALANCE);
    }

    @Test
    @Transactional
    void createUniUserWithExistingId() throws Exception {
        // Create the UniUser with an existing ID
        uniUser.setId(1L);

        int databaseSizeBeforeCreate = uniUserRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUniUserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(uniUser)))
            .andExpect(status().isBadRequest());

        // Validate the UniUser in the database
        List<UniUser> uniUserList = uniUserRepository.findAll();
        assertThat(uniUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllUniUsers() throws Exception {
        // Initialize the database
        uniUserRepository.saveAndFlush(uniUser);

        // Get all the uniUserList
        restUniUserMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(uniUser.getId().intValue())))
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
    void getUniUser() throws Exception {
        // Initialize the database
        uniUserRepository.saveAndFlush(uniUser);

        // Get the uniUser
        restUniUserMockMvc
            .perform(get(ENTITY_API_URL_ID, uniUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(uniUser.getId().intValue()))
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
    void getNonExistingUniUser() throws Exception {
        // Get the uniUser
        restUniUserMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingUniUser() throws Exception {
        // Initialize the database
        uniUserRepository.saveAndFlush(uniUser);

        int databaseSizeBeforeUpdate = uniUserRepository.findAll().size();

        // Update the uniUser
        UniUser updatedUniUser = uniUserRepository.findById(uniUser.getId()).get();
        // Disconnect from session so that the updates on updatedUniUser are not directly saved in db
        em.detach(updatedUniUser);
        updatedUniUser
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

        restUniUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUniUser.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUniUser))
            )
            .andExpect(status().isOk());

        // Validate the UniUser in the database
        List<UniUser> uniUserList = uniUserRepository.findAll();
        assertThat(uniUserList).hasSize(databaseSizeBeforeUpdate);
        UniUser testUniUser = uniUserList.get(uniUserList.size() - 1);
        assertThat(testUniUser.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUniUser.getNickname()).isEqualTo(UPDATED_NICKNAME);
        assertThat(testUniUser.getRole()).isEqualTo(UPDATED_ROLE);
        assertThat(testUniUser.getStudentId()).isEqualTo(UPDATED_STUDENT_ID);
        assertThat(testUniUser.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testUniUser.getBirthday()).isEqualTo(UPDATED_BIRTHDAY);
        assertThat(testUniUser.getClubs()).isEqualTo(UPDATED_CLUBS);
        assertThat(testUniUser.getUni()).isEqualTo(UPDATED_UNI);
        assertThat(testUniUser.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testUniUser.getBalance()).isEqualTo(UPDATED_BALANCE);
    }

    @Test
    @Transactional
    void putNonExistingUniUser() throws Exception {
        int databaseSizeBeforeUpdate = uniUserRepository.findAll().size();
        uniUser.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUniUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, uniUser.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(uniUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the UniUser in the database
        List<UniUser> uniUserList = uniUserRepository.findAll();
        assertThat(uniUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUniUser() throws Exception {
        int databaseSizeBeforeUpdate = uniUserRepository.findAll().size();
        uniUser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUniUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(uniUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the UniUser in the database
        List<UniUser> uniUserList = uniUserRepository.findAll();
        assertThat(uniUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUniUser() throws Exception {
        int databaseSizeBeforeUpdate = uniUserRepository.findAll().size();
        uniUser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUniUserMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(uniUser)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the UniUser in the database
        List<UniUser> uniUserList = uniUserRepository.findAll();
        assertThat(uniUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUniUserWithPatch() throws Exception {
        // Initialize the database
        uniUserRepository.saveAndFlush(uniUser);

        int databaseSizeBeforeUpdate = uniUserRepository.findAll().size();

        // Update the uniUser using partial update
        UniUser partialUpdatedUniUser = new UniUser();
        partialUpdatedUniUser.setId(uniUser.getId());

        partialUpdatedUniUser
            .nickname(UPDATED_NICKNAME)
            .role(UPDATED_ROLE)
            .studentId(UPDATED_STUDENT_ID)
            .birthday(UPDATED_BIRTHDAY)
            .uni(UPDATED_UNI);

        restUniUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUniUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUniUser))
            )
            .andExpect(status().isOk());

        // Validate the UniUser in the database
        List<UniUser> uniUserList = uniUserRepository.findAll();
        assertThat(uniUserList).hasSize(databaseSizeBeforeUpdate);
        UniUser testUniUser = uniUserList.get(uniUserList.size() - 1);
        assertThat(testUniUser.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUniUser.getNickname()).isEqualTo(UPDATED_NICKNAME);
        assertThat(testUniUser.getRole()).isEqualTo(UPDATED_ROLE);
        assertThat(testUniUser.getStudentId()).isEqualTo(UPDATED_STUDENT_ID);
        assertThat(testUniUser.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testUniUser.getBirthday()).isEqualTo(UPDATED_BIRTHDAY);
        assertThat(testUniUser.getClubs()).isEqualTo(DEFAULT_CLUBS);
        assertThat(testUniUser.getUni()).isEqualTo(UPDATED_UNI);
        assertThat(testUniUser.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testUniUser.getBalance()).isEqualTo(DEFAULT_BALANCE);
    }

    @Test
    @Transactional
    void fullUpdateUniUserWithPatch() throws Exception {
        // Initialize the database
        uniUserRepository.saveAndFlush(uniUser);

        int databaseSizeBeforeUpdate = uniUserRepository.findAll().size();

        // Update the uniUser using partial update
        UniUser partialUpdatedUniUser = new UniUser();
        partialUpdatedUniUser.setId(uniUser.getId());

        partialUpdatedUniUser
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

        restUniUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUniUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUniUser))
            )
            .andExpect(status().isOk());

        // Validate the UniUser in the database
        List<UniUser> uniUserList = uniUserRepository.findAll();
        assertThat(uniUserList).hasSize(databaseSizeBeforeUpdate);
        UniUser testUniUser = uniUserList.get(uniUserList.size() - 1);
        assertThat(testUniUser.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUniUser.getNickname()).isEqualTo(UPDATED_NICKNAME);
        assertThat(testUniUser.getRole()).isEqualTo(UPDATED_ROLE);
        assertThat(testUniUser.getStudentId()).isEqualTo(UPDATED_STUDENT_ID);
        assertThat(testUniUser.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testUniUser.getBirthday()).isEqualTo(UPDATED_BIRTHDAY);
        assertThat(testUniUser.getClubs()).isEqualTo(UPDATED_CLUBS);
        assertThat(testUniUser.getUni()).isEqualTo(UPDATED_UNI);
        assertThat(testUniUser.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testUniUser.getBalance()).isEqualTo(UPDATED_BALANCE);
    }

    @Test
    @Transactional
    void patchNonExistingUniUser() throws Exception {
        int databaseSizeBeforeUpdate = uniUserRepository.findAll().size();
        uniUser.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUniUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, uniUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(uniUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the UniUser in the database
        List<UniUser> uniUserList = uniUserRepository.findAll();
        assertThat(uniUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUniUser() throws Exception {
        int databaseSizeBeforeUpdate = uniUserRepository.findAll().size();
        uniUser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUniUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(uniUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the UniUser in the database
        List<UniUser> uniUserList = uniUserRepository.findAll();
        assertThat(uniUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUniUser() throws Exception {
        int databaseSizeBeforeUpdate = uniUserRepository.findAll().size();
        uniUser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUniUserMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(uniUser)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the UniUser in the database
        List<UniUser> uniUserList = uniUserRepository.findAll();
        assertThat(uniUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUniUser() throws Exception {
        // Initialize the database
        uniUserRepository.saveAndFlush(uniUser);

        int databaseSizeBeforeDelete = uniUserRepository.findAll().size();

        // Delete the uniUser
        restUniUserMockMvc
            .perform(delete(ENTITY_API_URL_ID, uniUser.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UniUser> uniUserList = uniUserRepository.findAll();
        assertThat(uniUserList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
