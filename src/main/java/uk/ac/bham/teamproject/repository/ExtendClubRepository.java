package uk.ac.bham.teamproject.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import uk.ac.bham.teamproject.domain.ExtendClub;

/**
 * Spring Data JPA repository for the ExtendClub entity.
 */
@Repository
public interface ExtendClubRepository extends JpaRepository<ExtendClub, Long> {
    @Query("select extendClub from ExtendClub extendClub where extendClub.user.login = ?#{principal.username}")
    List<ExtendClub> findByUserIsCurrentUser();

    default Optional<ExtendClub> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    @Query("select count(event) from ExtendedEvents event where event.club.id = :clubId")
    int countEventsByClubId(@Param("clubId") Long clubId);

    default List<ExtendClub> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<ExtendClub> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct extendClub from ExtendClub extendClub left join fetch extendClub.user",
        countQuery = "select count(distinct extendClub) from ExtendClub extendClub"
    )
    Page<ExtendClub> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct extendClub from ExtendClub extendClub left join fetch extendClub.user")
    List<ExtendClub> findAllWithToOneRelationships();

    @Query("select extendClub from ExtendClub extendClub left join fetch extendClub.user where extendClub.id =:id")
    Optional<ExtendClub> findOneWithToOneRelationships(@Param("id") Long id);
}
