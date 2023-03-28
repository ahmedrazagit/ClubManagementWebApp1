package uk.ac.bham.teamproject.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uk.ac.bham.teamproject.domain.Clubs;
import uk.ac.bham.teamproject.repository.ClubsRepository;
import uk.ac.bham.teamproject.service.ClubsService;

/**
 * Service Implementation for managing {@link Clubs}.
 */
@Service
@Transactional
public class ClubsServiceImpl implements ClubsService {

    private final Logger log = LoggerFactory.getLogger(ClubsServiceImpl.class);

    private final ClubsRepository clubsRepository;

    public ClubsServiceImpl(ClubsRepository clubsRepository) {
        this.clubsRepository = clubsRepository;
    }

    @Override
    public Clubs save(Clubs clubs) {
        log.debug("Request to save Clubs : {}", clubs);
        return clubsRepository.save(clubs);
    }

    @Override
    public Clubs update(Clubs clubs) {
        log.debug("Request to update Clubs : {}", clubs);
        return clubsRepository.save(clubs);
    }

    @Override
    public Optional<Clubs> partialUpdate(Clubs clubs) {
        log.debug("Request to partially update Clubs : {}", clubs);

        return clubsRepository
            .findById(clubs.getId())
            .map(existingClubs -> {
                if (clubs.getClubname() != null) {
                    existingClubs.setClubname(clubs.getClubname());
                }
                if (clubs.getClubdescription() != null) {
                    existingClubs.setClubdescription(clubs.getClubdescription());
                }
                if (clubs.getNumberofmembers() != null) {
                    existingClubs.setNumberofmembers(clubs.getNumberofmembers());
                }
                if (clubs.getNumberofevents() != null) {
                    existingClubs.setNumberofevents(clubs.getNumberofevents());
                }

                return existingClubs;
            })
            .map(clubsRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Clubs> findAll(Pageable pageable) {
        log.debug("Request to get all Clubs");
        return clubsRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Clubs> findOne(Long id) {
        log.debug("Request to get Clubs : {}", id);
        return clubsRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Clubs : {}", id);
        clubsRepository.deleteById(id);
    }
}
