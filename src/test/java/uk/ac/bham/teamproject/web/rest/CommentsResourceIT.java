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
import org.springframework.util.Base64Utils;
import uk.ac.bham.teamproject.IntegrationTest;
import uk.ac.bham.teamproject.domain.Comments;
import uk.ac.bham.teamproject.repository.CommentsRepository;

/**
 * Integration tests for the {@link CommentsResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class CommentsResourceIT {

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/comments";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CommentsRepository commentsRepository;

    @Mock
    private CommentsRepository commentsRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCommentsMockMvc;

    private Comments comments;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Comments createEntity(EntityManager em) {
        Comments comments = new Comments().comment(DEFAULT_COMMENT);
        return comments;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Comments createUpdatedEntity(EntityManager em) {
        Comments comments = new Comments().comment(UPDATED_COMMENT);
        return comments;
    }

    @BeforeEach
    public void initTest() {
        comments = createEntity(em);
    }

    @Test
    @Transactional
    void createComments() throws Exception {
        int databaseSizeBeforeCreate = commentsRepository.findAll().size();
        // Create the Comments
        restCommentsMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(comments)))
            .andExpect(status().isCreated());

        // Validate the Comments in the database
        List<Comments> commentsList = commentsRepository.findAll();
        assertThat(commentsList).hasSize(databaseSizeBeforeCreate + 1);
        Comments testComments = commentsList.get(commentsList.size() - 1);
        assertThat(testComments.getComment()).isEqualTo(DEFAULT_COMMENT);
    }

    @Test
    @Transactional
    void createCommentsWithExistingId() throws Exception {
        // Create the Comments with an existing ID
        comments.setId(1L);

        int databaseSizeBeforeCreate = commentsRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommentsMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(comments)))
            .andExpect(status().isBadRequest());

        // Validate the Comments in the database
        List<Comments> commentsList = commentsRepository.findAll();
        assertThat(commentsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllComments() throws Exception {
        // Initialize the database
        commentsRepository.saveAndFlush(comments);

        // Get all the commentsList
        restCommentsMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(comments.getId().intValue())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCommentsWithEagerRelationshipsIsEnabled() throws Exception {
        when(commentsRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCommentsMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(commentsRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCommentsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(commentsRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCommentsMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(commentsRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getComments() throws Exception {
        // Initialize the database
        commentsRepository.saveAndFlush(comments);

        // Get the comments
        restCommentsMockMvc
            .perform(get(ENTITY_API_URL_ID, comments.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(comments.getId().intValue()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingComments() throws Exception {
        // Get the comments
        restCommentsMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingComments() throws Exception {
        // Initialize the database
        commentsRepository.saveAndFlush(comments);

        int databaseSizeBeforeUpdate = commentsRepository.findAll().size();

        // Update the comments
        Comments updatedComments = commentsRepository.findById(comments.getId()).get();
        // Disconnect from session so that the updates on updatedComments are not directly saved in db
        em.detach(updatedComments);
        updatedComments.comment(UPDATED_COMMENT);

        restCommentsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedComments.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedComments))
            )
            .andExpect(status().isOk());

        // Validate the Comments in the database
        List<Comments> commentsList = commentsRepository.findAll();
        assertThat(commentsList).hasSize(databaseSizeBeforeUpdate);
        Comments testComments = commentsList.get(commentsList.size() - 1);
        assertThat(testComments.getComment()).isEqualTo(UPDATED_COMMENT);
    }

    @Test
    @Transactional
    void putNonExistingComments() throws Exception {
        int databaseSizeBeforeUpdate = commentsRepository.findAll().size();
        comments.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommentsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, comments.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(comments))
            )
            .andExpect(status().isBadRequest());

        // Validate the Comments in the database
        List<Comments> commentsList = commentsRepository.findAll();
        assertThat(commentsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchComments() throws Exception {
        int databaseSizeBeforeUpdate = commentsRepository.findAll().size();
        comments.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommentsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(comments))
            )
            .andExpect(status().isBadRequest());

        // Validate the Comments in the database
        List<Comments> commentsList = commentsRepository.findAll();
        assertThat(commentsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamComments() throws Exception {
        int databaseSizeBeforeUpdate = commentsRepository.findAll().size();
        comments.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommentsMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(comments)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Comments in the database
        List<Comments> commentsList = commentsRepository.findAll();
        assertThat(commentsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCommentsWithPatch() throws Exception {
        // Initialize the database
        commentsRepository.saveAndFlush(comments);

        int databaseSizeBeforeUpdate = commentsRepository.findAll().size();

        // Update the comments using partial update
        Comments partialUpdatedComments = new Comments();
        partialUpdatedComments.setId(comments.getId());

        restCommentsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedComments.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedComments))
            )
            .andExpect(status().isOk());

        // Validate the Comments in the database
        List<Comments> commentsList = commentsRepository.findAll();
        assertThat(commentsList).hasSize(databaseSizeBeforeUpdate);
        Comments testComments = commentsList.get(commentsList.size() - 1);
        assertThat(testComments.getComment()).isEqualTo(DEFAULT_COMMENT);
    }

    @Test
    @Transactional
    void fullUpdateCommentsWithPatch() throws Exception {
        // Initialize the database
        commentsRepository.saveAndFlush(comments);

        int databaseSizeBeforeUpdate = commentsRepository.findAll().size();

        // Update the comments using partial update
        Comments partialUpdatedComments = new Comments();
        partialUpdatedComments.setId(comments.getId());

        partialUpdatedComments.comment(UPDATED_COMMENT);

        restCommentsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedComments.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedComments))
            )
            .andExpect(status().isOk());

        // Validate the Comments in the database
        List<Comments> commentsList = commentsRepository.findAll();
        assertThat(commentsList).hasSize(databaseSizeBeforeUpdate);
        Comments testComments = commentsList.get(commentsList.size() - 1);
        assertThat(testComments.getComment()).isEqualTo(UPDATED_COMMENT);
    }

    @Test
    @Transactional
    void patchNonExistingComments() throws Exception {
        int databaseSizeBeforeUpdate = commentsRepository.findAll().size();
        comments.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommentsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, comments.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(comments))
            )
            .andExpect(status().isBadRequest());

        // Validate the Comments in the database
        List<Comments> commentsList = commentsRepository.findAll();
        assertThat(commentsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchComments() throws Exception {
        int databaseSizeBeforeUpdate = commentsRepository.findAll().size();
        comments.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommentsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(comments))
            )
            .andExpect(status().isBadRequest());

        // Validate the Comments in the database
        List<Comments> commentsList = commentsRepository.findAll();
        assertThat(commentsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamComments() throws Exception {
        int databaseSizeBeforeUpdate = commentsRepository.findAll().size();
        comments.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommentsMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(comments)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Comments in the database
        List<Comments> commentsList = commentsRepository.findAll();
        assertThat(commentsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteComments() throws Exception {
        // Initialize the database
        commentsRepository.saveAndFlush(comments);

        int databaseSizeBeforeDelete = commentsRepository.findAll().size();

        // Delete the comments
        restCommentsMockMvc
            .perform(delete(ENTITY_API_URL_ID, comments.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Comments> commentsList = commentsRepository.findAll();
        assertThat(commentsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
