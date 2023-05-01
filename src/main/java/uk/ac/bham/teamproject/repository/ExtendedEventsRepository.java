package uk.ac.bham.teamproject.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import uk.ac.bham.teamproject.domain.ExtendedEvents;

/**
 * Spring Data JPA repository for the ExtendedEvents entity.
 */
@Repository
public interface ExtendedEventsRepository extends JpaRepository<ExtendedEvents, Long> {
    @Query("select extendedEvents from ExtendedEvents extendedEvents where extendedEvents.user.login = ?#{principal.username}")
    List<ExtendedEvents> findByUserIsCurrentUser();

    default Optional<ExtendedEvents> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<ExtendedEvents> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<ExtendedEvents> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct extendedEvents from ExtendedEvents extendedEvents left join fetch extendedEvents.club left join fetch extendedEvents.user",
        countQuery = "select count(distinct extendedEvents) from ExtendedEvents extendedEvents"
    )
    Page<ExtendedEvents> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct extendedEvents from ExtendedEvents extendedEvents left join fetch extendedEvents.club left join fetch extendedEvents.user"
    )
    List<ExtendedEvents> findAllWithToOneRelationships();

    @Query(
        "select extendedEvents from ExtendedEvents extendedEvents left join fetch extendedEvents.club left join fetch extendedEvents.user where extendedEvents.id =:id"
    )
    Optional<ExtendedEvents> findOneWithToOneRelationships(@Param("id") Long id);
}
