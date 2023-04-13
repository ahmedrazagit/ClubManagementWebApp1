package uk.ac.bham.teamproject.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import uk.ac.bham.teamproject.domain.Comments;
import uk.ac.bham.teamproject.domain.Post;

/**
 * Spring Data JPA repository for the Comments entity.
 */
@Repository
public interface CommentsRepository extends JpaRepository<Comments, Long> {
    @Query("select comments from Comments comments where comments.user.login = ?#{principal.username}")
    List<Comments> findByUserIsCurrentUser();

    default Optional<Comments> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    //Added by KB
    @Modifying
    @Query("DELETE FROM Comments c WHERE c.post = :post")
    void deleteByPost(@Param("post") Post post);

    default List<Comments> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Comments> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct comments from Comments comments left join fetch comments.post left join fetch comments.user",
        countQuery = "select count(distinct comments) from Comments comments"
    )
    Page<Comments> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct comments from Comments comments left join fetch comments.post left join fetch comments.user")
    List<Comments> findAllWithToOneRelationships();

    @Query("select comments from Comments comments left join fetch comments.post left join fetch comments.user where comments.id =:id")
    Optional<Comments> findOneWithToOneRelationships(@Param("id") Long id);
}
